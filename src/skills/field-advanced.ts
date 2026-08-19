import type { SkillDef } from '../skill-store.js';

export const fieldAdvancedSkill: SkillDef = {
  name: 'field-advanced',
  description: '上传、层级选择、穿梭、评分、滑块和颜色字段规则',
  content: `
# 高级表单字段

- \`upload\`：使用 \`value.path\`，支持 \`accept\`、\`multiple\`、\`maxCount\`、\`listType\`、\`showUploadList\`、\`disabled\`；初始值为 \`[]\`。
- \`cascader\`：层级选项使用 \`options\`，选中值通常为数组。
- \`treeselect\`：树形选项使用 \`options\`；按需使用 \`multiple\`。
- \`transfer\`：使用 \`options\` 提供可选项，并用 \`value.path\` 绑定已选值数组；只在选项数据明确时生成。
- \`slider\`：数值或范围选择，支持 \`min\`、\`max\`、\`step\`、\`range\`。
- \`rate\`：评分，支持 \`count\`、\`allowHalf\`。
- \`colorpicker\`：颜色选择，使用 \`value.path\`。

除非用户提供或明确要求选项与数据源，否则不要编造复杂树形数据、穿梭数据或上传接口。
`,
};
