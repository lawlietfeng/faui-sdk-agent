# landingpage AgentDemo Full 接入调整清单

目标项目：`/Users/lawliet/pro/com/faui-sdk-landing-page`

状态：待执行

## 1. Full Renderer 接入

- [ ] 将 `@faui/react/full` 的默认使用改为 `@faui/react`。
- [ ] 删除 AgentDemo 中的 Form / Full 双模式假设。
- [ ] 统一使用 Full Component Registry。
- [ ] 更新 JSON Debug 和相关预览逻辑。
- [ ] 保留 `@faui/react/full` 兼容入口测试，但不再依赖它作为主入口。

## 2. Agent SDK 接入

- [ ] 使用 Agent SDK 内置 Full System Prompt。
- [ ] 删除 AgentDemo 中完整 SDK Prompt 的重复拼接。
- [ ] 删除 AgentDemo 中重复维护的组件属性规则。
- [ ] 删除 AgentDemo 自己实现的 `pageSchemaToActivities`。
- [ ] 使用 Agent SDK 提供的标准 Activity 转换方法。
- [ ] 使用 Agent SDK 的 Full Schema 校验结果。
- [ ] 保留适合 UI 展示的错误信息转换。
- [ ] 适配新的 `GeneratePageResult` 和 `StreamEvent` 类型。

## 3. AgentDemo 页面级配置

- [ ] 保留 API Key 配置。
- [ ] 保留 Provider 配置。
- [ ] 保留 Model 配置。
- [ ] 保留 Base URL 配置。
- [ ] 将 UI 风格提示词作为 `stylePrompt` 传给 Agent SDK。
- [ ] 空风格提示词时不向 Agent 注入样式要求。
- [ ] 将 Action 权限配置放在 AgentDemo。
- [ ] 支持选择具体 Action。
- [ ] 支持选择 `'all'`。
- [ ] AgentDemo 对未授权 Action 显示清晰提示。
- [ ] Action 是否真正执行仍由宿主执行器决定。

## 4. Schema 与 Activity 展示

- [ ] 预览统一使用 Full Renderer。
- [ ] 支持无 `form` 页面正常预览。
- [ ] 支持包含 `form` 页面正常预览。
- [ ] JSON 标签页展示完整 `ActivitySnapshot[]`。
- [ ] 支持复制 Activity JSON。
- [ ] 支持保存 Agent 返回的 Content 和 Activity。
- [ ] 统一生成结果、增量更新和最终结果的转换逻辑。
- [ ] 保留当前页面 Schema 的会话恢复能力。

## 5. 校验和错误处理

- [ ] Agent 工具校验失败时显示可读错误。
- [ ] 预览前再次执行 Full Schema 校验。
- [ ] 组件契约错误显示组件 ID、属性和位置。
- [ ] 未授权 Action 不进入最终可执行配置。
- [ ] 渲染失败时保留原有可用 Schema。
- [ ] 不再显示 Form Edition 专属错误信息。

## 6. 文案和文档

- [ ] 将“生成表单”类文案改为“生成 FAUI 页面”。
- [ ] 更新 AgentDemo 示例提示词，加入详情页、卡片页、后台页和 Dashboard。
- [ ] 删除 Form-only 文档引用。
- [ ] 更新页面 README 和使用说明。
- [ ] 更新 JSON Debug 的 Edition 描述为 Full-first。
- [ ] 说明 `form` 是 Full 页面中的可选组件。

## 7. 联调验证

- [ ] 使用文字生成无 Form 的详情页。
- [ ] 使用文字生成包含 Form 的业务页。
- [ ] 验证卡片、详情、标签、图标、布局和按钮。
- [ ] 验证 Repeater 和动态可见性。
- [ ] 验证 Action allowlist。
- [ ] 验证 stylePrompt 为空和非空两种情况。
- [ ] 验证历史会话恢复。
- [ ] 验证 `00-入职审核表单 copy.json` 类页面预览。
- [ ] 验证 `22-SJH、BXS.json` 类页面预览。
- [ ] 运行项目既有 lint、typecheck 和 build 检查。

## 8. 明确后置

- [x] 本轮不增加图片上传 UI。
- [x] 本轮不增加截图粘贴能力。
- [x] 本轮不增加多模态 Agent 请求。
- [x] 图片能力单独建立后续计划。

## 执行记录

- [ ] 执行 Agent 勾选完成项。
- [ ] 执行 Agent 记录改动文件。
- [ ] 执行 Agent 记录验证结果。
- [ ] 执行 Agent 记录需要后续处理的兼容性问题。
