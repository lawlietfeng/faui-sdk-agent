import { describe, it, expect } from 'vitest';
import type { Message } from '@mariozechner/pi-ai';
import { extractJson, validateSchema, trimMessages } from './agent-loop.js';

describe('extractJson', () => {
  it('extracts JSON from a ```json fenced block', () => {
    const text = 'here you go:\n```json\n{"a": 1}\n```\nthanks';
    expect(extractJson(text)).toBe('{"a": 1}');
  });

  it('extracts from a bare ``` fenced block', () => {
    expect(extractJson('```\n{"a": 1}\n```')).toBe('{"a": 1}');
  });

  it('falls back to the first { ... last } when unfenced', () => {
    expect(extractJson('prefix {"a": 1} suffix')).toBe('{"a": 1}');
  });

  it('returns trimmed text when there is no JSON object', () => {
    expect(extractJson('  no json here  ')).toBe('no json here');
  });
});

describe('validateSchema', () => {
  it('accepts a schema whose components all have id + component', () => {
    expect(validateSchema({ components: [{ id: 'a', component: 'Text' }] })).toBe(true);
  });

  it('rejects non-objects', () => {
    expect(validateSchema(null)).toBe(false);
    expect(validateSchema('x')).toBe(false);
  });

  it('rejects when components is not an array', () => {
    expect(validateSchema({ components: {} })).toBe(false);
  });

  it('rejects a component missing id or component', () => {
    expect(validateSchema({ components: [{ id: 'a' }] })).toBe(false);
    expect(validateSchema({ components: [{ component: 'Text' }] })).toBe(false);
  });
});

describe('trimMessages', () => {
  const msg = (i: number): Message =>
    ({ role: 'user', content: String(i), timestamp: i } as Message);

  it('leaves messages untouched when at or below the cap', () => {
    const messages = [msg(0), msg(1), msg(2)];
    trimMessages(messages, 3);
    expect(messages).toHaveLength(3);
  });

  it('trims from index 2 onward, preserving the first two messages', () => {
    const messages = Array.from({ length: 10 }, (_, i) => msg(i));
    trimMessages(messages, 4);
    // keep = floor(4 * 0.7) = 2; splice(2, 10 - 2) removes 8, leaving the first 2
    expect(messages).toHaveLength(2);
    expect(messages.map((m) => m.content)).toEqual(['0', '1']);
  });
});
