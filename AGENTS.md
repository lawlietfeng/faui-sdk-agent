# Repository Guidelines

## 项目定位

`faui-sdk-agent` 是用于生成和增量编辑 FAUI JSON Schema 的 AI Agent SDK。

当前生成目标以 `faui-sdk` 的 Form 表单能力为主，暂不考虑或支持 `full` 入口及其相关能力。

所有与页面 Schema、表单组件、动作、数据绑定、表达式相关的规则，均以 `faui-sdk` 为唯一参考来源：

`/Users/lawliet/pro/com/faui-sdk`

不参考、不依赖或同步另一个 `faui` 项目的实现、文档和约定。

需求或行为不明确时，优先查看 `faui-sdk` 的：

- `src/components/Form.tsx`
- `src/components/` 中表单相关组件
- `src/types/`
- `src/actions/`
- `docs/`
- `examples/`
- `tests/`

不得自行发明 `faui-sdk` 未定义的表单组件、字段、动作或表达式行为。

## 范围约束

- 优先生成表单、表单字段、校验规则、字段联动、提交行为和表单数据绑定。
- 优先支持 `Input`、`Textarea`、`InputNumber`、`Select`、`Checkbox`、`Radio`、`Switch`、`DatePicker`、`TimePicker`、`Upload` 等实际存在的表单组件。
- 表单 Schema 和组件属性必须以 `faui-sdk` 的实际类型与实现为准。
- 暂不生成、维护或扩展 `faui-sdk/full` 入口的能力。
- 不将非表单展示型页面、复杂布局或 `full` 专属能力写入系统提示词、工具定义或 Skills，除非用户明确调整范围。

## 项目结构

- `src/agent.ts`：`FauiAgent` 对外入口
- `src/agent-loop.ts`：多轮生成与工具调用循环
- `src/provider.ts`：LLM Provider 适配
- `src/tools.ts`：Schema 工具定义
- `src/tool-executor.ts`：工具调用执行与 Schema 更新
- `src/tool-system-prompt.ts`：工具模式系统提示词
- `src/skills/`：面向模型的 FAUI 表单规则与知识
- `src/types.ts`：Agent 对外类型
- `src/*.test.ts`：单元测试
- `examples/`：可运行示例
- `scripts/`：发布脚本

模块保持单一职责。修改现有行为时，优先沿用当前 API、事件名称、工具协议和错误处理方式。

## 与 faui-sdk 的一致性

- `src/skills/` 中的组件目录、数据绑定和注意事项，必须与 `faui-sdk` 当前 Form 表单能力一致。
- 修改系统提示词、工具定义或工具执行器时，必须核对 `faui-sdk` 的实际 Schema 类型与组件属性。
- 新增表单组件或动作支持时，应同时更新相关 Skill、工具校验、测试和 README；未实际支持的能力不得写入提示词或文档。
- Schema 的增量更新必须保留已有合法数据，避免无关字段、组件或 `dataModel` 被覆盖。
- 不要将 `faui-sdk` 的 React 运行时实现复制到本项目；本项目只负责 Agent 编排、提示词、工具和 Schema 生成规则。

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

## 代码规范

- 功能改动应补充或更新对应的 `src/*.test.ts` 测试。
- TypeScript 使用项目现有 ESLint 规则。
- 类名使用 `PascalCase`，变量和函数使用 `camelCase`。
- JSON、YAML 和 Markdown 使用 2 空格缩进。
- 注释只解释不易理解的逻辑。
- 不提交密钥、令牌、`.env` 或本地配置。
- 不修改生成目录、依赖目录或锁文件，除非任务确实需要。

任务完成时，简要说明交付内容、验证结果，以及需要用户人工验证的内容。
