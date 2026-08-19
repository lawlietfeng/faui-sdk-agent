import type { SkillDef } from '../skill-store.js';

export const actionsSkill: SkillDef = {
  name: 'actions',
  description: '内置动作、HTTP 请求和字段联动规则',
  content: `
# Actions

默认只使用 SDK 内置动作：\`update_data\`、\`http_proxy\`、\`message\`、\`notification\`。

- \`on_tap\` 和 \`on_change\` 都可配置一个 action 或 action 数组。
- 表单控件已自动回写绑定值；\`on_change\` 仅用于额外副作用。
- \`on_change\` 中可用 \`${'$'}{\$value}\` 取得新值；显式提供的 \`value\` 不会被覆盖。
- \`on_success\` 中可用 \`${'$'}{\$result}\`，\`on_error\` 中可用 \`${'$'}{\$error}\`。

\`update_data\`：
\`\`\`json
{ "action": "update_data", "path": "/field", "value": "${'$'}{\$value}" }
\`\`\`

\`http_proxy\`：
\`\`\`json
{
  "action": "http_proxy",
  "payload": {
    "http_config": { "method": "POST", "path": "/api/submit" },
    "http_body": { "name": { "path": "/name" } }
  }
}
\`\`\`

\`message\` 使用 \`payload.content\`；\`notification\` 使用 \`payload.message\` 或 \`payload.description\`。不要把这些字段平铺在 action 顶层。
`,
};
