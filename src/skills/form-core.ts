import type { SkillDef } from '../skill-store.js';

export const formCoreSkill: SkillDef = {
  name: 'form-core',
  description: 'Form Edition 的 Schema、绑定、标签和提交基础规则',
  content: `
# FAUI Form Core

只生成 FAUI Form Edition 组件，不使用 Full 专属组件。

## Schema 结构

- Schema 必须有 \`components\`、\`dataModel\` 和唯一的 \`id: "root"\` 根组件。
- 组件扁平存放在 \`components\` 中；普通容器通过 \`children: ["child-id"]\` 表达父子关系，\`condition\` 的分支使用 \`then\`、\`else\`、\`cases\` 或 \`default\`。
- 所有组件必须从 \`root\` 可达，ID 不可重复。
- 表单必须使用 \`component: "form"\`，可直接作为 \`root\`，也可位于 \`root\` 的后代。

## 数据绑定

- 输入字段使用 \`value: { "path": "/field" }\`。
- \`checkbox\` 和 \`switch\` 生成规范绑定 \`checked: { "path": "/field" }\`；\`value.path\` 仅为 SDK 兼容旧 Schema 的弃用写法，Agent 不主动生成。
- Repeater 等组件的 \`data\` 绑定也必须遵循契约；绑定路径对应的初始值必须存在于 \`dataModel\`。
- 路径必须以 \`/\` 开头；\`dataModel\` 必须包含每个字段的初始值。
- 正确配置绑定后，控件会自动回写数据；同一路径不需要额外写 \`on_change\`。
- 默认不使用 \`./\` 相对路径；只有明确生成动态 Repeater 表单时才查询对应 Skill。

## 表单项与校验

- 每个输入字段使用 \`text\` 标签说明用途。
- 标签和字段必须是同一父组件的直接子项，顺序必须是 \`["label-id", "field-id"]\`。
- 必填字段在字段自身配置 \`rules: [{ "required": true, "message": "…" }]\`。
- 不要在标签文字中手写 \`*\`。SDK 会为直接相邻的必填字段自动显示标记。
- \`rules\` 不能写在 \`form\` 上。

## 提交

- 默认内部提交：\`form.submitButtonId\` 指向表单内的 \`button\`。
- 未提供接口或业务动作时，提交按钮不写 \`on_tap\`，只触发校验。
- 默认不生成外部提交、虚构接口、成功提示或视觉样式。
`,
};
