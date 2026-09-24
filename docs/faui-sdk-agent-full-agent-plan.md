# faui-sdk-agent Full Agent 调整清单

目标项目：`/Users/lawliet/pro/com/faui-sdk-agent`

状态：待执行

## 1. 删除 Form-only 设计

- [ ] 删除 Form-only System Prompt。
- [ ] 删除 Form-only Component Catalog。
- [ ] 删除 Form-only Component Selector。
- [ ] 删除 Form-only Schema Validator 命名和规则。
- [ ] 删除 Form-only Skills 或改写为 Full 页面 Skills。
- [ ] 删除“必须包含 form”的全局规则。
- [ ] 删除“Form 不支持时拒绝切换 Full”的旧逻辑。
- [ ] 删除或重命名 `docs/form-first-agent-plan.md` 等 Form-only 计划内容。
- [ ] 更新 `AGENTS.md`、README 和导出 API 中的 Form-only 描述。

## 2. Full Contract 同步

- [ ] 以 `faui-sdk` 的 Full Component Contract 作为唯一来源。
- [ ] 增加从 `faui-sdk` 同步契约的脚本或发布流程。
- [ ] 生成 Agent SDK 内部静态契约副本。
- [ ] 记录 `FAUI_SDK_VERSION` 和 `FULL_COMPONENT_CONTRACT_VERSION`。
- [ ] 运行时不依赖 `/Users/lawliet/...` 等本地绝对路径。
- [ ] 不在 Agent SDK 内手工维护第二套组件属性表。
- [ ] 支持按需注入组件契约，避免默认 Prompt 过长。
- [ ] `get_component_contracts` 支持全部 Full 组件。

## 3. Full Schema Validator

- [ ] 新建或重构 Full Schema 校验器。
- [ ] 校验 `root`、唯一 ID、可达性、循环引用和组件引用。
- [ ] 允许没有 `form` 的页面。
- [ ] 保留 `form` 存在时的字段、校验和提交规则。
- [ ] 校验所有 Full Component Contract 属性。
- [ ] 校验 condition、Repeater、动态绑定和表达式。
- [ ] 校验完整 Action 结构。
- [ ] 支持 `Content` 校验。
- [ ] 支持 Activity Snapshot 外层校验。
- [ ] 输出稳定、可供模型修正的错误信息。
- [ ] 工具执行失败时保持原 Schema 不变。

## 4. Agent API

- [ ] Agent 内置 Full System Prompt。
- [ ] `systemPrompt` 改为可选追加内容，不破坏基础规则。
- [ ] `stylePrompt` 支持 Agent 默认值和单次请求覆盖。
- [ ] 空 `stylePrompt` 时不新增或修改 style。
- [ ] 增加 `allowedActions?: ActionType[] | 'all'`。
- [ ] 默认 Action 权限为空。
- [ ] 工具层拒绝未授权 Action。
- [ ] 保持 `Content` 作为工具操作和生成结果的核心结构。
- [ ] 提供 `toActivitySnapshot` / `toActivities` 标准转换方法。
- [ ] 明确 `GeneratePageResult` 的版本兼容策略。

## 5. Full 页面生成能力

- [ ] 支持无 Form 的展示页面。
- [ ] 支持包含 Form 的完整业务页面。
- [ ] 支持布局、卡片、详情、导航、反馈和数据展示组件。
- [ ] 支持表格、列表、图表、页签、树和重复渲染。
- [ ] 支持弹窗、抽屉、气泡和确认交互。
- [ ] 支持 dataModel 与组件绑定。
- [ ] 支持增量新增、修改、删除组件。
- [ ] 支持增量更新 dataModel。
- [ ] 保留已有合法结构和样式。

## 6. 测试与回归

- [ ] 更新所有 Form-only 单元测试为 Full-first 测试。
- [ ] 增加无 Form 页面测试。
- [ ] 增加表单页面测试。
- [ ] 增加 `00-入职审核表单 copy.json` 结构回归。
- [ ] 增加 `22-SJH、BXS.json` 结构回归。
- [ ] 增加 Action allowlist 测试。
- [ ] 增加 stylePrompt 空值和非空值测试。
- [ ] 增加 Activity 包装和解析测试。
- [ ] 运行 `npm run lint`。
- [ ] 运行 `npm run typecheck`。
- [ ] 运行 `npm run test`。

## 7. 明确后置

- [x] 本轮不实现图片上传。
- [x] 本轮不修改 Provider 为多模态输入。
- [x] 本轮不实现 OCR 或截图识别。

## 执行记录

- [ ] 执行 Agent 勾选完成项。
- [ ] 执行 Agent 记录改动文件。
- [ ] 执行 Agent 记录测试命令和结果。
- [ ] 执行 Agent 记录未完成项和阻塞原因。
