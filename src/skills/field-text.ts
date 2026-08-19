import type { SkillDef } from '../skill-store.js';

export const fieldTextSkill: SkillDef = {
  name: 'field-text',
  description: '文本输入、文本域、自动补全和提及输入规则',
  content: `
# 文本字段

- \`input\`：单行文本；支持 \`placeholder\`、\`disabled\`、\`rules\` 和 \`value.path\`。
- \`textarea\`：多行文本；支持 \`placeholder\`、\`rows\`、\`maxLength\`、\`disabled\`、\`rules\` 和 \`value.path\`。
- \`autocomplete\`：带建议的文本输入；使用 \`options\` 和 \`value.path\`。
- \`mentions\`：提及输入；使用 \`options\`、\`prefix\` 和 \`value.path\`。
- \`inputnumber\` 用于数字，不要用 \`input\` 模拟数字输入；支持 \`min\`、\`max\`、\`step\`、\`precision\`。

\`placeholder\` 和 \`rules\` 都是可选项，只在业务需要时生成。
当前 SDK 未确认密码 \`type\` 输入能力时，不要生成 \`type: "password"\`。
`,
};
