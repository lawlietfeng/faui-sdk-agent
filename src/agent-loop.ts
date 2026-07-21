import { complete, getModel, stream } from '@mariozechner/pi-ai';
import type { Api, Context, Message, Model, TextContent, ToolCall } from '@mariozechner/pi-ai';
import type { FauiAgentConfig } from './agent.js';
import type { GeneratePageOptions, GeneratePageResult, PageSchema, StreamEvent } from './types.js';
import { SCHEMA_TOOLS } from './tools.js';
import { executeToolCall } from './tool-executor.js';

interface AgentLoopParams {
  prompt: string;
  config: FauiAgentConfig;
  options?: GeneratePageOptions;
}

interface AgentLoopWithToolsParams {
  prompt: string;
  config: FauiAgentConfig;
  options?: GeneratePageOptions;
}

const PROVIDER_API_MAP: Record<string, string> = {
  anthropic: 'anthropic-messages',
  openai: 'openai-responses',
  'azure-openai-responses': 'azure-openai-responses',
  'openai-codex': 'openai-codex-responses',
  google: 'google-generative-ai',
  'google-vertex': 'google-vertex',
  'google-gemini-cli': 'google-gemini-cli',
  'amazon-bedrock': 'bedrock-converse-stream',
};

const PROVIDER_BASEURL_MAP: Record<string, string> = {
  anthropic: 'https://api.anthropic.com',
  openai: 'https://api.openai.com/v1',
  google: 'https://generativelanguage.googleapis.com',
  'google-vertex': 'https://us-central1-aiplatform.googleapis.com',
  xai: 'https://api.x.ai/v1',
  groq: 'https://api.groq.com/openai/v1',
  mistral: 'https://api.mistral.ai/v1',
  openrouter: 'https://openrouter.ai/api/v1',
};

function resolveModel(config: FauiAgentConfig): Model<Api> {
  const provider = config.provider ?? 'anthropic';
  const modelId = config.model ?? 'claude-sonnet-4-20250514';
  const base = getModel(provider as any, modelId as any);

  if (base) {
    return {
      ...base,
      baseUrl: config.baseUrl ?? base.baseUrl,
    };
  }

  // Fallback for unknown model IDs: construct a Model manually
  const api = PROVIDER_API_MAP[provider] ?? 'openai-responses';
  const baseUrl = config.baseUrl ?? PROVIDER_BASEURL_MAP[provider] ?? 'https://api.openai.com/v1';

  return {
    id: modelId,
    name: modelId,
    api,
    provider,
    baseUrl,
    reasoning: false,
    input: ['text'],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 128000,
    maxTokens: 16384,
  } as Model<Api>;
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
  for (const c of s.components) {
    if (!c || typeof c !== 'object') return false;
    if (typeof c.id !== 'string' || typeof c.component !== 'string') return false;
  }
  return true;
}

function getTextFromAssistant(msg: { content: Array<{ type: string; text?: string }> }): string {
  return msg.content
    .filter((c): c is TextContent => c.type === 'text')
    .map((c) => c.text)
    .join('');
}

const DEFAULT_MAX_MESSAGES = 60;
const DEFAULT_MAX_SNAPSHOTS = 10;
const DEFAULT_MAX_CONSECUTIVE_FAILURES = 3;

export function trimMessages(messages: Message[], maxMessages: number): void {
  if (messages.length <= maxMessages) return;
  const keep = Math.floor(maxMessages * 0.7);
  messages.splice(2, messages.length - keep);
}

export async function runAgentLoop(params: AgentLoopParams): Promise<GeneratePageResult> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;

  let systemPrompt: string;
  let skillsUsed: string[];

  if (config.skills && config.skills.length > 0) {
    const skillContents = config.skills.map((s) => `<skill name="${s.name}">\n${s.content}\n</skill>`).join('\n\n');
    systemPrompt = buildSystemPrompt(config.systemPrompt, skillContents, options);
    skillsUsed = config.skills.map((s) => s.name);
  } else {
    systemPrompt = buildSystemPrompt(config.systemPrompt, '', options);
    skillsUsed = [];
  }

  const model = resolveModel(config);

  const messages: Message[] = [
    { role: 'user', content: prompt, timestamp: Date.now() },
  ];

  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  const maxFailures = config.maxConsecutiveFailures ?? DEFAULT_MAX_CONSECUTIVE_FAILURES;

  let turns = 0;
  let consecutiveFailures = 0;

  for (let i = 0; i < maxTurns; i++) {
    turns++;
    trimMessages(messages, maxMessages);
    const ctx: Context = { systemPrompt, messages, tools: [] };
    const result = await complete(model, ctx, {
      apiKey: config.apiKey,
      temperature: config.temperature ?? 0.3,
      maxTokens: 16384,
      cacheRetention: 'short',
    });

    const text = getTextFromAssistant(result);
    if (!text) {
      throw new Error(`faui-agent: empty response from model (turn ${turns})`);
    }

    const jsonStr = extractJson(text);
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (err) {
      consecutiveFailures++;
      if (consecutiveFailures >= maxFailures) {
        throw new Error(`faui-agent: ${maxFailures} consecutive JSON parse failures, aborting`);
      }
      const parseError = err instanceof SyntaxError ? err.message : String(err);
      messages.push(
        result,
        { role: 'user', content: `Invalid JSON: ${parseError}. Please output ONLY valid JSON.\n\nYour previous output started with: ${jsonStr.slice(0, 200)}`, timestamp: Date.now() },
      );
      continue;
    }

    if (!validateSchema(parsed)) {
      messages.push(
        result,
        { role: 'user', content: 'The JSON is valid but missing required fields. Ensure "components" is an array where each item has "id" and "component" fields. Try again.', timestamp: Date.now() },
      );
      continue;
    }

    return {
      schema: parsed as PageSchema,
      skillsUsed,
      turns,
    };
  }

  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}

export async function* runAgentLoopStream(params: AgentLoopParams): AsyncGenerator<StreamEvent> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;

  let systemPrompt: string;
  let skillsUsed: string[];

  if (config.skills && config.skills.length > 0) {
    const skillContents = config.skills.map((s) => `<skill name="${s.name}">\n${s.content}\n</skill>`).join('\n\n');
    yield { type: 'skills_loaded', skills: config.skills.map((s) => s.name) };
    systemPrompt = buildSystemPrompt(config.systemPrompt, skillContents, options);
    skillsUsed = config.skills.map((s) => s.name);
  } else {
    systemPrompt = buildSystemPrompt(config.systemPrompt, '', options);
    skillsUsed = [];
  }

  const model = resolveModel(config);

  const messages: Message[] = [];

  // 如果有历史对话，先加载
  if (options?.history && options.history.length > 0) {
    for (const msg of options.history) {
      if (msg.role === 'assistant') {
        messages.push({
          role: 'assistant',
          content: [{ type: 'text', text: msg.content }],
          timestamp: Date.now(),
        } as Message);
      } else {
        messages.push({
          role: msg.role,
          content: msg.content,
          timestamp: Date.now(),
        });
      }
    }
  }

  // 添加当前用户输入
  messages.push({ role: 'user', content: prompt, timestamp: Date.now() });

  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  const maxFailures = config.maxConsecutiveFailures ?? DEFAULT_MAX_CONSECUTIVE_FAILURES;

  let turns = 0;
  let consecutiveFailures = 0;

  for (let i = 0; i < maxTurns; i++) {
    turns++;
    trimMessages(messages, maxMessages);

    if (turns === 1) {
      yield { type: 'status', message: '正在分析需求...' };
    } else {
      yield { type: 'status', message: `正在优化结构（第 ${turns} 轮）...` };
    }

    yield { type: 'generating' };

    const ctx: Context = { systemPrompt, messages, tools: [] };
    const eventStream = stream(model, ctx, {
      apiKey: config.apiKey,
      temperature: config.temperature ?? 0.3,
      maxTokens: 16384,
      cacheRetention: 'short',
    });

    let accumulatedText = '';
    let finalMessage: Message | null = null;
    let statusSent = false;

    try {
      for await (const event of eventStream) {
        if (event.type === 'text_delta') {
          accumulatedText += event.delta;
          yield { type: 'text_delta', delta: event.delta };
          if (!statusSent && accumulatedText.length > 20) {
            yield { type: 'status', message: '正在生成组件结构...' };
            statusSent = true;
          }
        } else if (event.type === 'done') {
          finalMessage = event.message;
        } else if (event.type === 'error') {
          yield { type: 'error', message: event.error.errorMessage || 'Unknown error' };
          throw new Error(`faui-agent: LLM error: ${event.error.errorMessage || 'unknown'}`);
        }
      }
    } catch (err) {
      yield { type: 'error', message: (err as Error).message };
      throw err;
    }

    if (!accumulatedText) {
      yield { type: 'error', message: 'Empty response from model' };
      throw new Error(`faui-agent: empty response from model (turn ${turns})`);
    }

    yield { type: 'status', message: '正在解析生成结果...' };

    const jsonStr = extractJson(accumulatedText);
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonStr);
      consecutiveFailures = 0;
    } catch (err) {
      consecutiveFailures++;
      if (consecutiveFailures >= maxFailures) {
        yield { type: 'error', message: `${maxFailures} consecutive JSON parse failures` };
        throw new Error(`faui-agent: ${maxFailures} consecutive JSON parse failures, aborting`);
      }
      const parseError = err instanceof SyntaxError ? err.message : String(err);
      yield { type: 'status', message: 'JSON 格式有误，正在重试...' };
      messages.push(
        finalMessage!,
        { role: 'user', content: `Invalid JSON: ${parseError}. Please output ONLY valid JSON.\n\nYour previous output started with: ${jsonStr.slice(0, 200)}`, timestamp: Date.now() },
      );
      continue;
    }

    if (!validateSchema(parsed)) {
      yield { type: 'status', message: '结构校验未通过，正在重试...' };
      messages.push(
        finalMessage!,
        { role: 'user', content: 'The JSON is valid but missing required fields. Ensure "components" is an array where each item has "id" and "component" fields. Try again.', timestamp: Date.now() },
      );
      continue;
    }

    const result: GeneratePageResult = {
      schema: parsed as PageSchema,
      skillsUsed,
      turns,
    };

    yield { type: 'done', result };
    return result;
  }

  yield { type: 'error', message: `Failed to generate valid schema after ${maxTurns} turns` };
  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}

export async function* runAgentLoopWithTools(
  params: AgentLoopWithToolsParams
): AsyncGenerator<StreamEvent> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;

  const systemPrompt = buildSystemPrompt(config.systemPrompt, '', options);

  const model = resolveModel(config);
  const configuredTools = (config.tools ?? SCHEMA_TOOLS) as typeof SCHEMA_TOOLS;
  const execTool = config.toolExecutor ?? executeToolCall;

  let currentSchema: PageSchema = options?.currentSchema
    ? JSON.parse(JSON.stringify(options.currentSchema))
    : { components: [], dataModel: {} };
  let hasSetComponents = currentSchema.components.length > 0;
  const schemaSnapshots: PageSchema[] = [];
  const messages: Message[] = [];

  if (options?.history && options.history.length > 0) {
    for (const msg of options.history) {
      if (msg.role === 'assistant') {
        messages.push({
          role: 'assistant',
          content: [{ type: 'text', text: msg.content }],
          timestamp: Date.now(),
        } as Message);
      } else {
        messages.push({
          role: msg.role,
          content: msg.content,
          timestamp: Date.now(),
        });
      }
    }
  }

  messages.push({ role: 'user', content: prompt, timestamp: Date.now() });

  if (currentSchema.components.length > 0) {
    const schemaContext = `当前页面的完整 schema 如下，请基于此做增量修改：\n${JSON.stringify(currentSchema, null, 2)}`;
    messages.splice(messages.length - 1, 0, {
      role: 'user',
      content: schemaContext,
      timestamp: Date.now(),
    });
  }

  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  const maxSnapshots = config.maxSnapshots ?? DEFAULT_MAX_SNAPSHOTS;

  let turns = 0;

  for (let i = 0; i < maxTurns; i++) {
    turns++;
    trimMessages(messages, maxMessages);

    // 内部多轮时（工具调用后再次迭代），注入最新 schema
    if (turns > 1 && currentSchema.components.length > 0) {
      const summary = `当前 schema 已更新：\n${JSON.stringify(currentSchema, null, 2)}`;

      messages.push({
        role: 'user',
        content: summary,
        timestamp: Date.now(),
      });
    }

    if (turns === 1) {
      yield { type: 'status', message: '正在分析需求...' };
    } else {
      yield { type: 'status', message: `正在优化结构（第 ${turns} 轮）...` };
    }

    yield { type: 'generating' };

    const availableTools = hasSetComponents
      ? configuredTools.filter((t) => t.name !== 'set_components')
      : configuredTools;

    const ctx: Context = { systemPrompt, messages, tools: availableTools };
    const eventStream = stream(model, ctx, {
      apiKey: config.apiKey,
      temperature: config.temperature ?? 0.3,
      maxTokens: 16384,
      cacheRetention: 'short',
    });

    let pendingToolCalls: ToolCall[] = [];

    for await (const event of eventStream) {
      if (event.type === 'text_delta') {
        yield { type: 'text_delta', delta: event.delta };
      } else if (event.type === 'toolcall_end') {
        pendingToolCalls.push(event.toolCall);
      } else if (event.type === 'done') {
        messages.push(event.message);

        if (event.reason === 'toolUse') {
          for (const toolCall of pendingToolCalls) {
            yield { type: 'tool_use', name: toolCall.name };

            try {
              const result = execTool(toolCall.name, toolCall.arguments, currentSchema);

              if (schemaSnapshots.length >= maxSnapshots) {
                schemaSnapshots.shift();
              }
              schemaSnapshots.push(JSON.parse(JSON.stringify(currentSchema)));

              currentSchema = result.schema;

              if (toolCall.name === 'set_components') {
                hasSetComponents = true;
              }

              yield { type: 'schema_updated', schema: { ...currentSchema } };

              messages.push({
                role: 'toolResult',
                toolCallId: toolCall.id,
                toolName: toolCall.name,
                content: [{ type: 'text', text: result.message }],
                isError: false,
                timestamp: Date.now(),
              });
            } catch (err) {
              if (schemaSnapshots.length > 0) {
                currentSchema = schemaSnapshots[schemaSnapshots.length - 1];
              }

              messages.push({
                role: 'toolResult',
                toolCallId: toolCall.id,
                toolName: toolCall.name,
                content: [{ type: 'text', text: `工具执行失败：${(err as Error).message}。已回滚到上一个有效状态。` }],
                isError: true,
                timestamp: Date.now(),
              });
            }
          }
          pendingToolCalls = [];
        } else if (event.reason === 'stop') {
          yield { type: 'done', result: { schema: currentSchema, skillsUsed: ['tools'], turns } };
          return;
        }
      } else if (event.type === 'error') {
        yield { type: 'error', message: event.error.errorMessage || 'Unknown error' };
        throw new Error(`faui-agent: LLM error: ${event.error.errorMessage || 'unknown'}`);
      }
    }
  }

  if (currentSchema.components.length > 0) {
    yield { type: 'done', result: { schema: currentSchema, skillsUsed: ['tools'], turns } };
  } else {
    yield { type: 'error', message: `Failed to generate valid schema after ${maxTurns} turns` };
    throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
  }
}
