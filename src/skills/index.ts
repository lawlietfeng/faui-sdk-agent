import type { SkillDef } from '../skill-store.js';
import { componentCatalogSkill } from './component-catalog.js';
import { layoutPatternsSkill } from './layout-patterns.js';
import { dataBindingSkill } from './data-binding.js';
import { pitfallsSkill } from './pitfalls.js';

export const builtinSkills: SkillDef[] = [
  componentCatalogSkill,
  layoutPatternsSkill,
  dataBindingSkill,
  pitfallsSkill,
];
