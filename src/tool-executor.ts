import { validateFormSchema } from './form-schema.js';
import type { PageComponent, PageSchema } from './types.js';

interface ToolResult {
  schema: PageSchema;
  message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function validateComponents(args: Record<string, unknown>): PageComponent[] {
  const components = args.components;
  if (!Array.isArray(components)) throw new Error('components must be an array');
  for (const component of components) {
    if (!isRecord(component)) throw new Error('each component must be an object');
    if (typeof component.id !== 'string' || !component.id) {
      throw new Error(`component missing id: ${JSON.stringify(component).slice(0, 80)}`);
    }
    if (typeof component.component !== 'string' || !component.component) {
      throw new Error(`component ${component.id} missing component field`);
    }
  }
  return components as PageComponent[];
}

function validateUpdateComponents(args: Record<string, unknown>, currentSchema: PageSchema): PageComponent[] {
  const components = args.components;
  if (!Array.isArray(components)) throw new Error('components must be an array');
  const existingIds = new Set(currentSchema.components.map(component => component.id));
  for (const component of components) {
    if (!isRecord(component)) throw new Error('each component must be an object');
    if (typeof component.id !== 'string' || !component.id) {
      throw new Error(`component missing id: ${JSON.stringify(component).slice(0, 80)}`);
    }
    if (!existingIds.has(component.id) && (typeof component.component !== 'string' || !component.component)) {
      throw new Error(`new component ${component.id} missing component field`);
    }
  }
  return components as PageComponent[];
}

function validateIds(args: Record<string, unknown>): string[] {
  const ids = args.ids;
  if (!Array.isArray(ids)) throw new Error('ids must be an array');
  for (const id of ids) {
    if (typeof id !== 'string' || !id) throw new Error(`invalid id: ${String(id)}`);
  }
  return ids;
}

function validateDataModel(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) throw new Error('dataModel must be a plain object');
  return value;
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (isRecord(sourceValue) && isRecord(targetValue)) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }
  return result;
}

function ensureValid(schema: PageSchema): PageSchema {
  const validation = validateFormSchema(schema);
  if (!validation.valid) throw new Error(validation.errors.join('\n'));
  return schema;
}

function removeChildReferences(component: PageComponent, ids: Set<string>): PageComponent {
  const result: PageComponent = { ...component };
  if (Array.isArray(result.children)) result.children = result.children.filter(id => !ids.has(id));
  if (result.component !== 'condition') return result;

  for (const key of ['then', 'else', 'default'] as const) {
    if (Array.isArray(result[key])) result[key] = result[key].filter(id => !ids.has(id));
  }
  if (isRecord(result.cases)) {
    const cases: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(result.cases)) {
      cases[key] = Array.isArray(value) ? value.filter(id => !ids.has(id)) : value;
    }
    result.cases = cases;
  }
  return result;
}

export function executeToolCall(toolName: string, args: Record<string, unknown>, currentSchema: PageSchema): ToolResult {
  switch (toolName) {
    case 'set_components': {
      if (currentSchema.components.length > 0) {
        throw new Error('schema 已存在组件；请使用 update_components 进行增量修改');
      }
      const components = validateComponents(args);
      const dataModel = validateDataModel(args.dataModel);
      const schema = ensureValid({ components, dataModel });
      return { schema, message: `Set ${components.length} components and validated schema` };
    }

    case 'update_components': {
      const updates = validateUpdateComponents(args, currentSchema);
      const components = [...currentSchema.components];
      for (const update of updates) {
        const index = components.findIndex(component => component.id === update.id);
        if (index >= 0) {
          components[index] = { ...components[index], ...update };
        } else {
          components.push(update);
        }
      }
      const schema = ensureValid({ ...currentSchema, components });
      return { schema, message: `Updated ${updates.length} components and validated schema` };
    }

    case 'remove_components': {
      const ids = new Set(validateIds(args));
      const components = currentSchema.components
        .filter(component => !ids.has(component.id))
        .map(component => removeChildReferences(component, ids));
      const schema = ensureValid({ ...currentSchema, components });
      return { schema, message: `Removed ${ids.size} components and validated schema` };
    }

    case 'update_data_model': {
      const incoming = validateDataModel(args.dataModel);
      const dataModel = deepMerge(currentSchema.dataModel, incoming);
      const schema = ensureValid({ ...currentSchema, dataModel });
      return { schema, message: `Updated dataModel (${Object.keys(incoming).length} keys) and validated schema` };
    }

    case 'validate_schema': {
      const validation = validateFormSchema(currentSchema);
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
