import type { SkillDef } from '../skill-store.js';

export const dynamicFormSkill: SkillDef = {
  name: 'dynamic-form',
  description: '条件显示和重复表单项规则',
  content: `
# 动态表单

## Condition

- \`component: "condition"\` 只支持两种互斥模式，不能混用字段：
  - 布尔模式必须使用 \`when\` 和非空 \`then\`；可选 \`else\` 或 \`default\`。\`when\` 为动态条件时，写成 \`"\${$root.field}"\`；静态条件才可直接写 \`true\` 或 \`false\`。
  - 多值模式必须使用 \`match\` 和非空 \`cases\`；可选 \`default\`。\`cases\` 的键必须与 \`match\` 求值后转成的字符串完全一致。
- 不得使用不存在的 \`condition\` 属性，也不得在 \`condition\` 组件上写 \`children\`。分支组件只能通过 \`then\`、\`else\`、\`cases\` 或 \`default\` 引用，且同一组件 ID 只能属于一个分支。
- 不要将 \`when\` 或 \`match\` 写成 \`{ "path": "/field" }\`。当前 SDK 的 Condition 不会解析这种绑定对象；动态条件统一使用 \`"\${$root.field}"\` 表达式。
- 条件表达式引用的字段必须在 \`dataModel\` 中提供类型正确的初始值。没有匹配分支且未配置 \`default\` 时，Condition 不渲染任何内容。
- \`repeater\` 使用 \`data: { "path": "/items" }\` 和 \`children\` 重复渲染已有数组项；可配置 \`keyField\`、\`direction\`、\`gap\` 与 \`emptyContent\`。
- Repeater 内可使用相对路径 \`./field\`；普通 Form Schema 一律使用 \`/\` 开头的绝对路径。
- 当前 SDK 的 Repeater 只负责渲染已有数组，不提供新增、删除或索引更新控件。没有已确认的宿主动作时，不要虚构这类交互。
`,
};
