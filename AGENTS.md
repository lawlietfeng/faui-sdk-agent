# Repository Guidelines

## 当前重构状态

本仓库正在执行 FAUI Full-first 三项目重构，方案已经确认，代码实施待按清单推进。

开始新对话或新任务时，必须先阅读：

- `docs/full-first-rearchitecture-plan.md`：三项目总计划和最终决策
- `docs/faui-sdk-agent-full-agent-plan.md`：本仓库执行清单
- `docs/faui-sdk-full-first-plan.md`：`faui-sdk` 基础层清单
- `docs/landingpage-agentdemo-full-integration-plan.md`：AgentDemo 接入清单

当前项目不是 Form-only Agent。最终目标是生成和增量编辑 `faui-sdk` Full Schema。

执行顺序固定为：

1. 先完成 `/Users/lawliet/pro/com/faui-sdk` 的 Full-first 基础能力。
2. 再完成本仓库的 Full Agent 能力。
3. 最后完成 `/Users/lawliet/pro/com/faui-sdk-landing-page` 的 AgentDemo 接入。

执行 Agent 必须在对应 TODO 文档中勾选完成项，并记录改动文件、验证命令、未完成项和阻塞原因。

本轮明确后置：

- 图片上传
- 截图识别、OCR 和视觉布局分析
- 多模态 Provider 请求

## 项目定位

`faui-sdk-agent` 是用于生成和增量编辑 FAUI JSON Schema 的 AI Agent SDK。

当前重构目标是 Full-first Agent：支持表单、详情页、后台页面、展示页、Dashboard、布局、导航、数据展示和交互页面。

`form` 仍然是 `faui-sdk` Full 中的一个组件，但不再作为独立 Edition 或全局生成约束。

所有与页面 Schema、表单组件、动作、数据绑定、表达式相关的规则，均以 `faui-sdk` 为唯一参考来源：

`/Users/lawliet/pro/com/faui-sdk`

不参考、不依赖或同步另一个 `faui` 项目的实现、文档和约定。

需求或行为不明确时，优先查看 `faui-sdk` 的：

- `src/manifest.ts`
- `src/components/index.ts`
- `src/components/` 中对应的完整组件实现
- `src/types/`
- `src/actions/`
- `src/formComponentContracts.ts` 或重构后的 Full Component Contract
- `docs/`
- `examples/`
- `tests/`

不得自行发明 `faui-sdk` 未定义的组件、属性、动作、绑定或表达式行为。

## 范围约束

- 只生成 `faui-sdk` Full Registry 中实际存在的组件。
- 支持表单、详情、布局、展示、导航、反馈、逻辑、重复渲染和图表等 Full 页面能力。
- 表单规则只在组件确实为 `form` 时生效，不得扩展为所有页面的全局约束。
- `faui-sdk` 是组件契约的唯一来源；本仓库只使用构建或发布阶段同步生成的静态契约副本。
- Agent SDK 维护生成阶段的 Full Schema 校验器，不手工维护第二套组件规则。
- Action 默认不允许生成；通过 `allowedActions` 按需开放，也支持显式配置 `'all'`。
- `stylePrompt` 使用追加方式；未传或为空时不得新增或修改样式。
- Agent 内部工具操作 `Content`，并提供标准的 Activity Snapshot 包装方法。
- 本轮不实现图片上传、多模态输入、OCR 或截图识别。

## 项目结构

- `src/agent.ts`：`FauiAgent` 对外入口
- `src/agent-loop.ts`：多轮生成与工具调用循环
- `src/provider.ts`：LLM Provider 适配
- `src/tools.ts`：Schema 工具定义
- `src/tool-executor.ts`：工具调用执行与 Schema 更新
- `src/tool-system-prompt.ts`：工具模式系统提示词
- `src/skills/`：面向模型的 FAUI Full 页面规则与知识
- `src/types.ts`：Agent 对外类型
- `src/*.test.ts`：单元测试
- `examples/`：可运行示例
- `scripts/`：发布脚本
- `docs/full-first-rearchitecture-plan.md`：三项目总计划
- `docs/faui-sdk-agent-full-agent-plan.md`：本仓库执行清单

模块保持单一职责。修改现有行为时，优先沿用当前 API、事件名称、工具协议和错误处理方式。

## 与 faui-sdk 的一致性

- `src/skills/` 中的组件目录、数据绑定、表达式、Action 和注意事项，必须与 `faui-sdk` 当前 Full 能力一致。
- 修改系统提示词、工具定义或工具执行器时，必须核对 `faui-sdk` 的实际 Schema 类型与组件属性。
- 新增组件或动作支持时，应同时更新契约同步、Skill、工具校验、测试和 README；未实际支持的能力不得写入提示词或文档。
- 组件契约由 `faui-sdk` 维护，本仓库不得在源码中手工复制或扩展契约语义。
- 同步生成的契约必须记录 `faui-sdk` 版本和契约版本。
- Schema 的增量更新必须保留已有合法数据，避免无关字段、组件或 `dataModel` 被覆盖。
- 不要将 `faui-sdk` 的 React 运行时实现复制到本项目；本项目只负责 Agent 编排、提示词、工具和 Schema 生成规则。

## Agent API 约束

- Agent SDK 默认使用内置 Full System Prompt。
- `systemPrompt` 只能追加宿主上下文，不得破坏 Full 基础规则。
- `stylePrompt` 只能作为可选的样式追加规则；空值时不启用样式能力。
- `allowedActions` 默认为空；`'all'` 必须由宿主显式配置。
- 未授权 Action 必须在工具执行和最终校验阶段被拒绝。
- `Content` 是 Schema 工具和增量修改的核心结构。
- Activity 包装必须由 Agent SDK 提供，landingpage 不得重复实现转换逻辑。
- Provider、图片输入和视觉识别不属于本轮实现范围。

## 分支与提交

- `master` 是唯一正式分支；本地和远端默认都只保留 `master`。
- 未经用户明确要求，不创建其他分支。
- 提交信息使用 Conventional Commits 前缀。
- 提交前先完成验证并让用户查看 diff。
- 未经用户明确确认，不执行 `git add`、`git commit` 或 `git push`。
- 用户只确认提交时，不自动推送；只有明确要求时才推送。

## 远端仓库

唯一远端为 `origin`：

`https://github.com/lawlietfeng/faui-sdk-agent.git`

约束：

- 仓库必须保持私有。
- 只同步 `master` 分支。
- 推送前核对远端 URL、当前分支和工作区状态。
- 推送成功后，确认本地 `master` 已跟踪 `origin/master`。
- 不添加其他远端，不修改仓库可见性。

## 验证规则

默认执行：

```bash
npm run lint
npm run typecheck
npm run test
```

不主动执行构建、启动开发服务、浏览器自动化、截图或视觉验证。

涉及 LLM 调用、外部 API、环境变量或示例运行时，只提供清晰的人工验证步骤，除非用户明确要求执行。

Full-first 重构完成前，除非任务明确要求，不要把验证范围退回 Form-only，也不要新增 Form-only 入口、Prompt、Skill 或校验规则。

## 代码规范

- 功能改动应补充或更新对应的 `src/*.test.ts` 测试。
- TypeScript 使用项目现有 ESLint 规则。
- 类名使用 `PascalCase`，变量和函数使用 `camelCase`。
- JSON、YAML 和 Markdown 使用 2 空格缩进。
- 注释只解释不易理解的逻辑。
- 不提交密钥、令牌、`.env` 或本地配置。
- 不修改生成目录、依赖目录或锁文件，除非任务确实需要。

任务完成时，简要说明交付内容、验证结果，以及需要用户人工验证的内容。
