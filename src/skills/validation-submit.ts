import type { SkillDef } from '../skill-store.js';

export const validationSubmitSkill: SkillDef = {
  name: 'validation-submit',
  description: '表单校验、内部提交和重置规则',
  content: `
# 校验与提交

- 校验规则写在字段 \`rules\` 数组中，常用字段：\`required\`、\`message\`、\`type\`、\`min\`、\`max\`、\`len\`、\`pattern\`、\`enum\`、\`whitespace\`。
- \`validateTrigger\` 可为 \`"onChange"\`、\`"onBlur"\` 或两者数组。
- 默认内部提交：\`form.submitButtonId\` 必须等于表单内提交 \`button\` 的 ID。
- 提交按钮只有在校验通过后才会执行 \`on_tap\`。
- 未提供业务动作时，提交按钮不配置 \`on_tap\`。
- 重置或字段联动使用 \`update_data\`，只改明确指定的路径。
`,
};
