# OpenAI Provider 本地封装实施计划

## 目标

移除 `@mariozechner/pi-ai`，在项目内实现只支持 OpenAI Responses 协议的模型调用层。

保留现有 `FauiAgent`、Schema 工具、Skills、增量更新和 `StreamEvent` 对外行为。

## 范围

本次支持：

- OpenAI Responses API 及兼容该协议的代理端点
- 文本生成与流式文本
- 自定义 Function Tools
- 工具结果按 `call_id` 回传
- 本地维护多轮消息与工具调用状态
- 由调用方传入的 `apiKey`、`model` 与 `baseUrl`

本次不支持：

- Anthropic、Google、Azure、Bedrock、Groq、Mistral、xAI、OpenRouter 等供应商
- Chat Completions API
- OpenAI 托管工具（Web Search、File Search 等）
- `previous_response_id`、Conversations API
- 自动重试与取消控制

## 兼容性约束

以下对外 API 必须保持不变：

- `FauiAgent`
- `generatePage()`
- `generatePageStream()`
- `PageSchema`、Schema 工具和 Tool Executor
- `StreamEvent`：`text_delta`、`tool_use`、`schema_updated`、`done` 等事件名称与载荷

以下属于预期破坏性变更：

- `provider` 只接受 `openai`；这里代表 OpenAI Responses 协议，不代表请求必须发送到 OpenAI 官方域名。传入其他值时抛出明确错误。
- 默认 Provider 改为 `openai`。
- 默认模型改为 `gpt-5.6`。
- README、示例和配置说明不再宣称支持多供应商。
- `src/provider.ts` 不再重导出 `pi-ai` 的类型和方法。

## 连接配置

调用方仍通过 `FauiAgentConfig` 配置连接信息：

```ts
const agent = new FauiAgent({
  provider: 'openai',
  apiKey: process.env.LLM_API_KEY!,
  model: 'your-model-id',
  baseUrl: 'https://your-proxy.example.com/v1',
  systemPrompt: TOOL_SYSTEM_PROMPT,
  useTools: true,
});
```

约束：

- `apiKey`：必填，原样传给调用端；不得记录到日志、错误信息或事件中。
- `model`：调用方可填写任意模型 ID；未传时使用项目默认模型 `gpt-5.6`。
- `baseUrl`：可选；传入时必须原样交给本地原生 `fetch` Transport 使用，不能覆盖或写死为 `api.openai.com`。
- 未传 `baseUrl` 时，本地 Transport 才使用默认官方地址。
- 自定义端点必须兼容 OpenAI **Responses API** 与 Function Tool 调用；只兼容 Chat Completions 的代理不在本次支持范围内。

## 实施步骤

### 1. 新建本地 OpenAI Provider

新增 `src/openai-responses-provider.ts`，使用原生 `fetch` 封装 OpenAI Responses API：

- 不添加 `openai` SDK 或其他 HTTP 运行时依赖；Node.js 22 原生 `fetch`、`ReadableStream` 和 `TextDecoder` 已满足需求。
- 根据调用方 `baseUrl` 构造请求地址：规范化末尾 `/` 后追加 `responses`。例如 `https://proxy.example.com/v1` 对应 `https://proxy.example.com/v1/responses`。
- `baseUrl` 未传时才使用内部默认值 `https://api.openai.com/v1`；调用方传入时绝不覆盖、拼接其他域名或改写为官方地址。
- 普通请求使用 `fetch()` 发起 `POST /responses`，请求头只包含必要的 `Authorization: Bearer <apiKey>` 与 `Content-Type: application/json`。
- 流式请求使用 `stream: true`，自行解析 SSE 的 `event:` 与 `data:` 帧；只映射本项目所需的文本增量、工具调用完成、完成和错误事件。
- 接收系统提示词、历史消息、工具定义、调用方配置的模型、API Key、Base URL、温度和最大输出 Token。
- 将当前 `SCHEMA_TOOLS` 转为 Responses Function Tool：

  ```ts
  {
    type: 'function',
    name,
    description,
    parameters,
  }
  ```

- 统一输出本地事件：文本增量、完整工具调用、完成、错误。
- Function Tool 调用必须保留 `call_id`、工具名和完整 JSON 参数。
- 工具结果使用 `function_call_output` 回传，并使用相同 `call_id`。

建议定义最小内部类型：

```ts
interface OpenAIProviderRequest {
  systemPrompt: string;
  messages: AgentMessage[];
  tools: unknown[];
  model: string;
  apiKey: string;
  baseUrl?: string;
  temperature?: number;
}

type OpenAIProviderEvent =
  | { type: 'text_delta'; delta: string }
  | { type: 'tool_call'; id: string; name: string; arguments: Record<string, unknown> }
  | { type: 'done'; outputItems: unknown[]; hasToolCalls: boolean }
  | { type: 'error'; message: string };
```

Provider 内部保留 Responses 的原生 output items，确保下一轮请求能正确携带此前的 `function_call` 与本地 `function_call_output`。

Provider 应允许注入 `fetch` 实现，仅用于测试；生产默认使用 `globalThis.fetch`。不得在日志、错误或事件中输出完整 API Key。

### 2. 重构 Agent Loop

修改 `src/agent-loop.ts`：

- 删除所有 `pi-ai` import、`getModel()`、Provider 映射表与 `Model<Api>` 类型。
- 用本地 `OpenAIResponsesProvider` 替换 `complete()` 和 `stream()`。
- 保持现有工具调用循环、Schema 快照、失败回滚和历史消息裁剪逻辑。
- 将 Provider 的 `text_delta` 直接转换为现有 `StreamEvent.text_delta`。
- 将 Provider 的 `tool_call` 转换为现有工具执行流程；执行结果通过 Provider 生成的 `function_call_output` 加回下一轮上下文。
- 非工具模式继续从完整文本提取 JSON 并使用现有 `validateSchema()` 校验。
- 工具模式在模型停止且已有 Schema 时继续返回现有 `done` 事件格式。

不要改动 `tool-executor.ts` 的业务语义。

### 3. 调整配置和公开 Provider 模块

修改 `src/agent.ts`：

- `provider?: 'openai'`，默认值为 `openai`。
- `model` 保持可配置；未传时默认 `gpt-5.6`。
- 构造函数中拒绝非 `openai` Provider，并给出明确提示。
- 保留 `apiKey`、`model`、`baseUrl`、`temperature`、`maxTurns` 等配置字段；不得覆盖调用方提供的 `model` 或 `baseUrl`。

修改 `src/provider.ts`：

- 移除所有 `pi-ai` 重导出。
- 改为导出本地 OpenAI Provider 及其必要类型；不要引入第三方 SDK 类型作为项目公共契约。

### 4. 更新依赖和文档

- 从 `package.json` 与 lockfile 移除 `@mariozechner/pi-ai`。
- 不添加 `openai` 或其他 HTTP SDK 运行时依赖。
- 更新 `README.md`：
  - OpenAI 是唯一支持的 Provider。
  - 安装和示例使用 `OPENAI_API_KEY`。
  - 删除 Anthropic 与多供应商说明。
  - 提供官方地址与代理地址两种配置示例。
  - 说明 `baseUrl` 必须兼容 OpenAI Responses API，且不会被本地 Transport 覆盖。
- 更新 `examples/basic.ts` 的 API Key、模型和注释。
- 更新 `src/index.ts` 中仍然声称 `dataModel` 可选的说明；该规则应与 Form Schema 约束一致。

### 5. 测试

不要使用真实 API Key 或网络请求。通过可注入的假 `fetch` / Provider 测试：

- 无工具模式：完整文本能生成并解析 Schema。
- 工具模式：模型调用 `set_components` 后，工具结果会携带正确 `call_id` 回传。
- 多工具调用：按调用顺序执行，Schema 事件正常发出。
- 工具执行失败：维持现有快照回滚行为，并将错误结果回传模型。
- 流式模式：文本增量、工具调用和最终 `done` 事件与现有公开格式一致。
- 非 `openai` 的 provider 配置会失败，且错误信息明确。
- 自定义 `baseUrl` 与 `model` 能原样进入请求；请求路径正确追加 `/responses`。
- 未传 `baseUrl` 时，使用内部默认官方地址。
- SSE 分帧可正确处理跨 chunk 的 `event:` / `data:` 数据，以及文本增量和 Function Tool 调用完成事件。

现有 `src/agent-loop.test.ts` 与 `src/tool-executor.test.ts` 应保留，并补充 Provider 适配测试。

## 验证命令

```bash
npm run lint
npm run typecheck
npm run test
```

## 验收标准

- 项目源码、依赖和公开 Provider 模块不再引用 `pi-ai`。
- OpenAI Responses API 的普通生成、流式生成和 Function Tool 循环均有自动化测试。
- `generatePage()` 和 `generatePageStream()` 的既有事件与返回类型不变。
- `useTools: true` 时可通过 Function Tool 完成 Schema 的首次创建和增量更新。
- Anthropic 或其他 Provider 配置不会被静默错误地路由到 OpenAI。
- 调用方传入的 `apiKey`、`model` 和 `baseUrl` 能正确用于代理端点，且 API Key 不会出现在日志或错误文本中。
- lint、typecheck 和 test 全部通过。
