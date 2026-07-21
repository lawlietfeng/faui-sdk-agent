/**
 * Provider 层 — 重导出 pi-ai 核心能力
 *
 * 用户无需直接依赖 pi-ai，通过 faui-agent 间接使用。
 * agent-loop 内部消费这些 API，此处仅做类型桥接。
 */

export type {
  Api,
  Provider,
  Model,
  StreamFunction,
  StreamOptions,
  ThinkingLevel,
  StopReason,
} from '@mariozechner/pi-ai';

export {
  stream,
  streamSimple,
  getModel,
  getModels,
  isContextOverflow,
} from '@mariozechner/pi-ai';
