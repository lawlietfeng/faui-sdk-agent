import { describe, expect, it } from 'vitest';
import { dynamicFormSkill } from './dynamic-form.js';

describe('dynamicFormSkill', () => {
  it('requires the supported Condition fields and expression form', () => {
    expect(dynamicFormSkill.content).toContain('不得使用不存在的 `condition` 属性');
    expect(dynamicFormSkill.content).toContain('不得在 `condition` 组件上写 `children`');
    expect(dynamicFormSkill.content).toContain('`when` 或 `match` 写成 `{ "path": "/field" }`');
    expect(dynamicFormSkill.content).toContain('`"${$root.field}"` 表达式');
  });
});
