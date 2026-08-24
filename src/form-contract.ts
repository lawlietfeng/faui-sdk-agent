import { FORM_COMPONENT_CONTRACTS, FORM_COMPONENT_CONTRACT_VERSION, FORM_SCHEMA_CONTRACT } from './form-contracts.generated.js';

export { FORM_COMPONENT_CONTRACTS, FORM_COMPONENT_CONTRACT_VERSION, FORM_SCHEMA_CONTRACT } from './form-contracts.generated.js';

type ContractRecord = Record<string, any>;

/** Options controlling the model-facing projection of the Form contract. */
export interface FormContractPromptOptions {
  /** Components to include. Omit to preserve the legacy full-contract output. */
  components?: readonly string[];
  /** Whether the style property should be exposed to the model. */
  includeStyle?: boolean;
}

/** A compact directory that lets the model discover Form components by name. */
export const FORM_COMPONENT_CATALOG_PROMPT = `## Form Edition component directory
- 结构：box、flex、grid、row、col、space、layout、header、sider、content、footer、divider、form
- 字段：input、textarea、inputnumber、select、radio、checkbox、switch、datepicker、timepicker、upload、slider、rate、cascader、treeselect、colorpicker、transfer、autocomplete、mentions、calendar、segmented
- 展示：text、icon、typography、alert、tag、spin、skeleton、progress
- 交互与动态：modal、drawer、tooltip、popover、popconfirm、condition、repeater
未注入某组件的完整契约时，先使用 get_component_contracts 查询；不得猜测组件名或属性。`;

const contracts = FORM_COMPONENT_CONTRACTS as ContractRecord;
const schemaContract = FORM_SCHEMA_CONTRACT as ContractRecord;

export function getFormComponentContract(component: string): ContractRecord | undefined {
  return contracts[component];
}

function formatBinding(binding: ContractRecord): string {
  const accepts = Array.isArray(binding.accepts) ? binding.accepts.join(' | ') : '';
  const scope = binding.pathScope ? `, pathScope=${binding.pathScope}` : '';
  const mode = binding.expressionMode ? `, expressionMode=${binding.expressionMode}` : '';
  return `${accepts}${scope}${mode}`;
}

/**
 * Compact model-facing projection of the SDK contract. The generated contract
 * remains the source of truth; this is only a prompt serialization of it.
 */
export function buildFormContractPrompt(options: FormContractPromptOptions = {}): string {
  const includeStyle = options.includeStyle ?? true;
  const requested = options.components ? new Set(options.components) : undefined;
  const selectedNames = Object.keys(contracts).filter((name) => !requested || requested.has(name));
  const lines = [
    `## Form Edition component contract (faui-sdk contract v${FORM_COMPONENT_CONTRACT_VERSION})`,
    '组件名、允许属性、children 模式、动态属性和绑定属性必须以以下契约为准；未列出的属性不要生成。',
  ];

  if (includeStyle) {
    lines.push('style 可用于当前列出的组件：必须是 React 行内样式对象，属性值只能为 string 或 number。');
  }

  for (const name of selectedNames) {
    const contract = contracts[name];
    const properties = (contract.properties ?? {}) as Record<string, ContractRecord>;
    const dynamic = Object.entries(properties)
      .filter(([, property]) => property?.bindings)
      .map(([property, value]) => `${property}[${formatBinding(value.bindings)}]`);
    const binding = contract.dataModelBinding
      ? `dataModel=${contract.dataModelBinding.prop}(${(contract.dataModelBinding.valueTypes ?? []).join('|')})`
      : '';
    const dependencies = (contract.dependencies ?? [])
      .map((dependency: ContractRecord) => dependency.message ?? `${dependency.when ?? ''} requires ${dependency.requires ?? ''}`)
      .filter(Boolean);
    const allowedProps = (contract.allowedProps as string[]).filter((property) => includeStyle || property !== 'style');
    lines.push(`- ${name}: children=${contract.childrenMode}; props=${allowedProps.join(', ')}`);
    if (dynamic.length > 0) lines.push(`  dynamic: ${dynamic.join('; ')}`);
    if (binding) lines.push(`  ${binding}`);
    if (dependencies.length > 0) lines.push(`  dependencies: ${dependencies.join(' | ')}`);
    if (contract.deprecated) lines.push(`  deprecated: ${Object.keys(contract.deprecated).join(', ')}`);
  }

  lines.push(
    `表达式上下文：${schemaContract.expressions.pureContexts.join('、')}；动作额外允许 ${schemaContract.expressions.actionContexts.at(-1)}。`,
    `根路径以 / 开头；${schemaContract.paths.repeaterRelative.prefix} 仅用于 Repeater 模板子组件；路径对象只能包含 path。`,
    '绑定字段必须在 dataModel 中提供初始值；不要把 JSON Pointer 写进表达式字符串。',
  );
  return lines.join('\n');
}

/**
 * Legacy full-contract prompt kept for callers that imported it directly.
 * New integrations should use buildFormContractPrompt({ components, includeStyle }).
 */
/** @deprecated Use buildFormContractPrompt({ components }) for new integrations. */
export const FORM_CONTRACT_PROMPT = buildFormContractPrompt();
