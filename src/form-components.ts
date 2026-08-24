import { FORM_COMPONENT_CONTRACTS } from './form-contracts.generated.js';

/** Form Edition component names derived from faui-sdk's machine-readable contract. */
export const FORM_COMPONENT_NAMES = Object.keys(FORM_COMPONENT_CONTRACTS) as Array<keyof typeof FORM_COMPONENT_CONTRACTS>;

export type FormComponentName = keyof typeof FORM_COMPONENT_CONTRACTS;

const formComponentNameSet = new Set<string>(FORM_COMPONENT_NAMES);

export function isFormComponentName(value: string): value is FormComponentName {
  return formComponentNameSet.has(value);
}
