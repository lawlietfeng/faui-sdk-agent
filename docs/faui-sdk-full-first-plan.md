# faui-sdk Full-first 调整清单

目标项目：`/Users/lawliet/pro/com/faui-sdk`

状态：待执行

## 1. 默认入口与 Registry

- [ ] 将 `src/index.tsx` 从 Form Renderer 改为 Full Renderer。
- [ ] 默认入口使用完整 `ComponentRegistry`。
- [ ] 将 `src/full.tsx` 改为兼容转发到默认入口，或在最终版本中删除。
- [ ] 删除独立 Form Registry 的公开用途。
- [ ] 删除 Form / Full 双入口之间的运行时分叉。
- [ ] 确认 `@faui/react/full` 过渡别名的弃用说明。
- [ ] 更新 `package.json` exports、类型入口和构建入口。
- [ ] 更新所有示例和测试中的入口导入。

## 2. Manifest

- [ ] 删除新的代码和文档对 `availability: 'form-full' | 'full'` 的依赖。
- [ ] 将组件目录统一描述为 Full 组件目录。
- [ ] 删除或标记废弃 `formComponentNames`。
- [ ] 删除或标记废弃 `fullOnlyComponentNames`。
- [ ] 将 `componentManifest.editions` 改为 Full-first 结构。
- [ ] 保留组件分类、注册名和文档元数据。
- [ ] 核对 `float_button` 等注册名与文档 slug 的差异。

## 3. Full Component Contract

- [ ] 将 `src/formComponentContracts.ts` 重构为 Full 组件契约模块。
- [ ] 将 `formComponentContractVersion` 重命名为 Full-first 契约版本。
- [ ] 将 `formComponentContracts` 重命名为统一 `componentContracts`。
- [ ] 将 `formSchemaContract` 重命名为统一 Schema Contract。
- [ ] 覆盖 Manifest 中所有 Full Registry 注册名。
- [ ] 为每个组件补齐 allowed props、属性类型和 childrenMode。
- [ ] 为动态属性补齐 binding、pathScope 和 expressionMode。
- [ ] 为事件补齐事件名称、上下文和自动回写规则。
- [ ] 为复杂组件补齐依赖和互斥属性。
- [ ] 覆盖 `table`、`chart`、`tabs`、`menu`、`tree`、`list`、`carousel`、`modal`、`drawer`、`descriptions` 等复杂组件。
- [ ] 覆盖 `form` 组件的字段校验规则，但不把它提升为全局 Schema 要求。
- [ ] 导出契约版本和 SDK 版本信息。

## 4. Schema 与 Action 校验

- [ ] 将 Schema 校验规则改为 Full Schema 规则。
- [ ] 保留 root、唯一 ID、可达性、循环引用和子组件引用校验。
- [ ] 允许没有 `form` 的页面通过校验。
- [ ] 保留 `form` 存在时的表单专属校验。
- [ ] 校验 condition 的分支结构。
- [ ] 校验 Repeater 模板和相对路径。
- [ ] 校验所有完整 Action 类型。
- [ ] 核对 `copy`、`mcp_tool_call`、`send_prompt`、`input_prompt` 的运行时行为和文档。
- [ ] 更新 `scripts/validate-schema.cjs` 为 Full-first 模式。
- [ ] 删除或重命名 `--mode=form-strict` 等 Form-only 命令。
- [ ] 为 Full Schema 和 Activity Snapshot 增加回归测试。

## 5. 文档与示例

- [ ] 重写 `docs/faui-llm-prompt.md`，删除 Form-only 生成步骤。
- [ ] 将表单规则改为 Full 中的可选页面能力。
- [ ] 更新组件文档中的契约引用名称。
- [ ] 更新 Action 文档中的统一来源说明。
- [ ] 更新 README、开发文档和文档导航。
- [ ] 更新 `00-入职审核表单 copy.json` 相关说明。
- [ ] 更新 `22-SJH、BXS.json` 相关说明。
- [ ] 删除或重命名 Form Edition 专属计划文档。
- [ ] 明确 Activity Snapshot 是 SDK 最终运行输入。

## 6. 版本与验证

- [ ] 按 breaking change 升级 SDK 主版本。
- [ ] 保留 `@faui/react/full` 兼容别名并添加弃用说明。
- [ ] 运行 `npm run lint`。
- [ ] 运行 `npm run typecheck`。
- [ ] 运行 `npm run test`。
- [ ] 构建并检查根入口、兼容入口和 manifest 导出。

## 执行记录

- [ ] 执行 Agent 勾选完成项。
- [ ] 执行 Agent 记录改动文件。
- [ ] 执行 Agent 记录测试结果。
- [ ] 执行 Agent 记录兼容性风险。

