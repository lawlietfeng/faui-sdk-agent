import type { PageSchema } from './types.js';

/** Components always needed to build a conventional Form Edition schema. */
export const BASE_FORM_COMPONENTS = ['box', 'form', 'text', 'button'] as const;

/**
 * Conservative fallback for vague requests such as "generate a form". These
 * are intentionally omitted once the request identifies one or more field
 * types, keeping the initial contract prompt small for specific requests.
 */
export const COMMON_FIELD_COMPONENTS = [
  'input',
  'textarea',
  'inputnumber',
  'select',
  'radio',
  'checkbox',
  'switch',
  'datepicker',
] as const;

interface ComponentRule {
  components: readonly string[];
  terms: readonly string[];
  field?: boolean;
}

const COMPONENT_RULES: ComponentRule[] = [
  { components: ['box', 'divider', 'row', 'col', 'flex', 'space'], terms: ['分组', '分栏', '双列', '两列', '栅格', 'row', 'col', '布局', '按钮区', '对齐'] },
  { components: ['input'], terms: ['姓名', '名称', '邮箱', '手机', '电话', '地址', '输入框', 'input'], field: true },
  { components: ['textarea'], terms: ['备注', '说明', '多行', '文本域', 'textarea'], field: true },
  { components: ['inputnumber'], terms: ['年龄', '金额', '数量', '数字', 'inputnumber'], field: true },
  { components: ['autocomplete'], terms: ['自动补全', 'autocomplete'], field: true },
  { components: ['mentions'], terms: ['提及', 'mentions'], field: true },
  { components: ['select'], terms: ['下拉', '部门', '城市', '地区', 'select'], field: true },
  { components: ['radio'], terms: ['单选', '性别', 'radio'], field: true },
  { components: ['checkbox'], terms: ['多选', '勾选', '同意', 'checkbox'], field: true },
  { components: ['switch'], terms: ['开关', 'switch'], field: true },
  { components: ['segmented'], terms: ['分段选择', 'segmented'], field: true },
  { components: ['datepicker'], terms: ['日期', '开始时间', '结束时间', 'date'], field: true },
  { components: ['timepicker'], terms: ['时间', 'time'], field: true },
  { components: ['calendar'], terms: ['日历', 'calendar'], field: true },
  { components: ['upload'], terms: ['上传', '附件', '文件', '图片', 'upload'], field: true },
  { components: ['cascader'], terms: ['级联', '省市区', 'cascader'], field: true },
  { components: ['treeselect'], terms: ['树选择', '组织架构', 'treeselect'], field: true },
  { components: ['transfer'], terms: ['穿梭', 'transfer'], field: true },
  { components: ['rate'], terms: ['评分', 'rate'], field: true },
  { components: ['slider'], terms: ['滑块', 'slider'], field: true },
  { components: ['colorpicker'], terms: ['颜色选择', 'colorpicker'], field: true },
  { components: ['condition'], terms: ['条件显示', '条件隐藏', 'if/else', 'condition'] },
  { components: ['repeater'], terms: ['重复', '动态表单', '新增一行', 'repeater'] },
  { components: ['modal'], terms: ['弹窗', '对话框', 'modal'] },
  { components: ['drawer'], terms: ['抽屉', 'drawer'] },
  { components: ['tooltip'], terms: ['提示框', 'tooltip'] },
  { components: ['popover'], terms: ['气泡卡片', 'popover'] },
  { components: ['popconfirm'], terms: ['二次确认', '确认提示', 'popconfirm'] },
  { components: ['alert'], terms: ['警告', '告警', 'alert'] },
  { components: ['tag'], terms: ['标签', 'tag'] },
  { components: ['spin', 'skeleton', 'progress'], terms: ['加载', '骨架屏', '进度', 'spin', 'skeleton', 'progress'] },
];

function normalise(value: string): string {
  return value.toLowerCase();
}

/** Select the smallest useful initial Form contract projection. */
export function selectFormContractComponents(prompt: string, currentSchema?: PageSchema): string[] {
  const selected = new Set<string>(BASE_FORM_COMPONENTS);
  const text = normalise(prompt);
  let hasFieldIntent = false;

  for (const rule of COMPONENT_RULES) {
    if (!rule.terms.some(term => text.includes(normalise(term)))) continue;
    rule.components.forEach(component => selected.add(component));
    if (rule.field) hasFieldIntent = true;
  }

  if (!hasFieldIntent) COMMON_FIELD_COMPONENTS.forEach(component => selected.add(component));
  currentSchema?.components.forEach(component => selected.add(component.component));
  return [...selected];
}
