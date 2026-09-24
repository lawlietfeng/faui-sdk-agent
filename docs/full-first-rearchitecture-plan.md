# FAUI Full-first 三项目重构总计划

状态：方案已确认，执行任务待开始

适用项目：

- `/Users/lawliet/pro/com/faui-sdk`
- `/Users/lawliet/pro/com/faui-sdk-agent`
- `/Users/lawliet/pro/com/faui-sdk-landing-page`

## 目标

- [ ] 将 FAUI 的默认能力统一为 Full。
- [ ] 删除 Form-only 的产品概念、提示词、Skills、校验规则和文档。
- [ ] 保留 `form` 作为 Full 中的一个组件，不再保留独立 Form Edition。
- [ ] 让 `faui-sdk-agent` 能生成表单、详情页、后台页、展示页、Dashboard 和交互页面。
- [ ] 让 AgentDemo 只负责页面产品配置和预览，不重复维护 SDK Schema 规则。
- [ ] 保持三项目的组件契约、Action 和 Schema 规则来自同一个来源。

## 已确认决策

- [x] `@faui/react` 根入口改为 Full Registry。
- [x] `@faui/react/full` 暂时保留为兼容别名。
- [x] 不再维护独立 Form Edition。
- [x] `form` 组件继续存在，但只作为 Full 组件使用。
- [x] `faui-sdk` 是组件契约唯一来源。
- [x] Agent SDK 在构建或发布阶段同步静态契约副本。
- [x] Agent SDK 维护生成阶段的 Full Schema 校验器。
- [x] Action 默认不允许，由 AgentDemo 通过 `allowedActions` 配置。
- [x] `allowedActions` 支持具体 Action 数组和 `'all'`。
- [x] `stylePrompt` 使用追加方式，未填写时不产生样式效果。
- [x] Agent SDK 内置 Full System Prompt，宿主只追加产品级上下文。
- [x] Agent 内部操作 `Content`，同时提供 Activity 包装方法。
- [x] 图片上传、截图识别和视觉生成不纳入本轮重构。
- [x] 三个项目按 breaking change 协同升级版本。

## 执行顺序

- [ ] 先完成 `faui-sdk` 的 Full-first 基础能力。
- [ ] 再完成 `faui-sdk-agent` 的 Full Agent 能力。
- [ ] 最后完成 `faui-sdk-landing-page` 的 AgentDemo 接入。
- [ ] 三个项目分别完成 lint、typecheck、test 或对应验证命令。
- [ ] 完成跨项目联调和示例 Schema 回归。

## 跨项目验收

- [ ] `@faui/react` 默认入口可以渲染 Full 组件。
- [ ] `@faui/react/full` 在过渡期仍可正常导入。
- [ ] Agent 可以生成不包含 `form` 的 Full 页面。
- [ ] Agent 可以生成包含 `form` 的 Full 页面。
- [ ] Agent 可以生成并校验 `00-入职审核表单 copy.json` 类页面。
- [ ] Agent 可以生成并校验 `22-SJH、BXS.json` 类页面。
- [ ] Agent 可以执行增量组件更新和 dataModel 更新。
- [ ] AgentDemo 可以直接预览 Agent 生成的 Activity Snapshot。
- [ ] AgentDemo 可以按配置阻止未授权 Action。
- [ ] 空的 `stylePrompt` 不会新增或修改样式。
- [ ] 三个项目不再出现新的 Form-only 规则。

## 明确不做

- [x] 本轮不实现图片上传。
- [x] 本轮不实现截图识别、OCR 或视觉布局分析。
- [x] 本轮不新增独立的 `@faui/react/form` 入口。
- [x] 本轮不复制 React 运行时实现到 Agent SDK。
- [x] 本轮不把 AgentDemo 的 UI 配置硬编码进 Agent SDK 默认规则。

## 执行记录

执行 Agent 完成任务后，必须：

- [ ] 勾选已完成任务。
- [ ] 记录修改的文件或目录。
- [ ] 记录验证命令和结果。
- [ ] 记录未完成项、阻塞原因和后续动作。
