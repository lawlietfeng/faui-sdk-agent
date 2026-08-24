# faui-agent

AI Agent 调度框架，通过 OpenAI Responses API 的工具调用增量生成 [faui-sdk](https://github.com/lawlietfeng/faui-sdk) Form JSON Schema。

## 特性

- **工具化增量构建**：通过 `set_components` / `update_components` / `remove_components` 工具调用，LLM 增量修改 schema，而非每次全量生成
- **多轮对话**：支持历史消息和已有 schema 传入，实现连续对话式页面编辑
- **流式输出**：实时返回 LLM 文本、工具调用、schema 更新等事件
- **OpenAI Responses 协议**：支持 OpenAI 官方端点和兼容该协议的代理地址
- **原生网络调用**：基于 Node.js 22 原生 `fetch`，不依赖 OpenAI SDK
- **按需 Skills**：始终加载表单基础规则，并按需求自动加载字段、校验和动作知识
- **Form Edition 约束**：只生成 `faui-sdk` Form Edition 组件，不生成 `full` 专属组件
- **自动校验**：每次 Schema 修改后校验根节点、绑定、组件白名单、表单提交和必填标签结构
- **完全可定制**：system prompt、tools、tool executor、额外 skills 均可外部传入
- **SDK 契约驱动**：组件白名单、允许属性、动态属性绑定和 children 模式来自本地 `faui-sdk/src/formComponentContracts.ts`

## 安装

```bash
npm install @lawlietfeng/faui-agent
```

## 快速开始

### 工具模式（推荐）

LLM 通过工具调用增量构建 schema，支持多轮对话修改：

```typescript
import { FauiAgent, TOOL_SYSTEM_PROMPT } from '@lawlietfeng/faui-agent';

const agent = new FauiAgent({
  apiKey: process.env.OPENAI_API_KEY!,
  model: 'gpt-5.6',
  // baseUrl: 'https://your-proxy.example.com/v1',
  systemPrompt: TOOL_SYSTEM_PROMPT,
  useTools: true,
});

// 流式生成
for await (const event of agent.generatePageStream('生成一个请假表单')) {
  switch (event.type) {
    case 'text_delta':
      process.stdout.write(event.delta);
      break;
    case 'schema_updated':
      console.log('Schema updated:', event.schema.components.length, 'components');
      break;
    case 'done':
      console.log('Final schema:', JSON.stringify(event.result.schema, null, 2));
      break;
  }
}
```

### 多轮对话

第二次调用时传入历史消息和当前 schema，LLM 会基于已有结构做增量修改：

```typescript
const schema = previousResult.schema;

for await (const event of agent.generatePageStream('把开始日期和结束日期加上范围约束', {
  history: [
    { role: 'user', content: '生成一个请假表单' },
    { role: 'assistant', content: '已生成请假表单...' },
  ],
  currentSchema: schema,
})) {
  // ...
}
```

### 非工具模式

LLM 直接输出完整 JSON，适合简单场景：

```typescript
import { FauiAgent, SYSTEM_BASE } from '@lawlietfeng/faui-agent';

const agent = new FauiAgent({
  apiKey: process.env.OPENAI_API_KEY!,
  systemPrompt: SYSTEM_BASE,
});

const result = await agent.generatePage('生成一个包含姓名和备注的反馈表单');
console.log(result.schema);
```

## API

### FauiAgentConfig

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `apiKey` | `string` | ✅ | — | LLM API Key |
| `systemPrompt` | `string` | ✅ | — | 系统提示词 |
| `provider` | `'openai'` | — | `'openai'` | 仅支持 OpenAI Responses 协议 |
| `model` | `string` | — | `'gpt-5.6'` | 模型名称 |
| `baseUrl` | `string` | — | `https://api.openai.com/v1` | 代理/自部署端点 URL，必须兼容 Responses API |
| `useTools` | `boolean` | — | `false` | 启用工具化增量构建模式 |
| `tools` | `unknown[]` | — | `SCHEMA_TOOLS` | 自定义工具定义 |
| `toolExecutor` | `Function` | — | `executeToolCall` | 自定义工具执行器 |
| `skills` | `SkillDef[]` | — | — | 额外 Skills；会与自动选择的 Form Skills 一起加载 |
| `skillPath` | `string` | — | — | 从目录加载 .md 格式 skills |
| `temperature` | `number` | — | `0.3` | 温度参数 |
| `maxOutputTokens` | `number` | — | `16384` | 单次生成最大输出 Token |
| `maxTurns` | `number` | — | `10` | 最大循环轮次 |
| `maxMessages` | `number` | — | `60` | 消息历史最大条数 |
| `maxSnapshots` | `number` | — | — | 已弃用；失败工具调用不会写入当前 Schema |
| `maxConsecutiveFailures` | `number` | — | `3` | JSON 解析连续失败上限 |

### GeneratePageOptions

| 参数 | 类型 | 说明 |
|------|------|------|
| `history` | `Array<{ role, content }>` | 历史对话消息 |
| `currentSchema` | `PageSchema` | 当前已有的 schema（多轮修改时传入） |
| `pagePrefix` | `string` | 组件 ID 前缀 |
| `existingIds` | `string[]` | 已有的组件 ID（避免冲突） |
| `context` | `string` | 额外上下文 |

### StreamEvent

| 事件类型 | 说明 |
|----------|------|
| `status` | 状态消息（如"正在分析需求..."） |
| `generating` | 开始生成 |
| `text_delta` | LLM 文本增量 |
| `tool_use` | 工具调用（名称） |
| `schema_updated` | Schema 已更新（含最新 schema） |
| `skills_loaded` | Skills 加载完成 |
| `error` | 错误 |
| `done` | 完成（含最终结果） |

## 内置导出

faui-agent 将 system prompt、tools、skills 等作为便捷导出，消费方可直接引用或组合使用：

```typescript
import {
  TOOL_SYSTEM_PROMPT,  // 工具模式系统提示词
  SYSTEM_BASE,         // 非工具模式基础提示词
  SCHEMA_TOOLS,        // 内置工具定义（set/update/remove/validate）
  executeToolCall,     // 内置工具执行器
  builtinSkills,       // 内置 Form Skills
  SkillStore,          // Skill 加载器（支持从 .md 文件加载）
} from '@lawlietfeng/faui-agent';
```

### 内置工具

| 工具 | 说明 |
|------|------|
| `set_components` | 初始化并校验页面 schema（首次生成，必须提供 dataModel） |
| `update_components` | 按 ID 更新或新增组件，并自动校验 |
| `remove_components` | 按 ID 删除组件 |
| `update_data_model` | 深度合并 dataModel，并自动校验 |
| `validate_schema` | 校验 schema 完整性 |

### 内置 Skills

| Skill | 说明 |
|-------|------|
| `form-core` | Form Schema、绑定、标签、校验和内部提交基础规则；始终加载 |
| `form-layout` | 分组、栅格和按钮区布局 |
| `field-text` | 文本、数字、自动补全和提及输入 |
| `field-choice` | 下拉、单选、多选、开关和分段选择 |
| `field-date` | 日期、时间和日历 |
| `field-advanced` | 上传、层级选择、穿梭、评分、滑块和颜色 |
| `validation-submit` | 校验、内部提交和重置 |
| `actions` | HTTP、消息、通知和字段联动 |
| `dynamic-form` | 条件与重复表单项；仅在明确需要时加载 |

默认不生成视觉样式、虚构接口或成功提示。用户未提供业务动作时，提交按钮只执行表单校验。

### 同步本地 faui-sdk Form 契约

Agent 当前以相邻目录的本地 `faui-sdk` 为默认来源：`../faui-sdk/src/formComponentContracts.ts`。契约快照位于 `src/form-contracts.generated.ts`，更新 SDK 后执行：

```bash
npm run sync:form-contracts
```

也可以通过 `FAUI_SDK_ROOT` 指定本地 SDK 路径。未同步快照时，Agent 继续使用上一次已生成的契约版本。

## 自定义扩展

### 自定义 System Prompt

```typescript
const agent = new FauiAgent({
  apiKey: '...',
  systemPrompt: '你是一个专门生成后台管理页面的 AI 助手...',
  useTools: true,
});
```

### 自定义工具

```typescript
import { SCHEMA_TOOLS, executeToolCall } from '@lawlietfeng/faui-agent';

const myTools = [
  ...SCHEMA_TOOLS,
  {
    name: 'fetch_api_schema',
    description: 'Fetch API schema from backend',
    parameters: Type.Object({ url: Type.String() }),
  },
];

const myExecutor = (name, args, schema) => {
  if (name === 'fetch_api_schema') {
    // 自定义逻辑
    return { schema, message: 'Fetched API schema' };
  }
  return executeToolCall(name, args, schema);
};

const agent = new FauiAgent({
  apiKey: '...',
  systemPrompt: TOOL_SYSTEM_PROMPT,
  useTools: true,
  tools: myTools,
  toolExecutor: myExecutor,
});
```

## 技术栈

- TypeScript (strict mode)
- Node.js 22 原生 `fetch`、`ReadableStream`、`TextDecoder`
- tsup — 构建（CJS + ESM + DTS）

## 在线预览

- **表单版示例（含 Agent 演示）**: https://lawlietfeng.github.io/faui-landing-page/

## 相关项目

| 项目 | 说明 |
|------|------|
| [faui-sdk](https://github.com/lawlietfeng/faui-sdk) | Form JSON Schema 渲染器，本项目生成的 schema 由其渲染 |
| [faui-landing-page](https://github.com/lawlietfeng/faui-landing-page) | 表单版演示站点（含 Agent 演示页面） |

## License

[AGPL-3.0](./LICENSE)
