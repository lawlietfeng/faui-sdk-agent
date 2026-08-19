import { actionsSkill } from './actions.js';
import { dynamicFormSkill } from './dynamic-form.js';
import { fieldAdvancedSkill } from './field-advanced.js';
import { fieldChoiceSkill } from './field-choice.js';
import { fieldDateSkill } from './field-date.js';
import { fieldTextSkill } from './field-text.js';
import { formCoreSkill } from './form-core.js';
import { formLayoutSkill } from './form-layout.js';
import { validationSubmitSkill } from './validation-submit.js';

export const builtinSkills = [
  formCoreSkill,
  formLayoutSkill,
  fieldTextSkill,
  fieldChoiceSkill,
  fieldDateSkill,
  fieldAdvancedSkill,
  validationSubmitSkill,
  actionsSkill,
  dynamicFormSkill,
];
