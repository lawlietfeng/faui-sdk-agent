# faui-agent

AI Agent 调度框架，通过 LLM 工具调用增量生成 [faui](https://github.com/lawlietfeng/faui) JSON Schema 页面。

## 特性

- **工具化增量构建**：通过 `set_components` / `update_components` / `remove_components` 工具调用，LLM 增量修改 schema，而非每次全量生成
- **多轮对话**：支持历史消息和已有 schema 传入，实现连续对话式页面编辑
- **流式输出**：实时返回 LLM 文本、工具调用、schema 更新等事件
- **多 LLM 支持**：Anthropic、OpenAI、Google、Azure、Groq、Mistral、xAI 等
- **完全可定制**：system prompt、tools、tool executor、skills 均可外部传入
- **内置安全机制**：工具参数运行时验证、消息历史自动裁剪、schema 快照回滚、连续失败熔断

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
  apiKey: process.env.ANTHROPIC_API_KEY!,
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
import { FauiAgent, SYSTEM_BASE, builtinSkills } from '@lawlietfeng/faui-agent';

const agent = new FauiAgent({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  systemPrompt: SYSTEM_BASE,
  skills: builtinSkills,
});

const result = await agent.generatePage('生成一个登录表单');
console.log(result.schema);
```

## API

### FauiAgentConfig

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `apiKey` | `string` | ✅ | — | LLM API Key |
| `systemPrompt` | `string` | ✅ | — | 系统提示词 |
| `provider` | `string` | — | `'anthropic'` | LLM 提供商 |
| `model` | `string` | — | `'claude-sonnet-4-20250514'` | 模型名称 |
| `baseUrl` | `string` | — | — | 代理/自部署端点 URL |
| `useTools` | `boolean` | — | `false` | 启用工具化增量构建模式 |
| `tools` | `unknown[]` | — | `SCHEMA_TOOLS` | 自定义工具定义 |
| `toolExecutor` | `Function` | — | `executeToolCall` | 自定义工具执行器 |
| `skills` | `SkillDef[]` | — | — | Skills（非工具模式用） |
| `skillPath` | `string` | — | — | 从目录加载 .md 格式 skills |
| `temperature` | `number` | — | `0.3` | 温度参数 |
| `maxTurns` | `number` | — | `10` | 最大循环轮次 |
| `maxMessages` | `number` | — | `60` | 消息历史最大条数 |
| `maxSnapshots` | `number` | — | `10` | Schema 快照最大保留数 |
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
  builtinSkills,       // 内置 skills（组件目录、布局模式、数据绑定、踩坑记录）
  SkillStore,          // Skill 加载器（支持从 .md 文件加载）
} from '@lawlietfeng/faui-agent';
```

### 内置工具

| 工具 | 说明 |
|------|------|
| `set_components` | 初始化页面 schema（首次生成） |
| `update_components` | 按 ID 更新或新增组件 |
| `remove_components` | 按 ID 删除组件 |
| `update_data_model` | 深度合并 dataModel |
| `validate_schema` | 校验 schema 完整性 |

### 内置 Skills

| Skill | 说明 |
|-------|------|
| `component-catalog` | 67+ faui 组件清单、字段说明、适用场景 |
| `layout-patterns` | 常见布局模式（居中、栅格、响应式、深浅交替） |
| `data-binding` | 数据绑定规则、表达式语法、Action 系统 |
| `pitfalls` | 14 条踩坑记录与最佳实践 |

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
- [pi-ai](https://github.com/nicolecomputer/pi-ai) — 多 LLM 提供商抽象层
- tsup — 构建（CJS + ESM + DTS）

## 在线预览

- **表单版示例（含 Agent 演示）**: https://lawlietfeng.github.io/faui-landing-page/
- **完整版示例**: https://lawlietfeng.github.io/full-landing-page/

## 相关项目

| 项目 | 说明 |
|------|------|
| [faui](https://github.com/lawlietfeng/faui) | JSON Schema UI 渲染器，67+ 组件，本项目生成的 schema 由 faui 渲染 |
| [faui-landing-page](https://github.com/lawlietfeng/faui-landing-page) | 表单版演示站点（含 Agent 演示页面） |
| [full-landing-page](https://github.com/lawlietfeng/full-landing-page) | 完整版组件示例站点 |

## License

[AGPL-3.0](./LICENSE)
