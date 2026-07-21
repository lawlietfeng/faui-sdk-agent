import type { SkillDef } from '../skill-store.js';

export const componentCatalogSkill: SkillDef = {
  name: 'component-catalog',
  description: '查询 faui 组件清单、字段说明和适用场景',
  content: `
# faui 组件目录

faui 提供 67+ 组件，分为 6 大类：布局与导航、数据展示、表单与录入、弹层与反馈、逻辑控制、数据可视化。

## 布局与导航

| 组件 | 用途 | 关键字段 |
|------|------|----------|
| Box | **最重要的布局组件**，弹性盒容器，支持水平/垂直排列、间距、对齐。**布局文本优先用 Box，不要用 Typography** | children, content, style, className, layout, spacing, padding, align, justify, domId |
| Flex | 弹性布局组件，支持 gap、wrap、方向、对齐 | gap, wrap, direction, align, justify, children |
| Row | 栅格行容器，支持响应式 gutter 和水平对齐 | gutter, align, justify, children |
| Col | 栅格列，支持 xs/sm/md/lg/xl/xxl 六断点响应 | span, offset, xs, sm, md, lg, xl, xxl, children |
| Space | 间距容器，快速设置子元素水平或垂直间距 | size, direction, align, wrap, children |
| Layout | 页面布局框架，组合 Header/Sider/Content/Footer | children, style, className |
| Header | Layout 页头区域 | children, style, className |
| Sider | Layout 可折叠侧边栏，支持响应式收起 | collapsed, collapsible, width, children |
| Content | Layout 主内容区域 | children, style, className |
| Footer | Layout 页脚区域 | children, style, className |
| Divider | 分割线，支持水平/垂直方向和带文字标注 | orientation, type, children |
| Menu | 导航菜单，支持水平/垂直/内嵌三种模式 | mode, items, selectedKeys, openKeys |
| Anchor | 锚点导航，自动高亮当前滚动位置 | items, targetOffset |
| Affix | 固钉，将元素固定在可视区域指定位置 | offsetTop, offsetBottom, children |

## 数据展示

| 组件 | 用途 | 关键字段 |
|------|------|----------|
| Typography | 排版组件，支持标题/段落/文本/链接四种类型。**仅用于 ellipsis/copyable/mark 等语义化场景，布局文本用 Box** | variant, type, content, level, ellipsis, copyable, mark, code, strong, italic |
| Text | 纯文本渲染，支持表达式绑定和模板插值 | content, style, className |
| Button | 按钮，支持 primary/default/dashed/link/text 类型。**on_tap 只有 Button 和 FloatButton 支持** | content, label, type, shape, size, block, danger, ghost, disabled, on_tap |
| Icon | 图标库，支持 outlined/filled/twoTone 三种风格 | name, style, className |
| Tag | 标签，支持预设颜色、自定义色值和可关闭 | content, color, closable, bordered |
| Badge | 徽标数，在元素右上角显示数字或状态点 | count, dot, color, showZero, children |
| Avatar | 头像，支持图片/文字/图标三种形式 | src, icon, size, shape, alt |
| Card | 卡片容器，支持封面、操作栏和 Meta 信息 | title, cover, actions, bordered, hoverable, children |
| Collapse | 折叠面板，手风琴或自由展开模式 | items, accordion, bordered, defaultActiveKey |
| Descriptions | 描述列表，键值对形式展示详细信息。**用 options + {label, value}，不是 items + {label, content}** | title, options, bordered, column |
| Empty | 空状态占位，支持自定义图片和描述文字 | description, image, children |
| Image | 图片组件，支持预览、懒加载和容错处理 | src, alt, width, height, preview, fallback |
| List | 列表，支持分页、加载更多和栅格布局 | data, renderItem, grid, pagination, loading |
| Table | 表格，支持排序、筛选、分页和固定列 | columns, data, pagination, rowKey, scroll |
| Statistic | 统计数值展示，支持前缀后缀和倒计时。**用 content 设置静态值，不是 value；content 不支持表达式** | content, value, title, prefix, suffix, precision, countUp, isCountdown |
| Timeline | 时间轴，垂直展示时间流信息 | items, mode, pending |
| Tree | 树形控件，支持展开/选中/拖拽操作 | treeData, checkable, selectable, expandedKeys, selectedKeys |
| Tabs | 标签页切换，支持 line/card 类型和四方向 | items, activeKey, type, tabPosition, centered, destroyOnHidden |
| Segmented | 分段控制器，在多个选项间快速切换 | options, value, block, size |
| Calendar | 日历组件，支持年/月两种视图模式 | value, mode, fullscreen |
| Carousel | 走马灯，循环播放子元素内容 | autoplay, dots, effect, children |
| QRCode | 二维码生成器，可配置尺寸和纠错级别 | value, size, errorLevel, icon |
| Watermark | 水印，为子元素区域添加图文水印 | content, font, gap, offset, children |
| Skeleton | 骨架屏，数据加载前的占位动画 | active, loading, avatar, paragraph, title |
| Pagination | 分页器，支持总数显示和每页条数切换 | current, total, pageSize, showSizeChanger, showQuickJumper |
| Progress | 进度条/环形图，实时展示操作进度 | percent, type, status, strokeColor, showInfo |
| Steps | 步骤条，引导用户按流程完成任务 | current, items, direction, status |

## 表单与录入

| 组件 | 用途 | 关键字段 |
|------|------|----------|
| Form | 表单容器，内置校验规则、字段联动和提交逻辑 | layout, initialValues, onFinish, children |
| Input | 单行输入框，支持前缀/后缀和清除按钮 | value, placeholder, prefix, suffix, allowClear, disabled, maxLength, on_change |
| Textarea | 多行文本输入，支持自适应高度和字数统计 | value, placeholder, rows, autoSize, maxLength, showCount, on_change |
| InputNumber | 数字输入框，支持步进按钮和范围限制 | value, min, max, step, precision, on_change |
| Select | 下拉选择器，支持搜索/多选/远程加载 | value, options, mode, showSearch, allowClear, placeholder, on_change |
| Radio | 单选框，支持按钮样式和垂直排列 | value, options, buttonStyle, optionType, on_change |
| Checkbox | 复选框，支持全选/半选和组合使用 | value, options, checked, indeterminate, on_change |
| Switch | 开关切换，两种状态间互斥选择 | value, checked, checkedChildren, unCheckedChildren, disabled, on_change |
| DatePicker | 日期选择器，支持年/月/周/日和范围 | value, picker, format, showTime, disabledDate, on_change |
| TimePicker | 时间选择器，支持时/分/秒级精度 | value, format, hourStep, minuteStep, secondStep, on_change |
| ColorPicker | 颜色选择器，支持 HEX/RGB/HSB 等色彩模型 | value, format, showText, presets, on_change |
| Upload | 文件上传，支持拖拽、多文件和图片墙模式 | action, listType, multiple, maxCount, accept, fileList, on_change |
| Slider | 滑动条，在数值区间内连续或离散选值 | value, min, max, step, marks, range, on_change |
| Rate | 评分组件，支持半星和自定义字符 | value, count, allowHalf, character, on_change |
| Cascader | 级联选择，多级数据逐层选取 | value, options, placeholder, changeOnSelect, on_change |
| TreeSelect | 树选择，从树形结构中选择节点 | value, treeData, treeCheckable, placeholder, on_change |
| Transfer | 穿梭框，在左右两栏之间移动数据项 | dataSource, targetKeys, titles, render, on_change |
| AutoComplete | 自动补全，根据输入内容推荐选项 | value, options, placeholder, filterOption, on_change |
| Mentions | 提及组件，@用户或话题的输入框 | value, options, prefix, placeholder, on_change |
| StepIndicator | 步骤指示器，显示当前进度 | current, steps, direction |

## 弹层与反馈

| 组件 | 用途 | 关键字段 |
|------|------|----------|
| Modal | 对话框，用于确认操作或展示重要信息 | open, title, content, okText, cancelText, onOk, onCancel, children |
| Drawer | 抽屉面板，从屏幕边缘滑入的浮层容器 | open, title, placement, width, onClose, children |
| Popover | 气泡卡片，悬浮展示丰富内容 | content, title, trigger, placement, children |
| Tooltip | 文字提示，鼠标悬停时的简要说明 | title, placement, trigger, children |
| Popconfirm | 气泡确认框，操作前的轻量二次确认 | title, description, okText, cancelText, onConfirm, children |
| Dropdown | 下拉菜单，点击或悬浮展开操作列表 | menu, trigger, placement, children |
| Alert | 警告提示，success/info/warning/error 四级反馈 | message, description, type, closable, showIcon |
| Spin | 加载指示器，全局或局部的 loading 状态 | spinning, size, tip, children |
| FloatButton | 浮动按钮，固定在视口右下角的快捷操作。**on_tap 只有 Button 和 FloatButton 支持** | variant, icon, description, tooltip, type, shape, href, badge, on_tap |
| Tour | 漫游式引导，分步介绍页面功能 | open, steps, current, on_close, on_change |

## 逻辑控制

| 组件 | 用途 | 关键字段 |
|------|------|----------|
| Condition | 条件渲染，根据表达式匹配结果切换显示不同子组件分支，支持 cases 多分支和 when/then/else 二元判断 | when, then, else, match, cases, default, animation |
| Repeater | 数据迭代器，遍历数组数据循环渲染子组件模板，支持动画、排序和 keyField 优化 | data, children, keyField, direction, gap, emptyContent, animation |

## 数据可视化

| 组件 | 用途 | 关键字段 |
|------|------|----------|
| Chart | ECharts 图表引擎，支持折线/柱状/饼图/散点/雷达/热力图等全系列图表，按需引入零额外负担 | data, chartType, xField, yField, seriesField, option, title, height, theme, loading, smooth, stacked, showLegend, showTooltip |

## 重要提示

1. **布局文本优先用 Box**：Box 是最基础的布局组件，支持 content 字段直接渲染文本，不要用 Typography 做布局
2. **on_tap 仅限 Button/FloatButton**：只有这两个组件支持 on_tap 事件，其他组件不支持
3. **Statistic 的 content 不支持表达式**：用 content 设置静态值，用 value.path 绑定动态数据
4. **Descriptions 用 options**：配置格式是 options + {label, value}，不是 items + {label, content}
5. **Typography 仅用于语义化场景**：ellipsis/copyable/mark/code 等特殊排版需求才用 Typography
6. **domId 用于锚点**：需要滚动定位时用 domId，不是 id
7. **表达式语法**：\${expr} 支持 $root、$current、$parent 上下文变量
8. **数据绑定**：{ path: "/field/path" } 用于读取，update_data action 用于写入
`,
};
