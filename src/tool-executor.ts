import type { PageComponent, PageSchema } from './types.js';

interface ToolResult {
  schema: PageSchema;
  message: string;
}

function validateComponents(args: Record<string, unknown>): PageComponent[] {
  const components = args.components;
  if (!Array.isArray(components)) throw new Error('components must be an array');
  for (const comp of components) {
    if (!comp || typeof comp !== 'object') throw new Error('each component must be an object');
    if (typeof comp.id !== 'string' || !comp.id) throw new Error(`component missing id: ${JSON.stringify(comp).slice(0, 80)}`);
    if (typeof comp.component !== 'string' || !comp.component) throw new Error(`component ${comp.id} missing component field`);
  }
  return components as PageComponent[];
}

function validateUpdateComponents(args: Record<string, unknown>): PageComponent[] {
  const components = args.components;
  if (!Array.isArray(components)) throw new Error('components must be an array');
  for (const comp of components) {
    if (!comp || typeof comp !== 'object') throw new Error('each component must be an object');
    if (typeof comp.id !== 'string' || !comp.id) throw new Error(`component missing id: ${JSON.stringify(comp).slice(0, 80)}`);
  }
  return components as PageComponent[];
}

function validateIds(args: Record<string, unknown>): string[] {
  const ids = args.ids;
  if (!Array.isArray(ids)) throw new Error('ids must be an array');
  for (const id of ids) {
    if (typeof id !== 'string') throw new Error(`invalid id: ${id}`);
  }
  return ids;
}

function validateDataModel(args: Record<string, unknown>): Record<string, unknown> {
  const dm = args.dataModel;
  if (!dm || typeof dm !== 'object' || Array.isArray(dm)) throw new Error('dataModel must be a plain object');
  return dm as Record<string, unknown>;
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (sv && tv && typeof sv === 'object' && typeof tv === 'object' && !Array.isArray(sv) && !Array.isArray(tv)) {
      result[key] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else {
      result[key] = sv;
    }
  }
  return result;
}

function validateSchema(schema: PageSchema): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const ids = new Set<string>();
  const idToComp = new Map<string, PageComponent>();

  for (const comp of schema.components) {
    if (!comp.id) {
      errors.push(`组件缺少 id: ${JSON.stringify(comp).slice(0, 50)}`);
      continue;
    }
    if (!comp.component) {
      errors.push(`组件 ${comp.id} 缺少 component 字段`);
    }
    if (ids.has(comp.id)) {
      errors.push(`重复 ID: ${comp.id}`);
    }
    ids.add(comp.id);
    idToComp.set(comp.id, comp);
  }

  for (const comp of schema.components) {
    if (comp.children && Array.isArray(comp.children)) {
      for (const childId of comp.children) {
        if (!ids.has(childId)) {
          errors.push(`${comp.id} 引用了不存在的子组件: ${childId}`);
        }
      }
    }
  }

  const referenced = new Set<string>();
  for (const comp of schema.components) {
    if (comp.children) {
      comp.children.forEach((id) => referenced.add(id));
    }
  }
  const roots = [...ids].filter((id) => !referenced.has(id));
  if (roots.length === 0 && schema.components.length > 0) {
    errors.push('未找到根组件（所有组件都被引用，可能存在循环）');
  }

  return { valid: errors.length === 0, errors };
}

export function executeToolCall(toolName: string, args: Record<string, unknown>, currentSchema: PageSchema): ToolResult {
  switch (toolName) {
    case 'set_components': {
      const components = validateComponents(args);
      const dataModel = args.dataModel ? validateDataModel(args) : undefined;

      if (currentSchema.components.length > 0) {
        const existingIds = new Set(currentSchema.components.map(c => c.id));
        const newIds = new Set(components.map(c => c.id));
        const lostIds = [...existingIds].filter(id => !newIds.has(id));

        if (lostIds.length > existingIds.size * 0.3) {
          throw new Error(
            `set_components 会丢失 ${lostIds.length} 个组件（${lostIds.slice(0, 5).join(', ')}${lostIds.length > 5 ? '...' : ''}）。` +
            `请使用 update_components 做增量修改，不要整体替换！`
          );
        }
      }

      return {
        schema: { components, dataModel },
        message: `Set ${components.length} components`,
      };
    }

    case 'update_components': {
      const updates = validateUpdateComponents(args);
      const existing = [...currentSchema.components];
      for (const comp of updates) {
        const idx = existing.findIndex((c) => c.id === comp.id);
        if (idx >= 0) {
          existing[idx] = { ...existing[idx], ...comp };
        } else {
          existing.push(comp);
        }
      }
      return {
        schema: { ...currentSchema, components: existing },
        message: `Updated ${updates.length} components`,
      };
    }

    case 'remove_components': {
      const ids = new Set(validateIds(args));
      const filtered = currentSchema.components
        .filter((c) => !ids.has(c.id))
        .map((c) => {
          if (c.children) {
            const cleaned = c.children.filter((id) => !ids.has(id));
            return { ...c, children: cleaned.length > 0 ? cleaned : undefined };
          }
          return c;
        });
      return {
        schema: { ...currentSchema, components: filtered },
        message: `Removed ${ids.size} components`,
      };
    }

    case 'update_data_model': {
      const incoming = validateDataModel(args);
      const merged = deepMerge(currentSchema.dataModel ?? {}, incoming);
      return {
        schema: { ...currentSchema, dataModel: merged },
        message: `Updated dataModel (${Object.keys(incoming).length} keys)`,
      };
    }

    case 'validate_schema': {
      const validation = validateSchema(currentSchema);
      return {
        schema: currentSchema,
        message: validation.valid
          ? '✅ Schema 校验通过'
          : `❌ 发现 ${validation.errors.length} 个错误：\n${validation.errors.join('\n')}`,
      };
    }

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
