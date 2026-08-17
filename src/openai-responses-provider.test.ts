import { describe, expect, it } from 'vitest';
import {
  DEFAULT_OPENAI_BASE_URL,
  OpenAIResponsesProvider,
  buildResponsesUrl,
} from './openai-responses-provider.js';

function createSseResponse(chunks: string[]): Response {
  const encoder = new TextEncoder();
  return new Response(new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  }), {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}

describe('buildResponsesUrl', () => {
  it('uses the official endpoint only when no base URL is supplied', () => {
    expect(buildResponsesUrl()).toBe(`${DEFAULT_OPENAI_BASE_URL}/responses`);
    expect(buildResponsesUrl('https://proxy.example.com/v1/')).toBe('https://proxy.example.com/v1/responses');
  });
});

describe('OpenAIResponsesProvider', () => {
  it('binds the global fetch implementation to its native context', async () => {
    const originalFetch = globalThis.fetch;
    const browserLikeFetch = function (this: unknown) {
      if (this !== globalThis) throw new TypeError('Illegal invocation');
      return Promise.resolve(new Response(JSON.stringify({ output: [] })));
    } as typeof globalThis.fetch;
    globalThis.fetch = browserLikeFetch;

    try {
      const provider = new OpenAIResponsesProvider();
      await expect(provider.complete({
        systemPrompt: 'system',
        model: 'model',
        apiKey: 'test-key',
        messages: [{ role: 'user', content: 'hello', timestamp: 1 }],
      })).resolves.toMatchObject({ text: '', toolCalls: [] });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('includes the endpoint and underlying reason when fetch fails', async () => {
    const provider = new OpenAIResponsesProvider({
      fetch: async () => {
        throw new TypeError('Failed to fetch');
      },
    });

    await expect(provider.complete({
      systemPrompt: 'system',
      model: 'model',
      apiKey: 'test-key',
      baseUrl: 'https://proxy.example.com/v1',
      messages: [{ role: 'user', content: 'hello', timestamp: 1 }],
    })).rejects.toThrow(
      'https://proxy.example.com/v1/responses): Failed to fetch. Check the endpoint, network, and CORS settings.',
    );
  });

  it('includes the provider error body for HTTP failures', async () => {
    const provider = new OpenAIResponsesProvider({
      fetch: async () => new Response(JSON.stringify({
        error: { message: 'invalid api key' },
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    });

    await expect(provider.complete({
      systemPrompt: 'system',
      model: 'model',
      apiKey: 'test-key',
      messages: [{ role: 'user', content: 'hello', timestamp: 1 }],
    })).rejects.toThrow('HTTP 401): {"error":{"message":"invalid api key"}}');
  });

  it('uses the supplied base URL and replays response items with tool outputs', async () => {
    let url = '';
    let request: RequestInit | undefined;
    const provider = new OpenAIResponsesProvider({
      fetch: async (input, init) => {
        url = String(input);
        request = init;
        return new Response(JSON.stringify({
          output: [{
            type: 'message',
            role: 'assistant',
            content: [{ type: 'output_text', text: '{"components":[]}' }],
          }],
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      },
    });

    const result = await provider.complete({
      systemPrompt: 'system',
      model: 'proxy-model',
      apiKey: 'test-key',
      baseUrl: 'https://proxy.example.com/v1/',
      messages: [
        { role: 'user', content: 'first request', timestamp: 1 },
        {
          role: 'response',
          outputItems: [{ type: 'function_call', call_id: 'call_1', name: 'set_components', arguments: '{}' }],
          timestamp: 2,
        },
        {
          role: 'tool',
          callId: 'call_1',
          toolName: 'set_components',
          output: 'Set 0 components',
          isError: false,
          timestamp: 3,
        },
      ],
      tools: [{ name: 'set_components', description: 'Set schema', parameters: { type: 'object' } }],
      temperature: 0.2,
      maxOutputTokens: 123,
    });

    expect(url).toBe('https://proxy.example.com/v1/responses');
    expect(request?.headers).toMatchObject({ Authorization: 'Bearer test-key' });
    expect(JSON.parse(String(request?.body))).toMatchObject({
      model: 'proxy-model',
      instructions: 'system',
      temperature: 0.2,
      max_output_tokens: 123,
      stream: false,
      tools: [{ type: 'function', name: 'set_components' }],
      input: [
        { role: 'user', content: 'first request' },
        { type: 'function_call', call_id: 'call_1', name: 'set_components', arguments: '{}' },
        { type: 'function_call_output', call_id: 'call_1', output: 'Set 0 components' },
      ],
    });
    expect(result.text).toBe('{"components":[]}');
  });

  it('parses split SSE frames, text deltas, and completed function calls', async () => {
    const provider = new OpenAIResponsesProvider({
      fetch: async () => createSseResponse([
        'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"hel',
        'lo"}\n\n',
        'event: response.output_item.added\ndata: {"item":{"type":"function_call","id":"item_1","call_id":"call_1","name":"set_components","arguments":""},"output_index":1}\n\n',
        'event: response.function_call_arguments.delta\ndata: {"item_id":"item_1","delta":"{\\"components\\":[]"}\n\n',
        'event: response.function_call_arguments.done\ndata: {"item_id":"item_1","call_id":"call_1","name":"set_components","arguments":"{\\"components\\":[]}"}\n\n',
        'event: response.completed\ndata: {"response":{"output":[{"type":"message","content":[{"type":"output_text","text":"hello"}]},{"type":"function_call","call_id":"call_1","name":"set_components","arguments":"{\\"components\\":[]}"}]}}\n\n',
      ]),
    });

    const events = [];
    for await (const event of provider.stream({
      systemPrompt: 'system',
      model: 'model',
      apiKey: 'test-key',
      messages: [{ role: 'user', content: 'hello', timestamp: 1 }],
    })) {
      events.push(event);
    }

    expect(events).toContainEqual({ type: 'text_delta', delta: 'hello' });
    expect(events).toContainEqual({
      type: 'tool_call',
      toolCall: { id: 'call_1', name: 'set_components', arguments: { components: [] } },
    });
    expect(events.at(-1)).toMatchObject({
      type: 'done',
      result: {
        text: 'hello',
        hasToolCalls: true,
        toolCalls: [{ id: 'call_1', name: 'set_components', arguments: { components: [] } }],
      },
    });
  });
});
