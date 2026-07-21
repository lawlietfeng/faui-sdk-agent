import type { SkillDef } from '../skill-store.js';

export const layoutPatternsSkill: SkillDef = {
  name: 'layout-patterns',
  description: '常见布局模式（居中、栅格、响应式、深浅交替）',
  content: `
# faui 布局模式

## 页面骨架

根节点 box 包含多个 section box，垂直堆叠形成完整页面。

\`\`\`json
{
  "components": [
    {
      "id": "page-root",
      "component": "box",
      "children": ["hero-section", "stats-section", "features-section", "cta-section"]
    },
    {
      "id": "hero-section",
      "component": "box",
      "align": "center",
      "style": { "backgroundColor": "#272729", "padding": "80px 24px" },
      "children": ["hero-title"]
    },
    {
      "id": "stats-section",
      "component": "box",
      "align": "center",
      "style": { "backgroundColor": "#ffffff", "padding": "80px 24px" },
      "children": ["stats-inner"]
    }
  ],
  "dataModel": {},
  "root": ["page-root"]
}
\`\`\`

规则：
- root 数组只放一个根 box id
- 每个 section 是独立的 box，通过 children 引用
- section 之间通过背景色区分（深浅交替）

## 居中布局

Box + align: "center" 实现水平居中，内部用 maxWidth 限制内容宽度。

\`\`\`json
{
  "id": "centered-section",
  "component": "box",
  "align": "center",
  "style": { "padding": "80px 24px" },
  "children": ["content-wrapper"]
}
\`\`\`

\`\`\`json
{
  "id": "content-wrapper",
  "component": "box",
  "style": { "maxWidth": "980px", "width": "100%" },
  "children": ["title", "body"]
}
\`\`\`

规则：
- 外层 box 用 align: "center" 居中子元素
- 内层 box 用 maxWidth 限制宽度 + width: "100%" 撑满
- padding 加在外层 section 上，保证小屏有边距

## 响应式栅格

Repeater + className 实现 CSS Grid 响应式布局。

\`\`\`json
{
  "id": "card-grid",
  "component": "repeater",
  "data": { "path": "/items" },
  "keyField": "id",
  "className": "!grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4",
  "children": ["card-template"]
}
\`\`\`

规则：
- className 使用 Tailwind CSS grid 类
- \`!\` 前缀覆盖 Repeater 默认的 flex 布局
- 断点：grid-cols-1（手机）→ md:grid-cols-2 或 3（平板）→ xl:grid-cols-4（桌面）
- gap-4 / gap-6 控制卡片间距

也可用 Row + Col 实现 Ant Design 栅格：

\`\`\`json
{
  "id": "stats-row",
  "component": "row",
  "gutter": [24, 24],
  "justify": "center",
  "style": { "maxWidth": "980px", "width": "100%" },
  "children": ["col-1", "col-2", "col-3", "col-4"]
}
\`\`\`

\`\`\`json
{
  "id": "col-1",
  "component": "col",
  "xs": 12,
  "lg": 6,
  "children": ["stat-1"]
}
\`\`\`

规则：
- gutter 用 [水平, 垂直] 数组
- Col 用 xs/sm/md/lg/xl/xxl 六断点，值为 24 栅格份数
- xs: 12 = 手机占半行，lg: 6 = 大屏占 1/4

## 深浅交替区块

Apple 风格的深浅色交替，营造视觉节奏。

\`\`\`json
{
  "id": "dark-section",
  "component": "box",
  "align": "center",
  "style": { "backgroundColor": "#272729", "padding": "80px 24px" },
  "children": ["dark-title"]
}
\`\`\`

\`\`\`json
{
  "id": "light-section",
  "component": "box",
  "align": "center",
  "style": { "backgroundColor": "#f5f5f7", "padding": "80px 24px" },
  "children": ["light-title"]
}
\`\`\`

色板：
- 深色区块背景：#272729，文字：#ffffff（标题）/ #86868b（正文）
- 浅色区块背景：#f5f5f7，文字：#1d1d1f（标题）/ #86868b（正文）
- 白色区块背景：#ffffff，文字同浅色
- 辅助灰色文字：#6e6e73（比 #86868b 更淡）

## 导航栏

固定在顶部的毛玻璃导航栏。

\`\`\`json
{
  "id": "global-nav",
  "component": "box",
  "style": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "right": 0,
    "height": "44px",
    "backgroundColor": "rgba(0, 0, 0, 0.8)",
    "backdropFilter": "blur(20px)",
    "WebkitBackdropFilter": "blur(20px)",
    "zIndex": 1000
  },
  "children": ["nav-inner"]
}
\`\`\`

\`\`\`json
{
  "id": "nav-inner",
  "component": "flex",
  "align": "center",
  "justify": "space-between",
  "style": { "height": "100%", "padding": "0 48px" },
  "children": ["nav-logo", "nav-links", "nav-right"]
}
\`\`\`

规则：
- 高度固定 44px（Apple 标准）
- 半透明黑色 + backdrop-filter blur 实现毛玻璃
- zIndex: 1000 确保在最上层
- 页面 body 需要 paddingTop: "44px" 避免被遮挡
- 导航链接用 visible 表达式控制响应式显隐

## 卡片容器

白色圆角卡片，带极细边框。

\`\`\`json
{
  "id": "card",
  "component": "box",
  "style": {
    "backgroundColor": "#ffffff",
    "borderRadius": "18px",
    "border": "1px solid rgba(0,0,0,0.08)",
    "padding": "24px"
  },
  "children": ["card-title", "card-desc"]
}
\`\`\`

规则：
- borderRadius: "18px" 大圆角
- border 用 rgba(0,0,0,0.08) 极淡的 hairline 边框
- padding 通常 24px，紧凑场景可用 16px
- 深色背景上的卡片用 backgroundColor: "#1d1d1f" + border: "1px solid rgba(255,255,255,0.08)"

## 文本居中

用 Box + align: "center" 包裹文本组件，文本本身加 textAlign: "center"。

\`\`\`json
{
  "id": "centered-text-block",
  "component": "box",
  "align": "center",
  "style": { "maxWidth": "680px" },
  "children": ["block-title", "block-desc"]
}
\`\`\`

\`\`\`json
{
  "id": "block-title",
  "component": "typography",
  "type": "title",
  "content": "标题文本",
  "style": { "fontSize": "40px", "fontWeight": 600, "lineHeight": 1.1, "color": "#1d1d1f", "margin": 0, "textAlign": "center" }
}
\`\`\`

\`\`\`json
{
  "id": "block-desc",
  "component": "typography",
  "type": "text",
  "content": "描述文本内容",
  "style": { "fontSize": "17px", "fontWeight": 400, "lineHeight": 1.47, "color": "#86868b", "margin": 0, "textAlign": "center" }
}
\`\`\`

规则：
- 标题用 typography type: "title"，正文用 type: "text"
- 居中文本块用 maxWidth: "680px" 限制阅读宽度
- margin: 0 重置默认边距，用 marginBottom 精确控制间距
- 字号层级：56px（hero）→ 40px（section 标题）→ 28px（子标题）→ 17px（正文）→ 14px（辅助）→ 12px（标注）

## 按钮样式

Apple 风格 pill-shaped 按钮，主色 #0066cc。

主按钮（实心）：
\`\`\`json
{
  "id": "primary-btn",
  "component": "button",
  "content": "开始使用",
  "className": "hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer",
  "style": {
    "backgroundColor": "#0066cc",
    "color": "#ffffff",
    "fontSize": "17px",
    "fontWeight": 400,
    "borderRadius": "980px",
    "border": "none",
    "padding": "11px 22px",
    "height": "auto",
    "lineHeight": "1.0"
  }
}
\`\`\`

次按钮（描边）：
\`\`\`json
{
  "id": "secondary-btn",
  "component": "button",
  "content": "了解更多",
  "className": "hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer",
  "style": {
    "backgroundColor": "transparent",
    "color": "#0066cc",
    "fontSize": "17px",
    "fontWeight": 400,
    "borderRadius": "980px",
    "border": "1px solid #0066cc",
    "padding": "11px 22px",
    "height": "auto",
    "lineHeight": "1.0"
  }
}
\`\`\`

导航小按钮：
\`\`\`json
{
  "id": "nav-btn",
  "component": "button",
  "content": "GitHub",
  "className": "cursor-pointer hover:opacity-90 transition-opacity",
  "style": {
    "backgroundColor": "#0066cc",
    "color": "#ffffff",
    "fontSize": "12px",
    "fontWeight": 400,
    "borderRadius": "980px",
    "border": "none",
    "padding": "4px 14px",
    "height": "auto",
    "lineHeight": "1.33"
  }
}
\`\`\`

规则：
- borderRadius: "980px" 实现完美药丸形
- 绝不使用 Ant Design 默认按钮样式
- height: "auto" 覆盖 antd 默认高度
- className 加 hover/active 过渡效果
- 导航按钮字号 12px，CTA 按钮字号 17px
`,
};
