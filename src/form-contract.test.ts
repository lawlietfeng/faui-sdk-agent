import { describe, expect, it } from 'vitest';
import { buildFormContractPrompt } from './form-contract.js';

describe('buildFormContractPrompt', () => {
  it('projects only the requested components', () => {
    const prompt = buildFormContractPrompt({ components: ['input'], includeStyle: false });
    expect(prompt).toContain('- input:');
    expect(prompt).not.toContain('- select:');
  });

  it('keeps the legacy full-contract export behavior without options', () => {
    const prompt = buildFormContractPrompt();
    expect(prompt).toContain('- input:');
    expect(prompt).toContain('- select:');
  });

  it('hides style from the model projection when style capability is disabled', () => {
    const prompt = buildFormContractPrompt({ components: ['box'], includeStyle: false });
    expect(prompt).not.toMatch(/props=.*\bstyle\b/);
  });

  it('exposes style only when style capability is enabled', () => {
    const prompt = buildFormContractPrompt({ components: ['box'], includeStyle: true });
    expect(prompt).toMatch(/props=.*\bstyle\b/);
    expect(prompt).toContain('属性值只能为 string 或 number');
  });
});
