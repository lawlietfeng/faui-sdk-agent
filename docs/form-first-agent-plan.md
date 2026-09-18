# FAUI Agent 提示词与双模式架构实施计划

## 目标

重构 `faui-sdk-agent` 的提示词、Skills 和 Schema 工具，使 Agent：

- 默认生成 `faui-sdk` Form Edition 表单。
- 只加载当前需求需要的组件知识，减少默认提示词长度。
- 通过工具完成 Schema 的创建、增量修改和校验。
- 为未来支持 `full` Edition 保留清晰的扩展边界。

本计划只先实现 Form Edition。Full Edition 只保留隔离方式，暂不实现其组件知识、生成规则或公开配置。

## 参考来源

所有组件、属性、动作、数据绑定和校验规则以以下项目为准：

`/Users/lawliet/pro/com/faui-sdk`

重点参考：

- `src/manifest.ts`
- `src/components/formRegistry.ts`
- `src/components/Form.tsx`
- `src/types/`
- `src/actions/`
- `docs/form-guide.md`
- `docs/external-submit.md`

不参考另一个 `faui` 项目。

当前处于调整阶段，开发时直接读取本地 `faui-sdk` 的源码、Manifest、类型和文档。已发布的 `FauiAgent` 不得依赖 `/Users/lawliet/...` 这样的本地绝对路径。

## 总体架构

```text
用户需求
  ↓
需求分析：字段、校验、联动、提交方式
  ↓
选择 Form 组件
  ↓
按需加载 Skills
  ↓
规划 Schema、dataModel 和组件关系
  ↓
set_components
  ↓
validate_schema
  ↓
update_components / remove_components / update_data_model
```

组件选择、Skill 选择和 Schema 生成在同一轮 Agent 流程中完成，不为“组件选择”和“Schema 生成”额外发起一次 LLM 请求。

Skills 由 Agent 根据需求预先选择并注入，不把整套组件文档全部放入默认 System Prompt，也不把只读知识强行设计成 Schema 修改工具。

## Edition 设计

### 当前 Form 模式

第一阶段不新增或公开 `edition` 配置，Agent 固定生成 Form Edition。

Form 模式使用：

- Form System Prompt
- Form Skills
- `faui-sdk` 中 `formComponentNames` 对应的组件白名单
- Form Schema 校验规则

### Full 预留模式

Full Edition 实际实现并通过测试后，才可扩展为：

```ts
new FauiAgent({
  edition: 'full',
});
```

Full 模式应独立使用：

- Full System Prompt
- Full Skills
- Full Edition 组件白名单
- Full Edition 校验规则

两种模式不共享完整组件目录，不同时注入两套 Skills。当前默认且唯一可用的模式是 `form`。

## 提示词分层

### 默认 System Prompt

默认提示词只保留全局不可违反的规则：

- 只生成当前 Edition 支持的组件。
- Schema 必须包含 `id: "root"`、`components` 和 `dataModel`。
- 组件 ID 必须唯一，所有组件必须从 `root` 可达。
- 表单使用 `component: "form"`。
- 首次生成使用 `set_components`，后续修改使用增量工具。
- 数据绑定默认使用 `/` 开头的绝对路径。
- 不猜测 `faui-sdk` 未定义的属性、动作或组件。
- 默认使用内部提交。
- 未提供提交接口或业务动作时，提交按钮只负责校验，不虚构 `http_proxy`、接口地址或成功提示。
- Form 不支持的组件或能力必须明确说明，不自动替换为其他组件，也不自动切换到 Full。

默认提示词不放入：

- 全量组件参数表
- 完整布局样式
- 所有动作示例
- Full Edition 组件说明

### 始终加载的 `form-core`

内容包括：

- `root` 与 `form` 基础结构
- `dataModel` 初始值
- 字段标签与 `text → 字段` 直接相邻规则
- `rules` 和必填标记
- `value.path` / `checked.path` 绑定
- 内部提交与外部提交的基本区别

### 按需加载的 Skills

| Skill | 加载条件 |
|---|---|
| `form-layout` | 用户要求分组、双列、栅格、按钮对齐 |
| `field-text` | `input`、`textarea`、`autocomplete`、`mentions` |
| `field-choice` | `select`、`radio`、`checkbox`、`switch`、`segmented` |
| `field-date` | `datepicker`、`timepicker`、`calendar` |
| `field-advanced` | `upload`、`cascader`、`treeselect`、`transfer`、`slider`、`rate`、`colorpicker` |
| `validation-submit` | 校验、提交、重置、外部提交 |
| `actions` | HTTP、消息、通知、嵌入通信、字段联动 |
| `dynamic-form` | `condition`、`repeater`；第一阶段默认不加载 |

每个 Skill 只描述实际使用的组件、属性、示例和常见错误，避免重复描述全局规则。

## 组件来源与白名单

调整阶段直接读取 `faui-sdk` 的 `src/manifest.ts`、类型、组件实现和文档，不维护 Manifest 快照。

用途：

- 生成组件目录。
- 限制 Agent 可生成的组件名。
- 校验是否误用了 Full 专属组件。
- 在后续发布阶段记录 SDK 版本和 Manifest 版本。

组件详情始终以 `faui-sdk` 源码和文档为准，不手工扩展不存在的属性。准备发布时，再决定是否生成并固化 Manifest 快照。

## 工具设计

保留以下 Schema 工具：

- `set_components`
- `update_components`
- `remove_components`
- `update_data_model`
- `validate_schema`

工具参数与行为调整：

- 首次 `set_components` 必须包含 `dataModel`。
- 新增组件时必须同时包含 `id` 和 `component`。
- 已有 Schema 时禁止用 `set_components` 大范围替换，避免破坏增量编辑。
- `validate_schema` 检查当前 Edition 的组件白名单。
- 校验 `root`、组件可达性、重复 ID、子组件引用和 `dataModel`。
- 校验 `submitButtonId` 是否指向有效按钮。
- 校验必填字段标签的相邻关系。
- 校验动作的 `payload` 结构和 JSON Pointer 路径。

每次 `set_components`、`update_components`、`remove_components` 后，Agent 自动执行校验。校验失败时保留原 Schema，不发布本次更新，并将错误反馈给模型。`validate_schema` 工具仍保留，供模型或调用方主动检查。

校验逻辑应由程序负责，不能只依赖自然语言提示词。

## Form 生成规则

第一阶段覆盖 `faui-sdk` 当前完整 Form Edition。组件按需求自动选择并加载对应 Skill，不再划分“核心”和“高级”组件。

可生成组件必须来自 Form Edition 白名单，包括：

- 表单字段：`input`、`textarea`、`inputnumber`、`select`、`radio`、`checkbox`、`switch`、`datepicker`、`timepicker`、`upload`、`autocomplete`、`mentions`、`segmented`、`calendar`、`slider`、`rate`、`colorpicker`、`cascader`、`treeselect`、`transfer`。
- 表单结构：`form`、`box`、`flex`、`row`、`col`、`space`、`divider` 等 Form Edition 容器。
- 表单辅助：`text`、`button`、`condition` 及 Form Edition 中确有需要的辅助组件。

默认不添加主题色、卡片阴影、Tailwind 类或大量内联样式；只生成必要的结构和少量布局属性。用户明确提出视觉要求时才生成样式。

密码输入、复杂动态表单等能力，只有在确认 `faui-sdk` 实际支持后才加入生成规则。

## 实施阶段

### 阶段一：提示词和 Skills 重构

- 新建精简的 Form System Prompt。
- 将现有组件目录改为 Form Edition 目录。
- 删除 Landing Page、图表、导航和 Full 专属内容。
- 拆分 `form-core`、字段类、提交类和动作类 Skills。
- 修正绑定路径、动作 payload、`$value` 和必填标签规则。
- 默认只生成内部提交；未提供业务动作时只生成校验型提交按钮。
- 默认不生成视觉样式。

### 阶段二：SDK 对齐与工具校验

- 直接读取当前 `faui-sdk` 的 Manifest、类型、组件实现和文档。
- 更新 `PageSchema`，使 `dataModel` 成为必需字段。
- 增强 `validate_schema`。
- 防止生成 Full 专属组件和不可达组件。
- 每次 Schema 修改后自动校验，失败时回退本次修改。

### 阶段三：按需加载机制

- 根据用户需求识别字段类型和提交需求。
- 自动选择需要的 Skills。
- 限制每次请求注入的 Skill 数量。
- 保持默认提示词长度稳定。

### 阶段四：Full 扩展边界预留

- 将 System Prompt、Skills、Manifest 和校验器按 Edition 隔离。
- 暂不公开 `edition` 配置，也不实现 Full Edition 的具体组件知识。

## 测试计划

新增或更新测试，覆盖：

- 基础表单生成。
- `root` 和 `dataModel` 必填。
- 表单字段和标签结构。
- 必填标记相邻规则。
- 内部提交和外部提交。
- 动态 `disabled` 绑定。
- 正确的 Action payload。
- 非法 Full 组件被拒绝。
- 首次创建与后续增量更新。
- 不同需求只加载对应 Skills。
- 未支持的 Form 能力会明确返回限制说明。
- 默认表单不生成视觉样式、虚构接口或成功提示。

## 验证命令

```bash
npm run lint
npm run typecheck
npm run test
```

## 验收标准

- 默认 Agent 只生成 Form Edition 能力。
- 默认 System Prompt 保持精简，不包含全量组件文档。
- 组件知识能够按需求加载。
- 生成结果符合 `faui-sdk` 当前 Form Schema 规则。
- 每次 Schema 修改均会自动校验，并拦截明显的非法 Schema。
- Full Edition 仅作为后续独立模式，不影响默认 Form 模式。
- lint、typecheck 和 test 全部通过。
