import { describe, expect, it } from 'vitest';
import { selectFormContractComponents } from './component-selector.js';

describe('selectFormContractComponents', () => {
  it('uses the common field fallback for vague form requests', () => {
    const components = selectFormContractComponents('生成一个简单表单');
    expect(components).toEqual(expect.arrayContaining(['box', 'form', 'text', 'button', 'input', 'select', 'datepicker']));
  });

  it('keeps specific field requests compact', () => {
    const components = selectFormContractComponents('生成包含姓名和附件的表单');
    expect(components).toEqual(expect.arrayContaining(['input', 'upload']));
    expect(components).not.toContain('slider');
  });

  it('always includes components already used by the current schema', () => {
    const components = selectFormContractComponents('修改提交文案', {
      components: [
        { id: 'root', component: 'form', children: ['department'] },
        { id: 'department', component: 'select', value: { path: '/department' } },
      ],
      dataModel: { department: null },
    });
    expect(components).toContain('select');
  });
});
