import type { SkillDef } from '../skill-store.js';

export const fieldDateSkill: SkillDef = {
  name: 'field-date',
  description: '日期、时间和日历字段规则',
  content: `
# 日期与时间字段

- \`datepicker\`：使用 \`value.path\`；支持 \`picker\`、\`format\`、\`showTime\`、\`disabledDate\` 和 \`disabled\`。
- \`timepicker\`：使用 \`value.path\`；支持 \`format\`、\`hourStep\`、\`minuteStep\`、\`secondStep\` 和 \`disabled\`。
- \`calendar\`：日期面板；使用 \`value.path\`，可配置 \`format\`、\`mode\`、\`fullscreen\` 和 \`disabled\`。

日期和时间字段的初始值通常为 \`null\`。

当表单同时包含开始日期和结束日期，且用户要求日期范围约束时，两个字段必须同时配置，不能只限制结束日期：
\`\`\`json
{
  "id": "start-date",
  "component": "datepicker",
  "value": { "path": "/startDate" },
  "disabledDate": { "after": { "path": "/endDate" } }
}
{
  "id": "end-date",
  "component": "datepicker",
  "value": { "path": "/endDate" },
  "disabledDate": { "before": { "path": "/startDate" } }
}
\`\`\`

未选择另一侧日期时，SDK 不会施加该限制；选择后两个日期选择器会互相约束。
`,
};
