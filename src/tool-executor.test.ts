import { describe, it, expect } from 'vitest';
import { executeToolCall } from './tool-executor.js';
import type { PageSchema } from './types.js';

const empty: PageSchema = { components: [] };

describe('executeToolCall', () => {
  describe('set_components', () => {
    it('sets components and optional dataModel', () => {
      const res = executeToolCall(
        'set_components',
        { components: [{ id: 'a', component: 'Text' }], dataModel: { x: 1 } },
        empty,
      );
      expect(res.schema.components).toHaveLength(1);
      expect(res.schema.dataModel).toEqual({ x: 1 });
      expect(res.message).toContain('Set 1 components');
    });

    it('rejects a non-array components arg', () => {
      expect(() =>
        executeToolCall('set_components', { components: 'nope' }, empty),
      ).toThrow('components must be an array');
    });

    it('rejects a component missing an id', () => {
      expect(() =>
        executeToolCall('set_components', { components: [{ component: 'Text' }] }, empty),
      ).toThrow(/missing id/);
    });

    it('rejects a component missing the component field', () => {
      expect(() =>
        executeToolCall('set_components', { components: [{ id: 'a' }] }, empty),
      ).toThrow(/missing component field/);
    });

    it('blocks a destructive replace that drops >30% of existing components', () => {
      const current: PageSchema = {
        components: [
          { id: 'a', component: 'Text' },
          { id: 'b', component: 'Text' },
          { id: 'c', component: 'Text' },
        ],
      };
      // replacing 3 with 1 keeps 0 of the originals -> way over the 30% threshold
      expect(() =>
        executeToolCall('set_components', { components: [{ id: 'z', component: 'Text' }] }, current),
      ).toThrow(/会丢失/);
    });
  });

  describe('update_components', () => {
    it('merges fields into an existing component and appends new ones', () => {
      const current: PageSchema = { components: [{ id: 'a', component: 'Text', props: { v: 1 } }] };
      const res = executeToolCall(
        'update_components',
        { components: [{ id: 'a', props: { v: 2 } }, { id: 'b', component: 'Button' }] },
        current,
      );
      const byId = Object.fromEntries(res.schema.components.map((c) => [c.id, c]));
      expect(byId.a.props).toEqual({ v: 2 });
      expect(byId.a.component).toBe('Text'); // preserved
      expect(byId.b.component).toBe('Button'); // appended
    });
  });

  describe('remove_components', () => {
    it('removes components and prunes dangling child references', () => {
      const current: PageSchema = {
        components: [
          { id: 'parent', component: 'Box', children: ['a', 'b'] },
          { id: 'a', component: 'Text' },
          { id: 'b', component: 'Text' },
        ],
      };
      const res = executeToolCall('remove_components', { ids: ['a'] }, current);
      const ids = res.schema.components.map((c) => c.id);
      expect(ids).not.toContain('a');
      const parent = res.schema.components.find((c) => c.id === 'parent')!;
      expect(parent.children).toEqual(['b']);
    });
  });

  describe('update_data_model', () => {
    it('deep-merges into the existing dataModel', () => {
      const current: PageSchema = { components: [], dataModel: { a: { x: 1 }, keep: true } };
      const res = executeToolCall('update_data_model', { dataModel: { a: { y: 2 } } }, current);
      expect(res.schema.dataModel).toEqual({ a: { x: 1, y: 2 }, keep: true });
    });

    it('rejects a non-object dataModel', () => {
      expect(() =>
        executeToolCall('update_data_model', { dataModel: [1, 2] }, empty),
      ).toThrow('dataModel must be a plain object');
    });
  });

  describe('validate_schema', () => {
    it('passes a well-formed schema', () => {
      const current: PageSchema = {
        components: [
          { id: 'root', component: 'Box', children: ['child'] },
          { id: 'child', component: 'Text' },
        ],
      };
      const res = executeToolCall('validate_schema', {}, current);
      expect(res.message).toContain('校验通过');
    });

    it('reports duplicate IDs', () => {
      const current: PageSchema = {
        components: [
          { id: 'dup', component: 'Text' },
          { id: 'dup', component: 'Text' },
        ],
      };
      const res = executeToolCall('validate_schema', {}, current);
      expect(res.message).toContain('重复 ID: dup');
    });

    it('reports a child reference to a non-existent component', () => {
      const current: PageSchema = {
        components: [{ id: 'root', component: 'Box', children: ['ghost'] }],
      };
      const res = executeToolCall('validate_schema', {}, current);
      expect(res.message).toContain('不存在的子组件: ghost');
    });
  });

  it('throws on an unknown tool name', () => {
    expect(() => executeToolCall('frobnicate', {}, empty)).toThrow('Unknown tool: frobnicate');
  });
});
