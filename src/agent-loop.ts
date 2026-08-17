import type { FauiAgentConfig } from './agent.js';
import {
  OpenAIResponsesProvider,
  type OpenAIResponsesMessage,
  type OpenAIResponsesRequest,
  type OpenAIResponsesTool,
} from './openai-responses-provider.js';
import type { GeneratePageOptions, GeneratePageResult, PageSchema, StreamEvent } from './types.js';
import { SCHEMA_TOOLS } from './tools.js';
import { executeToolCall } from './tool-executor.js';

interface AgentLoopParams {
  prompt: string;
  config: FauiAgentConfig;
  options?: GeneratePageOptions;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isToolDefinition(tool: unknown): tool is OpenAIResponsesTool {
  return isRecord(tool)
    && typeof tool.name === 'string'
    && typeof tool.description === 'string'
    && 'parameters' in tool;
}

function getConfiguredTools(config: FauiAgentConfig): OpenAIResponsesTool[] {
  return (config.tools ?? SCHEMA_TOOLS).filter(isToolDefinition);
}

function createRequest(
  config: FauiAgentConfig,
  systemPrompt: string,
  messages: OpenAIResponsesMessage[],
  tools: OpenAIResponsesTool[] = [],
): OpenAIResponsesRequest {
  return {
    systemPrompt,
    messages,
    tools,
    model: config.model ?? 'gpt-5.6',
    apiKey: config.apiKey,
    baseUrl: config.baseUrl,
    temperature: config.temperature ?? 0.3,
    maxOutputTokens: config.maxOutputTokens ?? 16384,
  };
}

function buildSystemPrompt(base: string, skillContent: string, options?: GeneratePageOptions): string {
  let prompt = base;
  if (skillContent) {
    prompt += '\n' + skillContent;
  }
  if (options?.pagePrefix) {
    prompt += `\nUse "${options.pagePrefix}" as prefix for all component IDs (e.g. "${options.pagePrefix}-root").`;
  }
  if (options?.existingIds?.length) {
    prompt += `\nAvoid these existing IDs: ${options.existingIds.join(', ')}`;
  }
  if (options?.context) {
    prompt += `\n\nAdditional context:\n${options.context}`;
  }
  return prompt;
}

export function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const braceStart = text.indexOf('{');
  const braceEnd = text.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd > braceStart) {
    return text.slice(braceStart, braceEnd + 1);
  }
  return text.trim();
}

export function validateSchema(schema: unknown): schema is PageSchema {
  if (!schema || typeof schema !== 'object') return false;
  const s = schema as Record<string, unknown>;
  if (!Array.isArray(s.components)) return false;
  for (const component of s.components) {
    if (!component || typeof component !== 'object') return false;
    const record = component as Record<string, unknown>;
    if (typeof record.id !== 'string' || typeof record.component !== 'string') return false;
  }
  return true;
}

const DEFAULT_MAX_MESSAGES = 60;
const DEFAULT_MAX_SNAPSHOTS = 10;
const DEFAULT_MAX_CONSECUTIVE_FAILURES = 3;

export function trimMessages(messages: OpenAIResponsesMessage[], maxMessages: number): void {
  if (messages.length <= maxMessages) return;
  const keep = Math.floor(maxMessages * 0.7);
  messages.splice(2, messages.length - keep);
}

function appendHistory(messages: OpenAIResponsesMessage[], options?: GeneratePageOptions): void {
  if (!options?.history?.length) return;

  for (const message of options.history) {
    messages.push({
      role: message.role,
      content: message.content,
      timestamp: Date.now(),
    });
  }
}

function buildPromptAndSkills(config: FauiAgentConfig, options?: GeneratePageOptions): {
  systemPrompt: string;
  skillsUsed: string[];
} {
  if (config.skills && config.skills.length > 0) {
    const skillContent = config.skills
      .map((skill) => `<skill name="${skill.name}">\n${skill.content}\n</skill>`)
      .join('\n\n');
    return {
      systemPrompt: buildSystemPrompt(config.systemPrompt, skillContent, options),
      skillsUsed: config.skills.map((skill) => skill.name),
    };
  }

  return {
    systemPrompt: buildSystemPrompt(config.systemPrompt, '', options),
    skillsUsed: [],
  };
}

export async function runAgentLoop(params: AgentLoopParams): Promise<GeneratePageResult> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;
  const { systemPrompt, skillsUsed } = buildPromptAndSkills(config, options);
  const provider = new OpenAIResponsesProvider();
  const messages: OpenAIResponsesMessage[] = [
    { role: 'user', content: prompt, timestamp: Date.now() },
  ];
  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  const maxFailures = config.maxConsecutiveFailures ?? DEFAULT_MAX_CONSECUTIVE_FAILURES;

  let turns = 0;
  let consecutiveFailures = 0;

  for (let index = 0; index < maxTurns; index++) {
    turns++;
    trimMessages(messages, maxMessages);
    const result = await provider.complete(createRequest(config, systemPrompt, messages));

    if (!result.text) {
      throw new Error(`faui-agent: empty response from model (turn ${turns})`);
    }

    const json = extractJson(result.text);
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch (error) {
      consecutiveFailures++;
      if (consecutiveFailures >= maxFailures) {
        throw new Error(`faui-agent: ${maxFailures} consecutive JSON parse failures, aborting`);
      }
      const parseError = error instanceof SyntaxError ? error.message : String(error);
      messages.push(
        { role: 'response', outputItems: result.outputItems, timestamp: Date.now() },
        {
          role: 'user',
          content: `Invalid JSON: ${parseError}. Please output ONLY valid JSON.\n\nYour previous output started with: ${json.slice(0, 200)}`,
          timestamp: Date.now(),
        },
      );
      continue;
    }

    if (!validateSchema(parsed)) {
      messages.push(
        { role: 'response', outputItems: result.outputItems, timestamp: Date.now() },
        {
          role: 'user',
          content: 'The JSON is valid but missing required fields. Ensure "components" is an array where each item has "id" and "component" fields. Try again.',
          timestamp: Date.now(),
        },
      );
      continue;
    }

    return { schema: parsed, skillsUsed, turns };
  }

  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}

export async function* runAgentLoopStream(params: AgentLoopParams): AsyncGenerator<StreamEvent> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;
  const { systemPrompt, skillsUsed } = buildPromptAndSkills(config, options);
  const provider = new OpenAIResponsesProvider();
  const messages: OpenAIResponsesMessage[] = [];
  appendHistory(messages, options);
  messages.push({ role: 'user', content: prompt, timestamp: Date.now() });

  if (skillsUsed.length > 0) {
    yield { type: 'skills_loaded', skills: skillsUsed };
  }

  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  const maxFailures = config.maxConsecutiveFailures ?? DEFAULT_MAX_CONSECUTIVE_FAILURES;
  let turns = 0;
  let consecutiveFailures = 0;

  for (let index = 0; index < maxTurns; index++) {
    turns++;
    trimMessages(messages, maxMessages);
    yield { type: 'status', message: turns === 1 ? '正在分析需求...' : `正在优化结构（第 ${turns} 轮）...` };
    yield { type: 'generating' };

    let accumulatedText = '';
    let finalResult: Awaited<ReturnType<OpenAIResponsesProvider['complete']>> | null = null;
    let statusSent = false;

    try {
      for await (const event of provider.stream(createRequest(config, systemPrompt, messages))) {
        if (event.type === 'text_delta') {
          accumulatedText += event.delta;
          yield { type: 'text_delta', delta: event.delta };
          if (!statusSent && accumulatedText.length > 20) {
            yield { type: 'status', message: '正在生成组件结构...' };
            statusSent = true;
          }
        } else if (event.type === 'done') {
          finalResult = event.result;
        } else if (event.type === 'error') {
          throw new Error(`faui-agent: LLM error: ${event.message}`);
        }
      }
    } catch (error) {
      yield { type: 'error', message: error instanceof Error ? error.message : String(error) };
      throw error;
    }

    if (!finalResult) {
      yield { type: 'error', message: 'Model stream ended without a final response' };
      throw new Error('faui-agent: model stream ended without a final response');
    }
    if (!accumulatedText && finalResult.text) {
      accumulatedText = finalResult.text;
      yield { type: 'text_delta', delta: finalResult.text };
    }
    if (!accumulatedText) {
      yield { type: 'error', message: 'Empty response from model' };
      throw new Error(`faui-agent: empty response from model (turn ${turns})`);
    }

    yield { type: 'status', message: '正在解析生成结果...' };

    const json = extractJson(accumulatedText);
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
      consecutiveFailures = 0;
    } catch (error) {
      consecutiveFailures++;
      if (consecutiveFailures >= maxFailures) {
        yield { type: 'error', message: `${maxFailures} consecutive JSON parse failures` };
        throw new Error(`faui-agent: ${maxFailures} consecutive JSON parse failures, aborting`);
      }
      const parseError = error instanceof SyntaxError ? error.message : String(error);
      yield { type: 'status', message: 'JSON 格式有误，正在重试...' };
      messages.push(
        { role: 'response', outputItems: finalResult.outputItems, timestamp: Date.now() },
        {
          role: 'user',
          content: `Invalid JSON: ${parseError}. Please output ONLY valid JSON.\n\nYour previous output started with: ${json.slice(0, 200)}`,
          timestamp: Date.now(),
        },
      );
      continue;
    }

    if (!validateSchema(parsed)) {
      yield { type: 'status', message: '结构校验未通过，正在重试...' };
      messages.push(
        { role: 'response', outputItems: finalResult.outputItems, timestamp: Date.now() },
        {
          role: 'user',
          content: 'The JSON is valid but missing required fields. Ensure "components" is an array where each item has "id" and "component" fields. Try again.',
          timestamp: Date.now(),
        },
      );
      continue;
    }

    const result: GeneratePageResult = { schema: parsed, skillsUsed, turns };
    yield { type: 'done', result };
    return result;
  }

  yield { type: 'error', message: `Failed to generate valid schema after ${maxTurns} turns` };
  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}

export async function* runAgentLoopWithTools(params: AgentLoopParams): AsyncGenerator<StreamEvent> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;
  const systemPrompt = buildSystemPrompt(config.systemPrompt, '', options);
  const provider = new OpenAIResponsesProvider();
  const configuredTools = getConfiguredTools(config);
  const executeConfiguredTool = config.toolExecutor ?? executeToolCall;

  let currentSchema: PageSchema = options?.currentSchema
    ? JSON.parse(JSON.stringify(options.currentSchema))
    : { components: [], dataModel: {} };
  let hasSetComponents = currentSchema.components.length > 0;
  const schemaSnapshots: PageSchema[] = [];
  const messages: OpenAIResponsesMessage[] = [];
  appendHistory(messages, options);
  messages.push({ role: 'user', content: prompt, timestamp: Date.now() });

  if (currentSchema.components.length > 0) {
    messages.splice(messages.length - 1, 0, {
      role: 'user',
      content: `当前页面的完整 schema 如下，请基于此做增量修改：\n${JSON.stringify(currentSchema, null, 2)}`,
      timestamp: Date.now(),
    });
  }

  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  const maxSnapshots = config.maxSnapshots ?? DEFAULT_MAX_SNAPSHOTS;
  let turns = 0;

  for (let index = 0; index < maxTurns; index++) {
    turns++;
    trimMessages(messages, maxMessages);

    if (turns > 1 && currentSchema.components.length > 0) {
      messages.push({
        role: 'user',
        content: `当前 schema 已更新：\n${JSON.stringify(currentSchema, null, 2)}`,
        timestamp: Date.now(),
      });
    }

    yield { type: 'status', message: turns === 1 ? '正在分析需求...' : `正在优化结构（第 ${turns} 轮）...` };
    yield { type: 'generating' };

    const availableTools = hasSetComponents
      ? configuredTools.filter((tool) => tool.name !== 'set_components')
      : configuredTools;
    const pendingToolCalls: Awaited<ReturnType<OpenAIResponsesProvider['complete']>>['toolCalls'] = [];
    let finalResult: Awaited<ReturnType<OpenAIResponsesProvider['complete']>> | null = null;

    try {
      for await (const event of provider.stream(createRequest(config, systemPrompt, messages, availableTools))) {
        if (event.type === 'text_delta') {
          yield { type: 'text_delta', delta: event.delta };
        } else if (event.type === 'tool_call') {
          pendingToolCalls.push(event.toolCall);
        } else if (event.type === 'done') {
          finalResult = event.result;
        } else if (event.type === 'error') {
          throw new Error(`faui-agent: LLM error: ${event.message}`);
        }
      }
    } catch (error) {
      yield { type: 'error', message: error instanceof Error ? error.message : String(error) };
      throw error;
    }

    if (!finalResult) {
      yield { type: 'error', message: 'Model stream ended without a final response' };
      throw new Error('faui-agent: model stream ended without a final response');
    }

    messages.push({ role: 'response', outputItems: finalResult.outputItems, timestamp: Date.now() });
    const toolCalls = pendingToolCalls.length > 0 ? pendingToolCalls : finalResult.toolCalls;

    if (toolCalls.length === 0) {
      yield { type: 'done', result: { schema: currentSchema, skillsUsed: ['tools'], turns } };
      return;
    }

    for (const toolCall of toolCalls) {
      yield { type: 'tool_use', name: toolCall.name };

      try {
        if (toolCall.argumentsError) throw new Error(toolCall.argumentsError);
        const result = executeConfiguredTool(toolCall.name, toolCall.arguments, currentSchema);

        if (schemaSnapshots.length >= maxSnapshots) schemaSnapshots.shift();
        schemaSnapshots.push(JSON.parse(JSON.stringify(currentSchema)));
        currentSchema = result.schema;

        if (toolCall.name === 'set_components') hasSetComponents = true;
        yield { type: 'schema_updated', schema: { ...currentSchema } };
        messages.push({
          role: 'tool',
          callId: toolCall.id,
          toolName: toolCall.name,
          output: result.message,
          isError: false,
          timestamp: Date.now(),
        });
      } catch (error) {
        if (schemaSnapshots.length > 0) currentSchema = schemaSnapshots[schemaSnapshots.length - 1];
        messages.push({
          role: 'tool',
          callId: toolCall.id,
          toolName: toolCall.name,
          output: `工具执行失败：${error instanceof Error ? error.message : String(error)}。已回滚到上一个有效状态。`,
          isError: true,
          timestamp: Date.now(),
        });
      }
    }
  }

  if (currentSchema.components.length > 0) {
    yield { type: 'done', result: { schema: currentSchema, skillsUsed: ['tools'], turns } };
    return;
  }

  yield { type: 'error', message: `Failed to generate valid schema after ${maxTurns} turns` };
  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}
