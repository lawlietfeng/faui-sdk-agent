import { describe, it, expect } from 'vitest';
import { extractJson, runAgentLoopWithTools, validateSchema, trimMessages } from './agent-loop.js';
import type { OpenAIResponsesMessage } from './openai-responses-provider.js';

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
  const msg = (i: number): OpenAIResponsesMessage =>
    ({ role: 'user', content: String(i), timestamp: i });

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
    expect(messages.map((message) => message.role === 'user' || message.role === 'assistant' ? message.content : '')).toEqual(['0', '1']);
  });
});

describe('runAgentLoopWithTools', () => {
  it('replays a function call and returns its result using the same call_id', async () => {
    const originalFetch = globalThis.fetch;
    const requestBodies: Array<Record<string, unknown>> = [];
    const encoder = new TextEncoder();
    let callCount = 0;

    globalThis.fetch = (async (_input, init) => {
      requestBodies.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      callCount++;
      const events = callCount === 1
        ? [
            'event: response.function_call_arguments.done\n',
            'data: {"item_id":"item_1","call_id":"call_1","name":"set_components","arguments":"{\\"components\\":[{\\"id\\":\\"root\\",\\"component\\":\\"Form\\"}],\\"dataModel\\":{}}"}\n\n',
            'event: response.completed\n',
            'data: {"response":{"output":[{"type":"function_call","call_id":"call_1","name":"set_components","arguments":"{\\"components\\":[{\\"id\\":\\"root\\",\\"component\\":\\"Form\\"}],\\"dataModel\\":{}}"}]}}\n\n',
          ]
        : [
            'event: response.completed\n',
            'data: {"response":{"output":[{"type":"message","role":"assistant","content":[]}]}}\n\n',
          ];
      return new Response(new ReadableStream<Uint8Array>({
        start(controller) {
          for (const event of events) controller.enqueue(encoder.encode(event));
          controller.close();
        },
      }));
    }) as typeof fetch;

    try {
      const events = [];
      for await (const event of runAgentLoopWithTools({
        prompt: '生成一个表单',
        config: {
          apiKey: 'test-key',
          systemPrompt: 'system',
          provider: 'openai',
          useTools: true,
        },
      })) {
        events.push(event);
      }

      expect(events).toContainEqual({ type: 'tool_use', name: 'set_components' });
      expect(events).toContainEqual({
        type: 'schema_updated',
        schema: { components: [{ id: 'root', component: 'Form' }], dataModel: {} },
      });
      expect(events.at(-1)).toMatchObject({
        type: 'done',
        result: { schema: { components: [{ id: 'root', component: 'Form' }] }, turns: 2 },
      });
      expect(requestBodies).toHaveLength(2);
      expect(requestBodies[1].input).toContainEqual({
        type: 'function_call_output',
        call_id: 'call_1',
        output: 'Set 1 components',
      });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
