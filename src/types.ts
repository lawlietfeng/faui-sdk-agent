/**
 * faui-agent 类型定义
 */

/** 页面 JSON Schema 组件定义 */
export interface PageComponent {
  id: string;
  component: string;
  children?: string[];
  style?: Record<string, unknown>;
  className?: string;
  content?: string;
  [key: string]: unknown;
}

/** 页面 JSON Schema */
export interface PageSchema {
  components: PageComponent[];
  dataModel?: Record<string, unknown>;
}

/** 页面生成选项 */
export interface GeneratePageOptions {
  /** 页面名称前缀（用于组件 ID 命名空间） */
  pagePrefix?: string;
  /** 已有的组件 ID 列表（避免冲突） */
  existingIds?: string[];
  /** 额外上下文（如设计风格要求） */
  context?: string;
  /** 历史对话消息（用于多轮对话） */
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  /** 当前已有的 schema（多轮对话时传入，用于增量修改） */
  currentSchema?: PageSchema;
}

/** 页面生成结果 */
export interface GeneratePageResult {
  /** 生成的页面 JSON Schema */
  schema: PageSchema;
  /** 本次使用的 skill 列表 */
  skillsUsed: string[];
  /** 生成轮次 */
  turns: number;
}

/** 流式生成事件 */
export type StreamEvent =
  | { type: 'skills_loaded'; skills: string[] }
  | { type: 'status'; message: string }
  | { type: 'generating' }
  | { type: 'text_delta'; delta: string }
  | { type: 'tool_use'; name: string }
  | { type: 'schema_updated'; schema: PageSchema }
  | { type: 'error'; message: string }
  | { type: 'done'; result: GeneratePageResult };
