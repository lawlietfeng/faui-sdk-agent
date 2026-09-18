import type { SkillDef } from './skill-store.js';

interface SkillRule {
  name: string;
  terms: string[];
}

const SKILL_RULES: SkillRule[] = [
  {
    name: 'form-layout',
    terms: ['分组', '分栏', '双列', '两列', '栅格', 'row', 'col', '布局', '按钮区', '对齐'],
  },
  {
    name: 'field-text',
    terms: ['姓名', '名称', '文本', '输入框', '备注', '说明', '邮箱', '手机', '电话', '地址', '年龄', '金额', '数量', '数字', '自动补全', '提及', 'input', 'textarea', 'autocomplete', 'mentions'],
  },
  {
    name: 'field-choice',
    terms: ['选择', '选项', '类型', '状态', '性别', '部门', '城市', '地区', '单选', '多选', '勾选', '开关', '同意', 'checkbox', 'radio', 'select', 'switch', 'segmented'],
  },
  {
    name: 'field-date',
    terms: ['日期', '时间', '日历', '开始时间', '结束时间', 'date', 'time', 'calendar'],
  },
  {
    name: 'field-advanced',
    terms: ['上传', '附件', '文件', '图片', '级联', '省市区', '树选择', '组织架构', '穿梭', '评分', '滑块', '颜色', 'upload', 'cascader', 'treeselect', 'transfer', 'rate', 'slider', 'colorpicker'],
  },
  {
    name: 'validation-submit',
    terms: ['必填', '校验', '验证', '提交', '保存', '重置', '规则', 'validate', 'submit'],
  },
  {
    name: 'actions',
    terms: ['接口', '请求', 'http', 'api', '消息', '通知', '联动', '嵌入', 'iframe', 'postmessage', 'post_message', '父页面', '成功提示', '失败提示', 'on_change', 'on_tap'],
  },
  {
    name: 'dynamic-form',
    terms: ['动态', '重复', '新增一行', '删除一行', '条件显示', '显示字段', '隐藏字段', '后显示', '后隐藏', '勾选后', '切换后', 'if/else', 'repeater', 'condition'],
  },
];

function normalise(value: string): string {
  return value.toLowerCase();
}

export function selectFormSkills(prompt: string, availableSkills: SkillDef[]): SkillDef[] {
  const byName = new Map(availableSkills.map(skill => [skill.name, skill]));
  const selected = new Set<string>();

  const text = normalise(prompt);
  for (const rule of SKILL_RULES) {
    if (rule.terms.some(term => text.includes(normalise(term))) && byName.has(rule.name)) {
      selected.add(rule.name);
    }
  }

  return [...selected].map(name => byName.get(name)!).filter(Boolean);
}
