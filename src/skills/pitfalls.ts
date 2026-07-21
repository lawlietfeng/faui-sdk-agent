import type { SkillDef } from '../skill-store.js';

export const pitfallsSkill: SkillDef = {
  name: 'pitfalls',
  description: '常见踩坑记录与最佳实践',
  content: `
# FAUI JSON Schema 踩坑记录

> 本文件记录 full-landing-page 开发过程中遇到的问题和正确写法，供未来 AI Agent 生成 JSON 时参考。

---

## 1. \`on_tap\` 只有 Button 和 FloatButton 支持

**错误写法**：在 Typography 上设置 \`on_tap\`，期望点击触发动作。
\`\`\`json
{
  "component": "typography",
  "type": "text",
  "content": "点我",
  "on_tap": [{ "action": "update_data", "path": "/page", "value": "home" }]
}
\`\`\`
**现象**：点击无反应，不报错。

**正确写法**：用 Button 组件 + 透明样式模拟文本链接。
\`\`\`json
{
  "component": "button",
  "content": "点我",
  "style": {
    "backgroundColor": "transparent",
    "border": "none",
    "padding": 0,
    "height": "auto",
    "color": "#ffffff",
    "boxShadow": "none"
  },
  "on_tap": [{ "action": "update_data", "path": "/page", "value": "home" }]
}
\`\`\`
---

## 2. Statistic 组件使用注意

**字段名**：用 \`content\` 而不是 \`value\`。
\`\`\`json
// ✗ 显示为 0
{ "component": "statistic", "title": "组件", "value": "67+" }
// ✓
{ "component": "statistic", "title": "组件", "content": "67+" }
\`\`\`
**原因**：\`value\` 被当作数据绑定对象处理（\`value.path\`），字符串的 \`.path\` 为 undefined，回退到 \`config.content\`（也未设置），最终显示 0。

**表达式不生效**：\`content\` 不经过表达式求值，\`"content": "\${\$root.count}"\` 会原样显示。
- 数据路径用 \`value\` 绑定：\`{ "value": { "path": "/count" } }\`
- 计算值先通过 \`update_data\` 存入 dataModel，再用 \`value.path\` 绑定

---

## 3. Repeater 内删除用字段值比较，不用引用比较

**错误写法**：
\`\`\`json
{
  "action": "update_data",
  "path": "/items",
  "value": "\${\$parent.filter(item => item !== \$current)}"
}
\`\`\`
**现象**：点击删除无反应。

**原因**：faui 的 data store 更新时 \`setByPath\` 会浅拷贝路径上的对象，导致 \`\$current\` 与数组中的元素引用不再相等。\`findIndex(x => x === \$current)\` 同样不可靠。

**正确写法**：用唯一字段的值比较：
\`\`\`json
{
  "action": "update_data",
  "path": "/items",
  "value": "\${\$root.items.filter(x => x.id !== \$current.id)}"
}
\`\`\`
确保比较字段（\`id\`、\`text\`、\`name\` 等）在列表内唯一。
---

## 4. CSS 优先级：\`@layer faui\` < Tailwind className < inline style

Box / Repeater 等组件的默认 \`display: flex\` 已迁移到 \`@layer faui\` CSS class（最低优先级）。

- 要用 Tailwind 覆盖布局（如 \`grid\`），直接写 \`className\`：
  \`\`\`json
  { "className": "!grid grid-cols-4 gap-4" }
  \`\`\`
- \`style\` 对象里的属性优先级最高，会覆盖 className。
- 只在值非零/非默认时才写 \`style\`（如 \`gap: 8\`），零值不需要写（CSS 默认就是 0）。

---

## 5. SchemaRenderer 要求 \`id: "root"\` 的组件

shell.json 的入口组件必须设置 \`"id": "root"\`，否则报 "No root component found"。

页面 JSON（home.json、components.json 等）的根组件用各自的 id（如 \`"home-root"\`），通过 shell.json 的 Condition 组件路由引用。

---

## 6. 页面刷新滚动位置问题

浏览器刷新时有自动滚动恢复（scroll restoration），会和 React 的 useEffect scrollTo 竞争。

**正确做法**：在 main.tsx（React 渲染之前）同步执行：
\`\`\`ts
history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
\`\`\`
不要在 App 组件的 useEffect 里做。

---

## 7. 数据路径格式

- **value 绑定**：\`{ "path": "/showcase/expr/name" }\` → \`dataModel.showcase.expr.name\`
- **表达式访问**：\`\${\$root.showcase.expr.name}\`
- **Repeater data**：\`{ "path": "/showcase/list/items" }\` → 绑定到数组
- **Repeater 内相对路径**：\`{ "path": "./done" }\` → 相对于当前 item 的 scope path
- **Repeater 内表达式**：\`\${\$current.text}\` 访问当前项，\`\${\$parent}\` 访问父数组
---

## 8. 多页面 JSON 合并机制

App.tsx 的 \`mergeSchemas\` 将 shell + 各页面 JSON 的 components 数组合并为一个扁平列表，dataModel 按页面 key 合并。

所有页面的组件 ID 共享同一个命名空间，必须全局唯一。建议用页面前缀：\`home-*\`、\`comp-*\`、\`demo1-*\`。

---

## 9. \`on_change\` 会覆盖 action 的 \`value\` 字段

**错误写法**：在 Select 的 \`on_change\` 里用表达式计算派生值。
\`\`\`json
{
  "component": "select",
  "value": { "path": "/product" },
  "on_change": {
    "action": "update_data",
    "path": "/price",
    "value": "\${({'a': 100, 'b': 200})[\$root.product]}"
  }
}
\`\`\`
**现象**：price 被设为 Select 的原始选中值（如 \`"a"\`），而不是表达式结果。

**原因**：Input / Select / Radio 等组件在触发 \`on_change\` 时，会用 \`{ ...config.on_change, value: newValue }\` 覆盖 action 对象，导致自定义 \`value\` 表达式被替换为组件的原始值。

**正确做法**：不通过 \`on_change\` 存派生值，而是在需要的地方用表达式直接计算：
\`\`\`json
{
  "component": "typography",
  "content": "\${({'a': 100, 'b': 200})[\$root.product] || '—'}"
}
\`\`\`

---

## 10. Descriptions 组件用 \`options\` + \`{label, value}\`，不是 \`items\` + \`{label, content}\`

**错误写法**：
\`\`\`json
{
  "component": "descriptions",
  "items": [
    { "label": "姓名", "content": "张三" }
  ]
}
\`\`\`
**现象**：描述列表不显示任何内容。

**原因**：Descriptions 组件从 \`config.options\` 读取数据（非 \`items\`），并将 \`opt.value\` 映射为 \`children\`（非 \`content\`）。使用 \`items\` 或 \`content\` 字段会被完全忽略。

**正确写法**：
\`\`\`json
{
  "component": "descriptions",
  "options": [
    { "label": "姓名", "value": "张三" }
  ]
}
\`\`\`

---

## 11. ECharts 容器在 flex 布局中宽度为 0

**错误现象**：Chart 组件报 \`[ECharts] Can't get DOM width or height\`，图表不渲染。

**原因**：faui 的 Box 组件默认 \`display: flex; flex-direction: column\`，Spin 内部也用了 \`display: flex; flex-direction: column\`。在这种 flex column 嵌套链中，如果中间某层容器（如 Row）没有显式设置 \`width: 100%\`，flex 子元素的宽度会由内容撑开而非继承父容器宽度。ECharts 的容器 div 虽然设了 \`width: 100%\`，但 100% 相对的是父元素的内容宽度——如果父元素自身宽度为 0（flex 子元素未撑开），100% 也是 0。

**正确做法**：给图表区域的内层容器（Row / Box）显式加 \`"width": "100%"\`：
\`\`\`json
{
  "id": "dash-charts-1-inner",
  "component": "row",
  "style": { "width": "100%", "maxWidth": "1100px", "margin": "0 auto" }
}
\`\`\`

**规律**：在 faui 的 flex column 布局链中，任何需要撑满宽度的子容器都应显式设置 \`width: 100%\`，不要依赖 block 元素的默认行为。

---

## 12. SPA Path 路由需要服务端 rewrite 配置

使用 \`history.pushState\` 做 path 路由（如 \`/showcase\`、\`/components\`）时，用户直接访问或刷新非根路径会返回 404，因为服务端没有对应的文件。

**部署时必须配置 SPA fallback**：将所有路径请求重定向到 \`index.html\`，让前端路由接管。

常见配置方式：
- 静态托管平台：添加 rewrite 规则（\`/* → /index.html 200\`）
- Nginx：\`try_files $uri /index.html;\`
- Apache：\`.htaccess\` 配置 \`RewriteRule\`

**注意**：不要用 hash 路由（\`#page\`）来回避此问题，因为 hash 会和页内锚点（Anchor 组件的 \`domId\` 定位）冲突。

---

## 13. Typography 组件不适合做布局元素

**问题**：Typography 的 \`type\` 映射到 Ant Design 底层元素不可控：
- \`type: "text"\` → \`<span>\`（行内元素）
- \`type: "title"\` → \`<h1>\`~\`<h5>\`（块级）
- \`type: "paragraph"\` → \`<div>\`（块级）

在 JSON 中写 \`textAlign: "center"\`、\`alignSelf\`、\`margin\` 等布局样式时，\`type: "text"\` 因为是 \`<span>\` 会完全失效，写 JSON 的人必须记住底层映射才能预判行为，心智负担大。

**正确做法**：
- 布局文本用 Box：永远是块级 flex 容器，\`content\` 放文字，style 完全可控
- Typography 只在需要其语义化能力时使用：\`ellipsis\`、\`copyable\`、\`mark\`、\`code\`、\`keyboard\` 等

**提示词编写注意**：在给 AI 写页面生成提示词时，应弱化 Typography 的使用，引导优先用 Box + \`content\` 来承载文本，避免 AI 大量生成 Typography 导致布局问题。

## 14. 栅格布局组件名是 row / col，不是 grid_row / grid_col

**错误写法**：
\`\`\`json
{ "component": "grid_row", "children": ["col1", "col2"] }
{ "component": "grid-col", "span": 12 }
\`\`\`

**正确写法**：
\`\`\`json
{ "component": "row", "gutter": 16, "children": ["col1", "col2"] }
{ "id": "col1", "component": "col", "span": 12 }
\`\`\`

**原因**：组件注册表中的名字就是 \`row\` 和 \`col\`，使用 \`grid_row\`、\`grid_col\`、\`grid-row\`、\`grid-col\` 等变体会找不到组件，导致渲染失败。
`,
};
