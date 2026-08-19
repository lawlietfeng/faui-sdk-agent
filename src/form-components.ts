/**
 * 当前开发阶段依据 faui-sdk/src/manifest.ts 的 Form Edition 清单维护。
 * 发布前需重新与 faui-sdk 的 formComponentNames 核对。
 */
export const FORM_COMPONENT_NAMES = [
  'box', 'flex', 'grid', 'row', 'col', 'space', 'layout', 'header', 'sider', 'content', 'footer', 'divider',
  'form', 'input', 'textarea', 'select', 'radio', 'checkbox', 'datepicker', 'timepicker', 'upload', 'switch',
  'inputnumber', 'slider', 'rate', 'cascader', 'treeselect', 'colorpicker', 'transfer', 'autocomplete', 'mentions',
  'button', 'calendar', 'segmented',
  'text', 'icon', 'typography', 'tag', 'skeleton', 'progress',
  'alert', 'spin', 'modal', 'drawer', 'tooltip', 'popover', 'popconfirm',
  'condition', 'repeater',
] as const;

export type FormComponentName = typeof FORM_COMPONENT_NAMES[number];

const formComponentNameSet = new Set<string>(FORM_COMPONENT_NAMES);

export function isFormComponentName(value: string): value is FormComponentName {
  return formComponentNameSet.has(value);
}
