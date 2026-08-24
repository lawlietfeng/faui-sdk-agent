import type { FauiAgentConfig } from './agent.js';
import {
  OpenAIResponsesProvider,
  type OpenAIResponsesMessage,
  type OpenAIResponsesRequest,
  type OpenAIResponsesTool,
} from './openai-responses-provider.js';
import type { GeneratePageOptions, GeneratePageResult, PageSchema, StreamEvent } from './types.js';
import { buildFormContractPrompt, FORM_COMPONENT_CATALOG_PROMPT, getFormComponentContract } from './form-contract.js';
import { validateFormSchema } from './form-schema.js';
import type { SkillDef } from './skill-store.js';
import { selectFormSkills } from './skill-selector.js';
import { builtinSkills } from './skills/index.js';
import { selectFormContractComponents } from './component-selector.js';
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

const STYLE_MODE_PROMPT = `## Style mode
已启用 style 能力。将注入的样式 Skill 落实到最终 Schema 的 style 中；style 使用标准 React 行内 CSS 驼峰属性，值只能为 string 或 number。只为目标风格添加必要样式，不使用 Tailwind、className、伪类、CSS 变量或未定义主题字段。样式不得破坏组件、绑定、校验、提交和工具规则。`;

function buildSystemPrompt(
  base: string,
  contractContent: string,
  skillContent: string,
  styleEnabled: boolean,
  options?: GeneratePageOptions,
): string {
  let prompt = base;
  prompt += `\n\n${FORM_COMPONENT_CATALOG_PROMPT}\n\n${contractContent}`;
  if (styleEnabled) prompt += `\n\n${STYLE_MODE_PROMPT}`;
  if (skillContent) {
    prompt += '\n\n' + skillContent;
  }
  if (options?.pagePrefix) {
    prompt += `\nUse "${options.pagePrefix}" as the prefix for non-root component IDs (e.g. "${options.pagePrefix}-name"). Keep the root ID exactly "root".`;
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
  return validateFormSchema(schema).valid;
}

const DEFAULT_MAX_MESSAGES = 60;
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

export function buildPromptAndSkills(config: FauiAgentConfig, prompt: string, options?: GeneratePageOptions): {
  systemPrompt: string;
  skillsUsed: string[];
  styleEnabled: boolean;
  contractComponents: string[];
} {
  const automaticSkills = selectFormSkills(`${prompt}\n${options?.context ?? ''}`, builtinSkills);
  const customSkills = config.skills ?? [];
  const allSkills = new Map<string, SkillDef>();
  for (const skill of automaticSkills) allSkills.set(skill.name, skill);
  for (const skill of customSkills) {
    allSkills.delete(skill.name);
    allSkills.set(skill.name, skill);
  }
  const selectedSkills = [...allSkills.values()];
  const styleEnabled = selectedSkills.some(skill => skill.capabilities?.includes('style'));
  const contractComponents = selectFormContractComponents(
    `${prompt}\n${options?.context ?? ''}`,
    options?.currentSchema,
  );
  const skillContent = selectedSkills
    .map((skill) => `<skill name="${skill.name}">\n${skill.content}\n</skill>`)
    .join('\n\n');
  return {
    systemPrompt: buildSystemPrompt(
      config.systemPrompt,
      buildFormContractPrompt({ components: contractComponents, includeStyle: styleEnabled }),
      skillContent,
      styleEnabled,
      options,
    ),
    skillsUsed: selectedSkills.map((skill) => skill.name),
    styleEnabled,
    contractComponents,
  };
}

function validateGeneratedSchema(schema: unknown, styleEnabled: boolean): ReturnType<typeof validateFormSchema> {
  const validation = validateFormSchema(schema);
  if (!validation.valid) return validation;

  try {
    executeToolCall(
      'set_components',
      schema as Record<string, unknown>,
      { components: [], dataModel: {} },
      { styleEnabled },
    );
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
  return validation;
}

function getToolContractComponents(
  args: Record<string, unknown>,
  currentSchema: PageSchema,
  error: unknown,
): string[] {
  const ids = new Map(currentSchema.components.map(component => [component.id, component.component]));
  const components = args.components;
  if (Array.isArray(components)) {
    for (const value of components) {
      if (!isRecord(value)) continue;
      if (typeof value.id === 'string' && typeof value.component === 'string') {
        ids.set(value.id, value.component);
      }
    }
  }

  const result = new Set<string>();
  const message = error instanceof Error ? error.message : String(error);
  for (const match of message.matchAll(/组件\s+([^\s(的]+)(?:\s+\(([^)]+)\))?/g)) {
    const component = match[2] ?? ids.get(match[1]);
    if (component) result.add(component);
  }
  for (const match of message.matchAll(/使用了\s+([a-z][\w-]+)\s+未声明的属性/g)) {
    result.add(match[1]);
  }

  // If the validator cannot identify an ID, only use explicit component names
  // from this call. This is the narrowest useful fallback for malformed calls.
  if (result.size === 0 && Array.isArray(components)) {
    for (const value of components) {
      if (isRecord(value) && typeof value.component === 'string') result.add(value.component);
    }
  }

  return [...result].filter(component => getFormComponentContract(component));
}

export async function runAgentLoop(params: AgentLoopParams): Promise<GeneratePageResult> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;
  const { systemPrompt, skillsUsed, styleEnabled } = buildPromptAndSkills(config, prompt, options);
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

    const validation = validateGeneratedSchema(parsed, styleEnabled);
    if (!validation.valid) {
      messages.push(
        { role: 'response', outputItems: result.outputItems, timestamp: Date.now() },
        {
          role: 'user',
          content: `Schema 校验失败：${validation.errors.join('\n')}。请只输出符合 Form Edition 规则的完整 JSON。`,
          timestamp: Date.now(),
        },
      );
      continue;
    }

    return { schema: parsed as PageSchema, skillsUsed, turns };
  }

  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}

export async function* runAgentLoopStream(params: AgentLoopParams): AsyncGenerator<StreamEvent> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;
  const { systemPrompt, skillsUsed, styleEnabled } = buildPromptAndSkills(config, prompt, options);
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

    const validation = validateGeneratedSchema(parsed, styleEnabled);
    if (!validation.valid) {
      yield { type: 'status', message: '结构校验未通过，正在重试...' };
      messages.push(
        { role: 'response', outputItems: finalResult.outputItems, timestamp: Date.now() },
        {
          role: 'user',
          content: `Schema 校验失败：${validation.errors.join('\n')}。请只输出符合 Form Edition 规则的完整 JSON。`,
          timestamp: Date.now(),
        },
      );
      continue;
    }

    const result: GeneratePageResult = { schema: parsed as PageSchema, skillsUsed, turns };
    yield { type: 'done', result };
    return result;
  }

  yield { type: 'error', message: `Failed to generate valid schema after ${maxTurns} turns` };
  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}

export async function* runAgentLoopWithTools(params: AgentLoopParams): AsyncGenerator<StreamEvent> {
  const { prompt, config, options } = params;
  const maxTurns = config.maxTurns ?? 10;
  const promptConfig = buildPromptAndSkills(config, prompt, options);
  let { systemPrompt } = promptConfig;
  const { skillsUsed, styleEnabled } = promptConfig;
  const injectedContractComponents = new Set(promptConfig.contractComponents);
  const supplementalContractComponents = new Set<string>();
  const provider = new OpenAIResponsesProvider();
  const configuredTools = getConfiguredTools(config);
  const executeConfiguredTool = config.toolExecutor;

  const suppliedSchema = options?.currentSchema;
  if (suppliedSchema) {
    const validation = validateFormSchema(suppliedSchema);
    if (!validation.valid) {
      const message = `当前 schema 校验失败：${validation.errors.join('\n')}`;
      yield { type: 'error', message };
      throw new Error(message);
    }
  }
  let currentSchema: PageSchema = suppliedSchema
    ? JSON.parse(JSON.stringify(suppliedSchema))
    : { components: [], dataModel: {} };
  let hasSetComponents = currentSchema.components.length > 0;
  const messages: OpenAIResponsesMessage[] = [];
  appendHistory(messages, options);
  messages.push({ role: 'user', content: prompt, timestamp: Date.now() });

  if (skillsUsed.length > 0) {
    yield { type: 'skills_loaded', skills: skillsUsed };
  }

  if (currentSchema.components.length > 0) {
    messages.splice(messages.length - 1, 0, {
      role: 'user',
      content: `当前页面的完整 schema 如下，请基于此做增量修改：\n${JSON.stringify(currentSchema, null, 2)}`,
      timestamp: Date.now(),
    });
  }

  const maxMessages = config.maxMessages ?? DEFAULT_MAX_MESSAGES;
  let turns = 0;

  const appendSupplementalContracts = (components: string[]): void => {
    const additions = components.filter((component) => !injectedContractComponents.has(component)
      && !supplementalContractComponents.has(component));
    if (additions.length === 0) return;
    additions.forEach(component => supplementalContractComponents.add(component));
    systemPrompt += `\n\n## 校验失败后的补充组件契约\n${buildFormContractPrompt({
      components: additions,
      includeStyle: styleEnabled,
    })}`;
  };

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
      if (currentSchema.components.length === 0) {
        messages.push({
          role: 'user',
          content: '尚未创建有效 Schema。请调用 set_components，并提供完整 Form Edition components 和 dataModel。',
          timestamp: Date.now(),
        });
        continue;
      }
      yield { type: 'done', result: { schema: currentSchema, skillsUsed, turns } };
      return;
    }

    for (const toolCall of toolCalls) {
      yield { type: 'tool_use', name: toolCall.name };

      try {
        if (toolCall.argumentsError) throw new Error(toolCall.argumentsError);
        const schemaBeforeTool = JSON.parse(JSON.stringify(currentSchema)) as PageSchema;
        const result = executeConfiguredTool
          ? executeConfiguredTool(toolCall.name, toolCall.arguments, schemaBeforeTool, { styleEnabled })
          : executeToolCall(toolCall.name, toolCall.arguments, schemaBeforeTool, { styleEnabled });
        const readOnlyTool = toolCall.name === 'validate_schema' || toolCall.name === 'get_component_contracts';
        if (!readOnlyTool) {
          const validation = validateFormSchema(result.schema);
          if (!validation.valid) throw new Error(validation.errors.join('\n'));
        }

        if (!readOnlyTool) {
          currentSchema = result.schema;
          if (toolCall.name === 'set_components') hasSetComponents = true;
          yield { type: 'schema_updated', schema: { ...currentSchema } };
        }
        messages.push({
          role: 'tool',
          callId: toolCall.id,
          toolName: toolCall.name,
          output: result.message,
          isError: false,
          timestamp: Date.now(),
        });
      } catch (error) {
        appendSupplementalContracts(getToolContractComponents(toolCall.arguments, currentSchema, error));
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
    yield { type: 'done', result: { schema: currentSchema, skillsUsed, turns } };
    return;
  }

  yield { type: 'error', message: `Failed to generate valid schema after ${maxTurns} turns` };
  throw new Error(`faui-agent: failed to generate valid schema after ${maxTurns} turns`);
}
