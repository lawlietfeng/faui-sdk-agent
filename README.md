# faui-agent

AI Agent 调度框架，通过 OpenAI Responses API 的工具调用增量生成 [faui-sdk](https://github.com/lawlietfeng/faui-sdk) Form JSON Schema。

## 特性

- **工具化增量构建**：通过 `set_components` / `update_components` / `remove_components` 工具调用，LLM 增量修改 schema，而非每次全量生成
- **多轮对话**：支持历史消息和已有 schema 传入，实现连续对话式页面编辑
- **流式输出**：实时返回 LLM 文本、工具调用、schema 更新等事件
- **OpenAI Responses 协议**：支持 OpenAI 官方端点和兼容该协议的代理地址
- **原生网络调用**：基于 Node.js 22 原生 `fetch`，不依赖 OpenAI SDK
- **动态 Contract 注入**：仅注入本次需求、当前 Schema 和兜底字段所需的组件契约
- **按需 Skills**：仅按本次需求加载内置专项规则；显式传入的自定义 Skill 始终加载
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
| `skills` | `SkillDef[]` | — | — | 显式注入的自定义 Skills；始终加载，并可覆盖同名内置 Skill |
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
  SCHEMA_TOOLS,        // 内置工具定义（含组件契约查询）
  executeToolCall,     // 内置工具执行器
  builtinSkills,       // 内置 Form Skills
  SkillStore,          // Skill 加载器（支持从 .md 文件加载）
} from '@lawlietfeng/faui-agent';
```

### 内置工具

| 工具 | 说明 |
|------|------|
| `set_components` | 初始化并校验页面 schema（首次生成，必须提供 dataModel） |
| `get_component_contracts` | 批量查询一个或多个 Form 组件的完整契约，不修改 Schema |
| `update_components` | 按 ID 更新或新增组件，并自动校验 |
| `remove_components` | 按 ID 删除组件 |
| `update_data_model` | 深度合并 dataModel，并自动校验 |
| `validate_schema` | 校验 schema 完整性 |

### 内置 Skills

| Skill | 说明 |
|-------|------|
| `form-core` | Form Schema 基础规则；保留为兼容内置 Skill，不再自动注入 |
| `form-layout` | 分组、栅格和按钮区布局 |
| `field-text` | 文本、数字、自动补全和提及输入 |
| `field-choice` | 下拉、单选、多选、开关和分段选择 |
| `field-date` | 日期、时间和日历 |
| `field-advanced` | 上传、层级选择、穿梭、评分、滑块和颜色 |
| `validation-submit` | 校验、内部提交和重置 |
| `actions` | HTTP、消息、通知和字段联动 |
| `dynamic-form` | 条件与重复表单项；仅在明确需要时加载 |

默认不生成视觉样式、虚构接口或成功提示。用户未提供业务动作时，提交按钮只执行表单校验。

### 动态 Contract 注入

基础提示词只包含 Form Edition、工具调用、图结构、数据绑定和提交等硬规则。每次调用会额外注入：

- 固定基础组件：`box`、`form`、`text`、`button`；
- 从本次需求识别出的组件；
- 当前 Schema 已使用的组件；
- 需求过于笼统时的常用字段兜底组件。

模型需要未注入组件时，会调用 `get_component_contracts` 批量查询。工具校验失败后，Agent 只补充失败调用涉及组件的契约后重试；不会重新注入完整 Contract。

`FORM_CONTRACT_PROMPT` 仍作为兼容出口导出，但它是全量 Contract。新集成应使用 Agent 的动态注入，或调用 `buildFormContractPrompt({ components })` 按需构造提示词。

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

const myExecutor = (name, args, schema, options) => {
  if (name === 'fetch_api_schema') {
    // 自定义逻辑
    return { schema, message: 'Fetched API schema' };
  }
  return executeToolCall(name, args, schema, options);
};

const agent = new FauiAgent({
  apiKey: '...',
  systemPrompt: TOOL_SYSTEM_PROMPT,
  useTools: true,
  tools: myTools,
  toolExecutor: myExecutor,
});
```

传入 `tools` 时会完整替换 `SCHEMA_TOOLS`；如需按需查询组件属性，请同时保留或自行实现 `get_component_contracts`。自定义 `toolExecutor` 需要自行执行 Schema 校验，并应将第 4 个 `options` 参数传给 `executeToolCall`，以保留样式策略。直接调用 `executeToolCall` 且需要样式时，传入第 4 个参数 `{ styleEnabled: true }`。

### 自定义样式 Skill

默认不会新增或修改组件的 `style`，即使用户需求中提到颜色或视觉风格。要显式开启样式模式，在自定义 Skill 添加 `capabilities: ['style']`：

```typescript
const brandStyleSkill = {
  name: 'brand-style',
  description: '公司后台视觉规范',
  capabilities: ['style'],
  content: `
- 页面背景使用 #f7f8fa，主内容区域保留 16px 留白。
- 表面容器使用白色背景和 8px 圆角。
- 主按钮使用 #1677ff。
- 只使用 React 行内 CSS 的驼峰属性。
`,
};

const agent = new FauiAgent({
  apiKey: process.env.OPENAI_API_KEY!,
  systemPrompt: TOOL_SYSTEM_PROMPT,
  useTools: true,
  skills: [brandStyleSkill],
});
```

目录 Skill 的 frontmatter 使用简写标量：

```md
---
name: brand-style
description: 公司后台视觉规范
capabilities: style
---

- 页面背景使用 #f7f8fa。
- 主按钮使用 #1677ff。
```

启用后，`style` 只能是平铺对象，值只能为字符串或数字；使用 React 驼峰样式属性，不使用 `className`、Tailwind、伪类或 CSS 变量。样式 Skill 只描述视觉规则，不应改变组件、数据绑定、校验或动作协议。多个样式 Skill 冲突时，以后注入的为准；`config.skills` 中的用户 Skill 晚于内置 Skill。已有 Schema 的样式始终保留；没有样式 Skill 时，Agent 会拒绝新增或修改样式。

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
