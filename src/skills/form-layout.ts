import type { SkillDef } from '../skill-store.js';

export const formLayoutSkill: SkillDef = {
  name: 'form-layout',
  description: 'Form Edition 的分组、栅格和操作区结构',
  content: `
# 表单布局

默认不添加主题色、阴影、Tailwind 类或内联样式；只有显式注入 style 能力的 Skill 时才可新增或修改样式。

- 单列字段：\`form → box → [text 标签, 字段]\`。
- 表单分组：使用 \`divider\` 分隔；每组使用 \`box\` 容纳表单项。
- 双列字段：使用 \`row\`、\`col\`，每个 \`col\` 中放完整表单项。
- 按钮区：使用 \`flex\` 或 \`space\` 放置提交、重置等按钮。
- 容器和字段都必须通过 \`children\` 引用，不能嵌套组件对象。

示例：
\`\`\`json
{
  "id": "name-item",
  "component": "box",
  "children": ["name-label", "name-input"]
}
\`\`\`
`,
};
