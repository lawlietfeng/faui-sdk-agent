/**
 * FauiAgent — 用户接口
 *
 * 用户通过此类配置 API Key、模型、代理地址，
 * 调用 generatePage() 生成 faui 页面 JSON。
 *
 * 内部调用 agent-loop（不对外暴露），按需加载 skills。
 */

import type { GeneratePageOptions, GeneratePageResult, PageSchema, StreamEvent } from './types.js';
import { SkillStore, type SkillDef } from './skill-store.js';
import { runAgentLoop, runAgentLoopStream, runAgentLoopWithTools } from './agent-loop.js';
import type { ToolExecutionOptions } from './tool-executor.js';

export interface ToolResult {
  schema: PageSchema;
  message: string;
}

/** Agent 配置 */
export interface FauiAgentConfig {
  /** 仅支持 OpenAI Responses 协议，默认 'openai' */
  provider?: 'openai';
  /** 模型名称 */
  model?: string;
  /** API Key（必填） */
  apiKey: string;
  /** 代理/自部署端点 URL */
  baseUrl?: string;
  /** 温度参数 */
  temperature?: number;
  /** 单次生成的最大输出 Token，默认 16384 */
  maxOutputTokens?: number;
  /** 最大循环轮次 */
  maxTurns?: number;

  /** 系统提示词（必填） */
  systemPrompt: string;

  /** 使用工具化模式（增量构建），默认 false */
  useTools?: boolean;
  /** 自定义工具定义（不传则使用内置 SCHEMA_TOOLS） */
  tools?: unknown[];
  /** 自定义工具执行器（不传则使用内置 executeToolCall） */
  toolExecutor?: (
    name: string,
    args: Record<string, unknown>,
    schema: PageSchema,
    options?: ToolExecutionOptions,
  ) => ToolResult;

  /** 额外 Skills；显式传入的 Skills 会与自动选择的 Form Skills 一同加载 */
  skills?: SkillDef[];
  /** 从指定目录加载 .md 格式的 skills（可选） */
  skillPath?: string;

  /** 消息历史最大条数，超出后裁剪早期消息，默认 60 */
  maxMessages?: number;
  /** @deprecated 工具会在副本上执行，失败更新不会写入当前 Schema。 */
  maxSnapshots?: number;
  /** JSON 解析连续失败次数上限，达到后终止，默认 3 */
  maxConsecutiveFailures?: number;
}

export class FauiAgent {
  private config: FauiAgentConfig;
  private skillStore: SkillStore | null;

  constructor(config: FauiAgentConfig) {
    if (!config.apiKey) {
      throw new Error('faui-agent: apiKey is required');
    }
    if (!config.systemPrompt) {
      throw new Error('faui-agent: systemPrompt is required');
    }
    if (config.provider && config.provider !== 'openai') {
      throw new Error('faui-agent: only the openai Responses provider is supported');
    }
    this.config = {
      maxTurns: 10,
      ...config,
      provider: 'openai',
      model: config.model ?? 'gpt-5.6',
    };
    this.skillStore = config.skillPath
      ? new SkillStore({ skillPath: config.skillPath })
      : null;
  }

  /** 获取 SkillStore 实例（高级用法） */
  getSkillStore(): SkillStore | null {
    return this.skillStore;
  }

  private async getRuntimeConfig(): Promise<FauiAgentConfig> {
    if (!this.skillStore) return this.config;

    const loadedSkills = await this.skillStore.load();
    return {
      ...this.config,
      skills: [...(this.config.skills ?? []), ...loadedSkills],
    };
  }

  /**
   * 生成 faui 页面 JSON
   * @param prompt 页面描述
   * @param options 生成选项
   */
  async generatePage(
    prompt: string,
    options?: GeneratePageOptions,
  ): Promise<GeneratePageResult> {
    const config = await this.getRuntimeConfig();
    return runAgentLoop({
      prompt,
      config,
      options,
    });
  }

  /**
   * 流式生成 faui 页面 JSON
   * @param prompt 页面描述
   * @param options 生成选项
   */
  async *generatePageStream(
    prompt: string,
    options?: GeneratePageOptions,
  ): AsyncGenerator<StreamEvent> {
    const config = await this.getRuntimeConfig();
    if (config.useTools) {
      yield* runAgentLoopWithTools({ prompt, config, options });
    } else {
      yield* runAgentLoopStream({
        prompt,
        config,
        options,
      });
    }
  }
}
