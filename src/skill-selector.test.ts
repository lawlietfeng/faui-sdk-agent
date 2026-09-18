import { describe, expect, it } from 'vitest';
import { selectFormSkills } from './skill-selector.js';
import { builtinSkills } from './skills/index.js';

describe('selectFormSkills', () => {
  it('does not inject the legacy form-core skill by default', () => {
    expect(selectFormSkills('生成一个简单表单', builtinSkills).map(skill => skill.name))
      .toEqual([]);
  });

  it('loads only relevant Skills for a leave form', () => {
    expect(selectFormSkills('生成请假表单，需要姓名、开始日期、结束日期和提交校验', builtinSkills)
      .map(skill => skill.name))
      .toEqual(['field-text', 'field-date', 'validation-submit']);
  });

  it('loads advanced and action Skills only when requested', () => {
    expect(selectFormSkills('上传附件后调用 API 提交，并显示成功通知', builtinSkills)
      .map(skill => skill.name))
      .toEqual(['field-advanced', 'validation-submit', 'actions']);
  });

  it('loads action Skill for iframe parent communication', () => {
    expect(selectFormSkills('嵌入 iframe 后点击按钮通知父页面', builtinSkills)
      .map(skill => skill.name))
      .toEqual(['actions']);
  });

  it('loads dynamic-form for natural-language conditional display requirements', () => {
    expect(selectFormSkills('勾选全天后显示日期，否则显示日期和时间', builtinSkills)
      .map(skill => skill.name))
      .toEqual(['field-choice', 'field-date', 'dynamic-form']);
  });
});
