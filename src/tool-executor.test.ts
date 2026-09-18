import { describe, expect, it } from 'vitest';
import { validateFormSchema } from './form-schema.js';
import { executeToolCall } from './tool-executor.js';
import type { PageSchema } from './types.js';

const empty: PageSchema = { components: [], dataModel: {} };

function createValidSchema(): PageSchema {
  return {
    components: [
      { id: 'root', component: 'form', submitButtonId: 'submit', children: ['name-item', 'submit'] },
      { id: 'name-item', component: 'box', children: ['name-label', 'name-input'] },
      { id: 'name-label', component: 'text', content: '姓名' },
      {
        id: 'name-input',
        component: 'input',
        value: { path: '/name' },
        rules: [{ required: true, message: '请输入姓名' }],
      },
      { id: 'submit', component: 'button', label: '提交' },
    ],
    dataModel: { name: '' },
  };
}

describe('executeToolCall', () => {
  describe('get_component_contracts', () => {
    it('returns a batch of contracts without changing the schema', () => {
      const current = createValidSchema();
      const result = executeToolCall('get_component_contracts', {
        components: ['input', 'select'],
      }, current);
      expect(result.schema).toBe(current);
      const payload = JSON.parse(result.message) as { contracts: Record<string, any> };
      expect(Object.keys(payload.contracts)).toEqual(['input', 'select']);
      expect(payload.contracts.input.allowedProps).not.toContain('style');
    });

    it('includes style in contracts when style is enabled', () => {
      const result = executeToolCall('get_component_contracts', {
        components: ['input'],
      }, empty, { styleEnabled: true });
      const payload = JSON.parse(result.message) as { contracts: Record<string, any> };
      expect(payload.contracts.input.allowedProps).toContain('style');
    });

    it('rejects unknown components', () => {
      expect(() => executeToolCall('get_component_contracts', {
        components: ['not-a-form-component'],
      }, empty)).toThrow(/不支持的 Form Edition 组件/);
    });
  });

  describe('set_components', () => {
    it('sets and validates a complete Form Edition schema', () => {
      const schema = createValidSchema();
      const result = executeToolCall('set_components', { ...schema }, empty);
      expect(result.schema).toEqual(schema);
      expect(result.message).toContain('validated schema');
    });

    it('requires dataModel', () => {
      expect(() => executeToolCall('set_components', { components: [] }, empty))
        .toThrow('dataModel must be a plain object');
    });

    it('requires root and Form Edition components', () => {
      expect(() => executeToolCall('set_components', {
        components: [{ id: 'root', component: 'table' }],
        dataModel: {},
      }, empty)).toThrow(/不支持的组件: table/);
    });

    it('rejects set_components after a schema exists', () => {
      expect(() => executeToolCall('set_components', { ...createValidSchema() }, createValidSchema()))
        .toThrow('schema 已存在组件');
    });

    it('rejects style when no style Skill is active', () => {
      expect(() => executeToolCall('set_components', {
        components: [{ id: 'root', component: 'form', style: { color: 'red' } }],
        dataModel: {},
      }, empty)).toThrow(/不能新增 style/);
    });

    it('allows style when a style Skill is active', () => {
      const result = executeToolCall('set_components', {
        components: [
          { id: 'root', component: 'form', style: { color: 'red', gap: 4 }, children: ['submit'] },
          { id: 'submit', component: 'button', label: '提交' },
        ],
        dataModel: {},
      }, empty, { styleEnabled: true });
      expect(result.schema.components[0].style).toEqual({ color: 'red', gap: 4 });
    });
  });

  describe('update_components', () => {
    it('merges an existing component and validates the result', () => {
      const result = executeToolCall('update_components', {
        components: [{ id: 'name-input', placeholder: '请输入姓名' }],
      }, createValidSchema());
      expect(result.schema.components.find(component => component.id === 'name-input')?.placeholder)
        .toBe('请输入姓名');
    });

    it('requires component when adding a component', () => {
      expect(() => executeToolCall('update_components', {
        components: [{ id: 'new-field' }],
      }, createValidSchema())).toThrow('new component new-field missing component field');
    });

    it('rejects updates that make the schema invalid', () => {
      expect(() => executeToolCall('update_components', {
        components: [{ id: 'name-input', component: 'table' }],
      }, createValidSchema())).toThrow(/不支持的组件: table/);
    });

    it('rejects adding style when no style Skill is active', () => {
      expect(() => executeToolCall('update_components', {
        components: [{ id: 'name-input', style: { color: 'red' } }],
      }, createValidSchema())).toThrow(/不能新增 style.*name-input/);
    });

    it('preserves existing style when an update does not touch it', () => {
      const current = createValidSchema();
      current.components.find(component => component.id === 'name-input')!.style = { color: 'red' };
      const result = executeToolCall('update_components', {
        components: [{ id: 'name-input', placeholder: '新的提示' }],
      }, current);
      expect(result.schema.components.find(component => component.id === 'name-input')?.style)
        .toEqual({ color: 'red' });
    });
  });

  describe('remove_components', () => {
    it('prunes children references and keeps a valid schema', () => {
      const schema = createValidSchema();
      schema.components.splice(4, 0, { id: 'hint', component: 'text', content: '请填写真实姓名' });
      schema.components[1].children = ['name-label', 'name-input', 'hint'];
      const result = executeToolCall('remove_components', { ids: ['hint'] }, schema);
      expect(result.schema.components.some(component => component.id === 'hint')).toBe(false);
      expect(result.schema.components.find(component => component.id === 'name-item')?.children)
        .toEqual(['name-label', 'name-input']);
    });

  it('rejects removals that break required label relationships', () => {
    expect(() => executeToolCall('remove_components', { ids: ['name-label'] }, createValidSchema()))
      .toThrow(/必填字段 name-input/);
  });

  it('removes references from condition branches', () => {
    const schema: PageSchema = {
      components: [
        { id: 'root', component: 'form', children: ['conditional-name'] },
        { id: 'conditional-name', component: 'condition', when: true, then: ['name-item'] },
        { id: 'name-item', component: 'box', children: ['name-label', 'name-input'] },
        { id: 'name-label', component: 'text', content: '姓名' },
        { id: 'name-input', component: 'input', value: { path: '/name' } },
      ],
      dataModel: { name: '' },
    };
    const result = executeToolCall('remove_components', {
      ids: ['name-item', 'name-label', 'name-input'],
    }, schema);
    expect(result.schema.components.find(component => component.id === 'conditional-name')?.then).toEqual([]);
  });
  });

  describe('update_data_model', () => {
    it('deep-merges dataModel and keeps bindings valid', () => {
      const current = createValidSchema();
      current.dataModel = { name: '', profile: { active: true } };
      const result = executeToolCall('update_data_model', {
        dataModel: { profile: { score: 5 } },
      }, current);
      expect(result.schema.dataModel).toEqual({ name: '', profile: { active: true, score: 5 } });
    });
  });

  describe('validate_schema', () => {
    it('reports valid Form Edition schemas', () => {
      expect(executeToolCall('validate_schema', {}, createValidSchema()).message).toContain('校验通过');
    });

    it('reports missing bound dataModel fields', () => {
      const schema = createValidSchema();
      schema.dataModel = {};
      expect(executeToolCall('validate_schema', {}, schema).message).toContain('绑定的 dataModel 路径不存在: /name');
    });
  });
});

describe('validateFormSchema', () => {
  it('requires every component to be reachable from root', () => {
    const schema = createValidSchema();
    schema.components.push({ id: 'orphan', component: 'text', content: '孤立节点' });
    expect(validateFormSchema(schema).errors).toContain('组件 orphan 无法从 root 访问');
  });

  it('rejects cycles in children references', () => {
    const schema = createValidSchema();
    schema.components[1].children = ['name-label', 'name-input', 'root'];
    expect(validateFormSchema(schema).errors).toContain('组件 children 不能形成循环引用');
  });

  it('allows relative bindings only inside a repeater', () => {
    const schema: PageSchema = {
      components: [
        { id: 'root', component: 'form', children: ['items'] },
        { id: 'items', component: 'repeater', data: { path: '/items' }, children: ['item'] },
        { id: 'item', component: 'box', children: ['done'] },
        { id: 'done', component: 'checkbox', checked: { path: './done' } },
      ],
      dataModel: { items: [{ done: false }] },
    };
    expect(validateFormSchema(schema).valid).toBe(true);
  });

  it('traverses condition branches as part of the component tree', () => {
    const schema: PageSchema = {
      components: [
        { id: 'root', component: 'form', children: ['conditional-name'] },
        { id: 'conditional-name', component: 'condition', when: true, then: ['name-item'] },
        { id: 'name-item', component: 'box', children: ['name-label', 'name-input'] },
        { id: 'name-label', component: 'text', content: '姓名' },
        {
          id: 'name-input',
          component: 'input',
          value: { path: '/name' },
          rules: [{ required: true, message: '请输入姓名' }],
        },
      ],
      dataModel: { name: '' },
    };
    expect(validateFormSchema(schema).valid).toBe(true);
  });

  it('validates Form control bindings and all action events', () => {
    const schema = createValidSchema();
    schema.components.find(component => component.id === 'name-input')!.disabled = { path: '/nameDisabled' };
    schema.components.push({
      id: 'dialog',
      component: 'modal',
      on_ok: { action: 'not_supported' },
    });
    schema.components[0].children?.push('dialog');
    const errors = validateFormSchema(schema).errors;
    expect(errors).toContain('组件 name-input 绑定的 dataModel 路径不存在: /nameDisabled');
    expect(errors).toContain('组件 dialog.on_ok 使用了未支持的 action: not_supported');
  });

  it('validates post_message actions and their target origin', () => {
    const schema = createValidSchema();
    schema.components.find(component => component.id === 'submit')!.on_tap = {
      action: 'post_message',
      payload: {
        type: 'faui:submitted',
        data: { name: '${$root.name}' },
        targetOrigin: 'https://parent.example.com',
      },
    };
    expect(validateFormSchema(schema).valid).toBe(true);

    const invalid = {
      ...schema,
      components: schema.components.map(component => component.id === 'submit'
        ? { ...component, on_tap: { action: 'post_message', payload: { type: 'faui:submitted', targetOrigin: '*' } } }
        : component),
    };
    expect(validateFormSchema(invalid).errors).toContain(
      '组件 submit.on_tap.payload.targetOrigin 必须是明确的 HTTP(S) origin，不能使用 * 或包含路径',
    );
  });

  it('uses the SDK contract for Condition paths and dynamic property capabilities', () => {
    const schema: PageSchema = {
      components: [
        { id: 'root', component: 'form', children: ['by-when', 'by-match', 'dialog'] },
        { id: 'by-when', component: 'condition', when: { path: '/enabled' }, then: [] },
        { id: 'by-match', component: 'condition', match: { path: '/status' }, cases: {} },
        { id: 'dialog', component: 'modal', open: { path: '/dialogOpen' } },
      ],
      dataModel: { enabled: false, status: 'idle', dialogOpen: false },
    };
    expect(validateFormSchema(schema).valid).toBe(true);

    const invalid = {
      ...schema,
      components: schema.components.map(component => component.id === 'dialog'
        ? { ...component, open: '${$root.dialogOpen}' }
        : component),
    };
    expect(validateFormSchema(invalid).errors).toContain('组件 dialog.open 不支持表达式绑定');
  });

  it('rejects properties not declared by the SDK contract', () => {
    const schema = createValidSchema();
    schema.components.find(component => component.id === 'name-input')!.unknownProp = true;
    expect(validateFormSchema(schema).errors).toContain('组件 name-input 使用了 input 未声明的属性: unknownProp');
  });

  it('validates style values as flat string/number values', () => {
    const schema = createValidSchema();
    schema.components.find(component => component.id === 'name-input')!.style = {
      color: 'red',
      marginTop: 8,
      nested: { color: 'blue' },
    };
    expect(validateFormSchema(schema).errors).toContain(
      '组件 name-input 的 style.nested 值必须是 string 或 number',
    );
  });

  it('requires reciprocal constraints for two bound date pickers', () => {
    const schema: PageSchema = {
      components: [
        { id: 'root', component: 'form', children: ['start-date', 'end-date'] },
        { id: 'start-date', component: 'datepicker', value: { path: '/startDate' } },
        {
          id: 'end-date',
          component: 'datepicker',
          value: { path: '/endDate' },
          disabledDate: { before: { path: '/startDate' } },
        },
      ],
      dataModel: { startDate: null, endDate: null },
    };
    expect(validateFormSchema(schema).errors).toContain(
      '日期字段 end-date 限制不得早于 start-date 时，start-date 也必须限制不得晚于 end-date',
    );

    schema.components[1].disabledDate = { after: { path: '/endDate' } };
    expect(validateFormSchema(schema).valid).toBe(true);
  });
});
