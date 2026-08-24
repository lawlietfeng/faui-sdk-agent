import { FORM_COMPONENT_CONTRACTS, FORM_COMPONENT_CONTRACT_VERSION, FORM_SCHEMA_CONTRACT } from './form-contracts.generated.js';

export { FORM_COMPONENT_CONTRACTS, FORM_COMPONENT_CONTRACT_VERSION, FORM_SCHEMA_CONTRACT } from './form-contracts.generated.js';

type ContractRecord = Record<string, any>;

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
export function buildFormContractPrompt(): string {
  const lines = [
    `## Form Edition component contract (faui-sdk contract v${FORM_COMPONENT_CONTRACT_VERSION})`,
    '组件名、允许属性、children 模式、动态属性和绑定属性必须以以下契约为准；未列出的属性不要生成。',
  ];

  for (const name of Object.keys(contracts)) {
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
    lines.push(`- ${name}: children=${contract.childrenMode}; props=${contract.allowedProps.join(', ')}`);
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

export const FORM_CONTRACT_PROMPT = buildFormContractPrompt();
