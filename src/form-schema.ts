import { isFormComponentName } from './form-components.js';
import { getFormComponentContract } from './form-contract.js';
import type { PageComponent } from './types.js';

export interface SchemaValidationResult {
  valid: boolean;
  errors: string[];
}

const BUILTIN_ACTIONS = new Set(['update_data', 'http_proxy', 'message', 'notification']);
type ContractRecord = Record<string, any>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/');
}

function isRelativePath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('./');
}

function isExpression(value: unknown): value is string {
  return typeof value === 'string' && /^\$\{[\s\S]*\}$/.test(value);
}

function primitiveType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function matchesContractSchema(value: unknown, schema: Record<string, unknown> | undefined): boolean {
  if (!schema) return true;
  const types = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (types.length > 0 && !types.includes(primitiveType(value))) return false;
  if (Array.isArray(schema.enum) && !schema.enum.some(item => Object.is(item, value))) return false;
  if (schema.items && Array.isArray(value)) {
    return value.every(item => matchesContractSchema(item, schema.items as Record<string, unknown>));
  }
  return true;
}

function validateStyle(value: unknown, componentId: string, errors: string[]): void {
  if (!isRecord(value)) {
    errors.push(`组件 ${componentId} 的 style 必须是对象`);
    return;
  }
  for (const [property, styleValue] of Object.entries(value)) {
    if (typeof styleValue !== 'string' && typeof styleValue !== 'number') {
      errors.push(`组件 ${componentId} 的 style.${property} 值必须是 string 或 number`);
    }
  }
}

function getDataPath(dataModel: Record<string, unknown>, path: string): unknown {
  const parts = path.slice(1).split('/').map(part => part.replace(/~1/g, '/').replace(/~0/g, '~'));
  let current: unknown = dataModel;
  for (const part of parts) {
    if (!isRecord(current) && !Array.isArray(current)) return undefined;
    current = current[part as keyof typeof current];
  }
  return current;
}

function hasDataPath(dataModel: Record<string, unknown>, path: string): boolean {
  const parts = path.slice(1).split('/').map(part => part.replace(/~1/g, '/').replace(/~0/g, '~'));
  let current: unknown = dataModel;
  for (const part of parts) {
    if (!isRecord(current) && !Array.isArray(current)) return false;
    if (!(part in current)) return false;
    current = current[part as keyof typeof current];
  }
  return true;
}

function getChildIds(component: PageComponent, errors?: string[]): string[] {
  const childIds: string[] = [];
  const addChildren = (value: unknown, location: string): void => {
    if (value === undefined) return;
    if (!Array.isArray(value)) {
      errors?.push(`${location} 必须是数组`);
      return;
    }
    for (const id of value) {
      if (typeof id !== 'string') {
        errors?.push(`${location} 中的组件 ID 必须是字符串`);
      } else {
        childIds.push(id);
      }
    }
  };

  addChildren(component.children, `组件 ${component.id} 的 children`);
  if (component.component !== 'condition') return childIds;

  addChildren(component.then, `condition 组件 ${component.id} 的 then`);
  addChildren(component.else, `condition 组件 ${component.id} 的 else`);
  addChildren(component.default, `condition 组件 ${component.id} 的 default`);

  if (component.cases !== undefined) {
    if (!isRecord(component.cases)) {
      errors?.push(`condition 组件 ${component.id} 的 cases 必须是对象`);
    } else {
      for (const [key, value] of Object.entries(component.cases)) {
        addChildren(value, `condition 组件 ${component.id} 的 cases.${key}`);
      }
    }
  }

  return childIds;
}

function collectDescendants(id: string, byId: Map<string, PageComponent>): Set<string> {
  const result = new Set<string>();
  const visit = (componentId: string): void => {
    const component = byId.get(componentId);
    if (!component || result.has(componentId)) return;
    result.add(componentId);
    for (const childId of getChildIds(component)) visit(childId);
  };
  visit(id);
  return result;
}

function hasCycle(rootId: string, byId: Map<string, PageComponent>): boolean {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const visit = (id: string): boolean => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visited.add(id);
    visiting.add(id);
    const component = byId.get(id);
    for (const childId of component ? getChildIds(component) : []) {
      if (visit(childId)) return true;
    }
    visiting.delete(id);
    return false;
  };
  return visit(rootId);
}

function isRequiredField(component: PageComponent): boolean {
  return Array.isArray(component.rules)
    && component.rules.some(rule => isRecord(rule) && rule.required === true);
}

function validateAction(action: unknown, location: string, errors: string[], allowRelativePath: boolean): void {
  if (Array.isArray(action)) {
    action.forEach((item, index) => validateAction(item, `${location}[${index}]`, errors, allowRelativePath));
    return;
  }
  if (!isRecord(action)) {
    errors.push(`${location} 必须是 action 对象或 action 数组`);
    return;
  }
  if (typeof action.action !== 'string' || !BUILTIN_ACTIONS.has(action.action)) {
    errors.push(`${location} 使用了未支持的 action: ${String(action.action)}`);
    return;
  }

  if (action.action === 'update_data' && !isPath(action.path) && !(allowRelativePath && isRelativePath(action.path))) {
    errors.push(`${location}.path 必须是以 / 开头的 JSON Pointer`);
  }

  if (action.action === 'http_proxy') {
    if (!isRecord(action.payload) || !isRecord(action.payload.http_config)) {
      errors.push(`${location}.payload.http_config 必填`);
    } else {
      const config = action.payload.http_config;
      if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(String(config.method))) {
        errors.push(`${location}.payload.http_config.method 无效`);
      }
      if (!isPath(config.path)) {
        errors.push(`${location}.payload.http_config.path 必须以 / 开头`);
      }
    }
  }

  if (action.action === 'message' && (!isRecord(action.payload) || action.payload.content === undefined)) {
    errors.push(`${location}.payload.content 必填`);
  }

  if (action.action === 'notification'
    && (!isRecord(action.payload) || (action.payload.message === undefined && action.payload.description === undefined))) {
    errors.push(`${location}.payload.message 或 payload.description 必填`);
  }

  if (action.on_success !== undefined) validateAction(action.on_success, `${location}.on_success`, errors, allowRelativePath);
  if (action.on_error !== undefined) validateAction(action.on_error, `${location}.on_error`, errors, allowRelativePath);
}

function isInsideRepeater(id: string, parentIds: Map<string, string[]>, byId: Map<string, PageComponent>): boolean {
  let currentId = id;
  const visited = new Set<string>();
  while (true) {
    if (visited.has(currentId)) return false;
    visited.add(currentId);
    const parentId = parentIds.get(currentId)?.[0];
    if (!parentId) return false;
    if (byId.get(parentId)?.component === 'repeater') return true;
    currentId = parentId;
  }
}

function validatePathBinding(
  component: PageComponent,
  binding: unknown,
  property: string,
  dataModel: Record<string, unknown>,
  allowRelativePath: boolean,
  errors: string[],
): void {
  if (!isRecord(binding) || Object.keys(binding).some(key => key !== 'path')
    || (!isPath(binding.path) && !(allowRelativePath && isRelativePath(binding.path)))) {
    errors.push(`组件 ${component.id} 的 ${property}.path 必须是以 / 开头的 JSON Pointer`);
    return;
  }
  if (isPath(binding.path) && !hasDataPath(dataModel, binding.path)) {
    errors.push(`组件 ${component.id} 绑定的 dataModel 路径不存在: ${binding.path}`);
  }
}

function validateContractProperties(
  component: PageComponent,
  dataModel: Record<string, unknown>,
  parentIds: Map<string, string[]>,
  byId: Map<string, PageComponent>,
  errors: string[],
): void {
  const contract = getFormComponentContract(component.component);
  if (!contract) return;

  const allowedProps = new Set<string>(contract.allowedProps);
  for (const property of Object.keys(component)) {
    if (!allowedProps.has(property)) {
      errors.push(`组件 ${component.id} 使用了 ${component.component} 未声明的属性: ${property}`);
    }
  }

  const allowRelativePath = isInsideRepeater(component.id, parentIds, byId);
  for (const [property, value] of Object.entries(component)) {
    if (value === undefined) continue;
    if (property === 'style') {
      validateStyle(value, component.id, errors);
      continue;
    }
    const propertyContract = contract.properties?.[property];
    const bindings = propertyContract?.bindings;
    if (!bindings) continue;

    if (isRecord(value) && 'path' in value) {
      if (!bindings.accepts.includes('path')) {
        errors.push(`组件 ${component.id}.${property} 不支持 path 绑定`);
        continue;
      }
      if (bindings.pathScope === 'root' && isRelativePath(value.path)) {
        errors.push(`组件 ${component.id}.${property}.path 不允许 Repeater 相对路径`);
        continue;
      }
      validatePathBinding(component, value, property, dataModel, allowRelativePath, errors);
      continue;
    }

    if (isRecord(value)) {
      errors.push(`组件 ${component.id}.${property} 的动态值必须是 { path } 绑定或契约允许的静态值`);
      continue;
    }

    if (isExpression(value) && !bindings.accepts.includes('expression')) {
      errors.push(`组件 ${component.id}.${property} 不支持表达式绑定`);
    } else if (!isExpression(value) && !matchesContractSchema(value, propertyContract?.schema)) {
      errors.push(`组件 ${component.id}.${property} 的静态值类型不符合 Form Component Contract`);
    }
  }

  const dataBinding = contract.dataModelBinding;
  if (dataBinding) {
    const binding = component[dataBinding.prop];
    if (isRecord(binding) && isPath(binding.path)) {
      const current = getDataPath(dataModel, binding.path);
      const allowedTypes = dataBinding.valueTypes ?? [];
      const variant = (dataBinding.variants ?? []).find((item: ContractRecord) => (
        item.when?.prop && Object.prototype.hasOwnProperty.call(component, item.when.prop) === item.when.present
      ));
      const expectedTypes = variant?.valueTypes ?? allowedTypes;
      if (current !== undefined && !expectedTypes.includes(primitiveType(current))) {
        errors.push(`组件 ${component.id} 绑定的 ${dataBinding.prop} 数据类型不符合 Form Component Contract`);
      }
    }
  }

  const children = component.children;
  if (children !== undefined && contract.childrenMode === 'none') {
    errors.push(`组件 ${component.id} (${component.component}) 不允许配置 children`);
  }
  if (component.component === 'upload' && Array.isArray(children)) {
    for (const childId of children) {
      const child = byId.get(childId);
      if (child && child.component !== 'button') {
        errors.push(`upload 组件 ${component.id} 的 children 只能引用 button: ${childId}`);
      }
    }
  }

  if (component.component === 'condition') {
    if (children !== undefined) errors.push(`condition 组件 ${component.id} 不使用 children`);
    const hasWhen = component.when !== undefined;
    const hasMatch = component.match !== undefined;
    if (hasWhen === hasMatch) {
      errors.push(`condition 组件 ${component.id} 必须且只能选择 when 或 match 模式`);
    } else if (hasWhen) {
      if (!Array.isArray(component.then)) {
        errors.push(`condition 组件 ${component.id} 的 when 模式必须提供 then 数组`);
      }
      if (component.cases !== undefined) errors.push(`condition 组件 ${component.id} 的 when 模式不能配置 cases`);
      if (component.else !== undefined && component.default !== undefined) {
        errors.push(`condition 组件 ${component.id} 的 else 与 default 不能同时配置`);
      }
    } else {
      if (!isRecord(component.cases)) {
        errors.push(`condition 组件 ${component.id} 的 match 模式必须提供 cases 对象`);
      }
      if (component.then !== undefined || component.else !== undefined) {
        errors.push(`condition 组件 ${component.id} 的 match 模式不能配置 then 或 else`);
      }
    }
  }

  if (component.component === 'skeleton' && component.skeletonType !== undefined
    && (component.children !== undefined || component.loading !== undefined || component.visible !== undefined)) {
    errors.push(`skeleton 组件 ${component.id} 配置 skeletonType 时不能同时配置 children、loading 或 visible`);
  }
}

function validateBindings(
  component: PageComponent,
  dataModel: Record<string, unknown>,
  parentIds: Map<string, string[]>,
  byId: Map<string, PageComponent>,
  errors: string[],
): void {
  const allowRelativePath = isInsideRepeater(component.id, parentIds, byId);
  for (const key of ['value', 'checked'] as const) {
    const binding = component[key];
    if (binding === undefined) continue;
    validatePathBinding(component, binding, key, dataModel, allowRelativePath, errors);
  }

  for (const key of ['visible', 'disabled'] as const) {
    const binding = component[key];
    if (binding !== undefined && isRecord(binding) && 'path' in binding) {
      validatePathBinding(component, binding, key, dataModel, allowRelativePath, errors);
    }
  }

  if (component.component === 'repeater' && component.data !== undefined) {
    validatePathBinding(component, component.data, 'data', dataModel, allowRelativePath, errors);
  }

  if (component.component === 'datepicker' && isRecord(component.disabledDate)) {
    for (const key of ['before', 'after'] as const) {
      const binding = component.disabledDate[key];
      if (binding !== undefined) {
        validatePathBinding(component, binding, `disabledDate.${key}`, dataModel, allowRelativePath, errors);
      }
    }
  }

  for (const [key, value] of Object.entries(component)) {
    if (key.startsWith('on_') && value !== undefined) {
      validateAction(value, `组件 ${component.id}.${key}`, errors, allowRelativePath);
    }
  }
}

function getAbsoluteBindingPath(value: unknown): string | undefined {
  return isRecord(value) && isPath(value.path) ? value.path : undefined;
}

function validateDateRangePairs(byId: Map<string, PageComponent>, errors: string[]): void {
  const datePickersByPath = new Map<string, PageComponent>();
  for (const component of byId.values()) {
    if (component.component !== 'datepicker') continue;
    const path = getAbsoluteBindingPath(component.value);
    if (path) datePickersByPath.set(path, component);
  }

  for (const component of datePickersByPath.values()) {
    if (!isRecord(component.disabledDate)) continue;
    const ownPath = getAbsoluteBindingPath(component.value)!;
    const beforePath = getAbsoluteBindingPath(component.disabledDate.before);
    const afterPath = getAbsoluteBindingPath(component.disabledDate.after);

    if (beforePath) {
      const startPicker = datePickersByPath.get(beforePath);
      const reciprocalAfterPath = startPicker && isRecord(startPicker.disabledDate)
        ? getAbsoluteBindingPath(startPicker.disabledDate.after)
        : undefined;
      if (startPicker && reciprocalAfterPath !== ownPath) {
        errors.push(`日期字段 ${component.id} 限制不得早于 ${startPicker.id} 时，${startPicker.id} 也必须限制不得晚于 ${component.id}`);
      }
    }

    if (afterPath) {
      const endPicker = datePickersByPath.get(afterPath);
      const reciprocalBeforePath = endPicker && isRecord(endPicker.disabledDate)
        ? getAbsoluteBindingPath(endPicker.disabledDate.before)
        : undefined;
      if (endPicker && reciprocalBeforePath !== ownPath) {
        errors.push(`日期字段 ${component.id} 限制不得晚于 ${endPicker.id} 时，${endPicker.id} 也必须限制不得早于 ${component.id}`);
      }
    }
  }
}

export function validateFormSchema(schema: unknown): SchemaValidationResult {
  const errors: string[] = [];
  if (!isRecord(schema)) return { valid: false, errors: ['Schema 必须是对象'] };
  if (!Array.isArray(schema.components)) return { valid: false, errors: ['components 必须是数组'] };
  if (!isRecord(schema.dataModel)) return { valid: false, errors: ['dataModel 必须是对象'] };

  const components = schema.components as PageComponent[];
  const byId = new Map<string, PageComponent>();
  const parentIds = new Map<string, string[]>();

  for (const component of components) {
    if (!isRecord(component)) {
      errors.push('components 中的每项必须是对象');
      continue;
    }
    if (typeof component.id !== 'string' || !component.id) {
      errors.push(`组件缺少 id: ${JSON.stringify(component).slice(0, 50)}`);
      continue;
    }
    if (typeof component.component !== 'string' || !component.component) {
      errors.push(`组件 ${component.id} 缺少 component 字段`);
    } else if (!isFormComponentName(component.component)) {
      errors.push(`组件 ${component.id} 使用了 Form Edition 不支持的组件: ${component.component}`);
    }
    if (byId.has(component.id)) {
      errors.push(`重复 ID: ${component.id}`);
    } else {
      byId.set(component.id, component);
    }
  }

  const root = byId.get('root');
  if (!root) errors.push('必须存在 id 为 root 的根组件');

  for (const component of byId.values()) {
    const childIds = getChildIds(component, errors);
    if (new Set(childIds).size !== childIds.length) {
      errors.push(`组件 ${component.id} 的 children 包含重复引用`);
    }
    for (const childId of childIds) {
      if (typeof childId !== 'string' || !byId.has(childId)) {
        errors.push(`${component.id} 引用了不存在的子组件: ${String(childId)}`);
        continue;
      }
      const parents = parentIds.get(childId) ?? [];
      parents.push(component.id);
      parentIds.set(childId, parents);
    }
  }

  if (root && (parentIds.get('root')?.length ?? 0) > 0) {
    errors.push('root 不能被其他组件引用');
  }
  for (const [id, parents] of parentIds) {
    if (id !== 'root' && parents.length > 1) {
      errors.push(`组件 ${id} 被多个父组件引用`);
    }
  }
  if (root) {
    const reachable = collectDescendants('root', byId);
    for (const id of byId.keys()) {
      if (!reachable.has(id)) errors.push(`组件 ${id} 无法从 root 访问`);
    }
    if (hasCycle('root', byId)) errors.push('组件 children 不能形成循环引用');
  }

  const formIds = [...byId.values()]
    .filter(component => component.component === 'form')
    .map(component => component.id);
  if (formIds.length === 0) errors.push('Form Edition Schema 必须包含 form 组件');

  for (const formId of formIds) {
    const form = byId.get(formId)!;
    if (Array.isArray(form.rules) && form.rules.length > 0) {
      errors.push(`form 组件 ${formId} 不应配置 rules；请写在具体字段上`);
    }
    if (form.submitButtonId !== undefined) {
      if (typeof form.submitButtonId !== 'string') {
        errors.push(`form 组件 ${formId} 的 submitButtonId 必须是字符串`);
      } else {
        const button = byId.get(form.submitButtonId);
        if (!button || button.component !== 'button') {
          errors.push(`form 组件 ${formId} 的 submitButtonId 未指向 button: ${form.submitButtonId}`);
        } else if (!collectDescendants(formId, byId).has(button.id)) {
          errors.push(`form 组件 ${formId} 的提交按钮不在表单内: ${button.id}`);
        }
      }
    }
  }

  for (const component of byId.values()) {
    validateContractProperties(component, schema.dataModel as Record<string, unknown>, parentIds, byId, errors);
    validateBindings(component, schema.dataModel as Record<string, unknown>, parentIds, byId, errors);
    if (!isRequiredField(component)) continue;

    const parentId = (parentIds.get(component.id) ?? [])[0];
    const parent = parentId ? byId.get(parentId) : undefined;
    const index = parent?.children?.indexOf(component.id) ?? -1;
    const labelId = index > 0 ? parent?.children?.[index - 1] : undefined;
    const label = labelId ? byId.get(labelId) : undefined;
    const insideForm = formIds.some(formId => collectDescendants(formId, byId).has(component.id));
    if (!insideForm || !label || label.component !== 'text' || (parentIds.get(label.id)?.length ?? 0) !== 1) {
      errors.push(`必填字段 ${component.id} 前必须有同一父级且未复用的 text 标签`);
    }
  }

  validateDateRangePairs(byId, errors);

  return { valid: errors.length === 0, errors };
}
