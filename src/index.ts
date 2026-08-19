/**
 * faui-agent — AI Agent for faui page generation
 *
 * 公开 API 入口。agent-loop 内部实现不在此导出。
 */

export { FauiAgent, type FauiAgentConfig, type ToolResult } from './agent.js';
export type {
  PageSchema,
  PageComponent,
  GeneratePageOptions,
  GeneratePageResult,
  StreamEvent,
} from './types.js';
export { SCHEMA_TOOLS } from './tools.js';
export { executeToolCall } from './tool-executor.js';
export { TOOL_SYSTEM_PROMPT } from './tool-system-prompt.js';
export { builtinSkills } from './skills/index.js';
export { SkillStore, type SkillDef } from './skill-store.js';
export {
  DEFAULT_OPENAI_BASE_URL,
  OpenAIResponsesProvider,
  buildResponsesUrl,
} from './provider.js';
export type {
  OpenAIResponseOutputItem,
  OpenAIResponseToolCall,
  OpenAIResponsesEvent,
  OpenAIResponsesMessage,
  OpenAIResponsesProviderOptions,
  OpenAIResponsesRequest,
  OpenAIResponsesResult,
  OpenAIResponsesTool,
} from './provider.js';

export const SYSTEM_BASE = `You are faui-agent, an AI that generates faui page JSON schemas.

Your output MUST be a valid JSON object matching this structure:
{
  "components": [...],
  "dataModel": { ... }
}

Rules:
- Every component needs a unique "id" field
- The schema must contain a root component with id "root"
- Generate only faui-sdk Form Edition components
- Use "component" field to specify the component type; containers reference child component IDs through "children"
- A condition uses exactly one mode: when + then (optional else/default), or match + cases (optional default). Do not mix modes, use a "condition" property, or add children.
- Use "\${$root.field}" for dynamic condition values; do not use { "path": "/field" } for when or match. Referenced fields must have initial dataModel values.
- Include a dataModel object, even when it is empty
- Output ONLY the JSON, no markdown fences, no explanation
`;
