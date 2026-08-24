import type { SkillDef } from '../skill-store.js';

export const fieldChoiceSkill: SkillDef = {
  name: 'field-choice',
  description: '下拉、单选、多选、开关和分段选择规则',
  content: `
# 选择字段

- \`radio\`：少量选项的单选；使用 \`options\` 和 \`value.path\`。
- \`select\`：下拉选择；使用 \`options\` 和 \`value.path\`，可使用 \`mode: "multiple" | "tags"\`。
- \`checkbox\`：无 \`options\` 时是布尔勾选并使用 \`checked.path\`；有 \`options\` 时是多选数组并使用契约声明的绑定属性。
- \`switch\`：布尔开关；可用 \`checkedChildren\`、\`unCheckedChildren\`。
- \`segmented\`：少量互斥选项；使用 \`options\` 和 \`value.path\`。

静态选项格式：
\`\`\`json
"options": [{ "label": "显示文本", "value": "actual-value" }]
\`\`\`

布尔字段初始值为 \`false\`，多选字段初始值为 \`[]\`。所有选择控件支持 \`disabled\`，可为布尔值、表达式或路径绑定；具体属性能力以 Form Component Contract 为准。
`,
};
