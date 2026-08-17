export const DEFAULT_OPENAI_BASE_URL = 'https://api.openai.com/v1';

export type OpenAIResponseOutputItem = Record<string, unknown>;

export type OpenAIResponsesMessage =
  | { role: 'user' | 'assistant'; content: string; timestamp: number }
  | { role: 'response'; outputItems: OpenAIResponseOutputItem[]; timestamp: number }
  | {
      role: 'tool';
      callId: string;
      toolName: string;
      output: string;
      isError: boolean;
      timestamp: number;
    };

export interface OpenAIResponsesTool {
  name: string;
  description: string;
  parameters: unknown;
}

export interface OpenAIResponsesRequest {
  systemPrompt: string;
  messages: OpenAIResponsesMessage[];
  tools?: OpenAIResponsesTool[];
  model: string;
  apiKey: string;
  baseUrl?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface OpenAIResponseToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  argumentsError?: string;
}

export interface OpenAIResponsesResult {
  text: string;
  toolCalls: OpenAIResponseToolCall[];
  outputItems: OpenAIResponseOutputItem[];
  hasToolCalls: boolean;
}

export type OpenAIResponsesEvent =
  | { type: 'text_delta'; delta: string }
  | { type: 'tool_call'; toolCall: OpenAIResponseToolCall }
  | { type: 'done'; result: OpenAIResponsesResult }
  | { type: 'error'; message: string };

export interface OpenAIResponsesProviderOptions {
  fetch?: typeof globalThis.fetch;
  defaultBaseUrl?: string;
}

interface SseFrame {
  event: string;
  data: string;
}

interface PendingToolCall {
  id?: string;
  callId?: string;
  name?: string;
  arguments: string;
  outputIndex?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function getString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function getNumber(value: unknown): number | undefined {
  return typeof value === 'number' ? value : undefined;
}

function getOutputItems(response: unknown): OpenAIResponseOutputItem[] {
  if (!isRecord(response) || !Array.isArray(response.output)) return [];
  return response.output.filter(isRecord);
}

function parseToolArguments(rawArguments: unknown): Pick<OpenAIResponseToolCall, 'arguments' | 'argumentsError'> {
  if (typeof rawArguments !== 'string') {
    return { arguments: {}, argumentsError: 'Function arguments are missing.' };
  }

  try {
    const parsed: unknown = JSON.parse(rawArguments);
    if (!isRecord(parsed)) {
      return { arguments: {}, argumentsError: 'Function arguments must be a JSON object.' };
    }
    return { arguments: parsed };
  } catch {
    return { arguments: {}, argumentsError: 'Function arguments are not valid JSON.' };
  }
}

function getToolCall(item: OpenAIResponseOutputItem): OpenAIResponseToolCall | null {
  if (item.type !== 'function_call') return null;

  const id = getString(item.call_id);
  const name = getString(item.name);
  if (!id || !name) return null;

  return { id, name, ...parseToolArguments(item.arguments) };
}

function collectToolCalls(outputItems: OpenAIResponseOutputItem[]): OpenAIResponseToolCall[] {
  const calls = outputItems
    .map(getToolCall)
    .filter((call): call is OpenAIResponseToolCall => call !== null);
  return dedupeToolCalls(calls);
}

function dedupeToolCalls(toolCalls: OpenAIResponseToolCall[]): OpenAIResponseToolCall[] {
  const seen = new Set<string>();
  return toolCalls.filter((toolCall) => {
    if (seen.has(toolCall.id)) return false;
    seen.add(toolCall.id);
    return true;
  });
}

function getText(outputItems: OpenAIResponseOutputItem[], fallback = ''): string {
  const text: string[] = [];

  for (const item of outputItems) {
    if (item.type !== 'message' || !Array.isArray(item.content)) continue;

    for (const contentItem of item.content) {
      if (!isRecord(contentItem) || contentItem.type !== 'output_text') continue;
      const value = getString(contentItem.text);
      if (value) text.push(value);
    }
  }

  return text.join('') || fallback;
}

function toInputItems(messages: OpenAIResponsesMessage[]): unknown[] {
  return messages.flatMap((message) => {
    switch (message.role) {
      case 'response':
        // Responses API supports replaying prior output items before function_call_output.
        return message.outputItems;
      case 'tool':
        return {
          type: 'function_call_output',
          call_id: message.callId,
          output: message.output,
        };
      default:
        return { role: message.role, content: message.content };
    }
  });
}

function createResult(
  outputItems: OpenAIResponseOutputItem[],
  streamedText: string,
  streamedToolCalls: OpenAIResponseToolCall[],
): OpenAIResponsesResult {
  const itemToolCalls = collectToolCalls(outputItems);
  const toolCalls = dedupeToolCalls([...itemToolCalls, ...streamedToolCalls]);

  return {
    text: getText(outputItems, streamedText),
    toolCalls,
    outputItems,
    hasToolCalls: toolCalls.length > 0,
  };
}

function getStreamErrorMessage(eventName: string): string {
  if (eventName === 'response.failed') return 'OpenAI Responses API stream failed.';
  return 'OpenAI Responses API returned a stream error.';
}

class SseParser {
  private buffer = '';
  private eventName = '';
  private dataLines: string[] = [];

  push(chunk: string): SseFrame[] {
    this.buffer += chunk;
    const frames: SseFrame[] = [];

    while (true) {
      const newlineIndex = this.buffer.indexOf('\n');
      if (newlineIndex === -1) break;

      const rawLine = this.buffer.slice(0, newlineIndex);
      this.buffer = this.buffer.slice(newlineIndex + 1);
      const line = rawLine.endsWith('\r') ? rawLine.slice(0, -1) : rawLine;

      if (!line) {
        const frame = this.completeFrame();
        if (frame) frames.push(frame);
        continue;
      }

      if (line.startsWith('event:')) {
        this.eventName = line.slice('event:'.length).trim();
      } else if (line.startsWith('data:')) {
        const data = line.slice('data:'.length);
        this.dataLines.push(data.startsWith(' ') ? data.slice(1) : data);
      }
    }

    return frames;
  }

  finish(): SseFrame[] {
    if (this.buffer) {
      const line = this.buffer.endsWith('\r') ? this.buffer.slice(0, -1) : this.buffer;
      this.buffer = '';
      if (line.startsWith('event:')) {
        this.eventName = line.slice('event:'.length).trim();
      } else if (line.startsWith('data:')) {
        const data = line.slice('data:'.length);
        this.dataLines.push(data.startsWith(' ') ? data.slice(1) : data);
      }
    }

    const frame = this.completeFrame();
    return frame ? [frame] : [];
  }

  private completeFrame(): SseFrame | null {
    if (this.dataLines.length === 0) {
      this.eventName = '';
      return null;
    }

    const frame = { event: this.eventName, data: this.dataLines.join('\n') };
    this.eventName = '';
    this.dataLines = [];
    return frame;
  }
}

export function buildResponsesUrl(baseUrl = DEFAULT_OPENAI_BASE_URL): string {
  return `${baseUrl.replace(/\/+$/, '')}/responses`;
}

/** OpenAI Responses API 的最小原生 fetch 封装。 */
export class OpenAIResponsesProvider {
  private readonly fetchImplementation: typeof globalThis.fetch;
  private readonly defaultBaseUrl: string;

  constructor(options: OpenAIResponsesProviderOptions = {}) {
    this.fetchImplementation = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.defaultBaseUrl = options.defaultBaseUrl ?? DEFAULT_OPENAI_BASE_URL;
  }

  async complete(request: OpenAIResponsesRequest): Promise<OpenAIResponsesResult> {
    const response = await this.post(request, false);

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      throw new Error('faui-agent: OpenAI Responses API returned invalid JSON.');
    }

    return createResult(getOutputItems(body), '', []);
  }

  async *stream(request: OpenAIResponsesRequest): AsyncGenerator<OpenAIResponsesEvent> {
    const response = await this.post(request, true);
    if (!response.body) {
      throw new Error('faui-agent: OpenAI Responses API returned an empty stream body.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const parser = new SseParser();
    const outputItems = new Map<number, OpenAIResponseOutputItem>();
    const pendingToolCalls = new Map<string, PendingToolCall>();
    const emittedToolCalls = new Set<string>();
    const streamedToolCalls: OpenAIResponseToolCall[] = [];
    let streamedText = '';
    let completed = false;

    const emitToolCall = (pending: PendingToolCall): OpenAIResponseToolCall | null => {
      if (!pending.callId || !pending.name || emittedToolCalls.has(pending.callId)) return null;
      const toolCall: OpenAIResponseToolCall = {
        id: pending.callId,
        name: pending.name,
        ...parseToolArguments(pending.arguments),
      };
      emittedToolCalls.add(toolCall.id);
      streamedToolCalls.push(toolCall);
      return toolCall;
    };

    const handleFrame = (frame: SseFrame): OpenAIResponsesEvent[] => {
      if (frame.data === '[DONE]') return [];

      let payload: unknown;
      try {
        payload = JSON.parse(frame.data);
      } catch {
        return [{ type: 'error', message: 'OpenAI Responses API returned invalid SSE data.' }];
      }

      const data = isRecord(payload) ? payload : {};
      const eventName = frame.event || getString(data.type) || '';

      if (eventName === 'error' || eventName === 'response.failed' || eventName === 'response.incomplete') {
        return [{ type: 'error', message: getStreamErrorMessage(eventName) }];
      }

      if (eventName === 'response.output_text.delta') {
        const delta = getString(data.delta);
        if (!delta) return [];
        streamedText += delta;
        return [{ type: 'text_delta', delta }];
      }

      if (eventName === 'response.output_item.added' || eventName === 'response.output_item.done') {
        const item = isRecord(data.item) ? data.item : null;
        const outputIndex = getNumber(data.output_index);
        if (item && outputIndex !== undefined) outputItems.set(outputIndex, item);

        if (eventName === 'response.output_item.added' && item?.type === 'function_call') {
          const itemId = getString(item.id) ?? getString(item.call_id);
          if (itemId) {
            pendingToolCalls.set(itemId, {
              id: getString(item.id),
              callId: getString(item.call_id),
              name: getString(item.name),
              arguments: getString(item.arguments) ?? '',
              outputIndex,
            });
          }
        }

        if (eventName === 'response.output_item.done' && item?.type === 'function_call') {
          const itemId = getString(item.id) ?? getString(item.call_id);
          const pending = itemId ? pendingToolCalls.get(itemId) : undefined;
          const completedToolCall: PendingToolCall = {
            id: getString(item.id) ?? pending?.id,
            callId: getString(item.call_id) ?? pending?.callId,
            name: getString(item.name) ?? pending?.name,
            arguments: getString(item.arguments) ?? pending?.arguments ?? '',
            outputIndex: outputIndex ?? pending?.outputIndex,
          };
          if (itemId) pendingToolCalls.set(itemId, completedToolCall);
          const toolCall = emitToolCall(completedToolCall);
          return toolCall ? [{ type: 'tool_call', toolCall }] : [];
        }

        return [];
      }

      if (eventName === 'response.function_call_arguments.delta') {
        const itemId = getString(data.item_id) ?? getString(data.call_id);
        if (!itemId) return [];
        const pending = pendingToolCalls.get(itemId) ?? { id: getString(data.item_id), arguments: '' };
        pending.callId = getString(data.call_id) ?? pending.callId;
        pending.name = getString(data.name) ?? pending.name;
        pending.arguments += getString(data.delta) ?? '';
        pending.outputIndex = getNumber(data.output_index) ?? pending.outputIndex;
        pendingToolCalls.set(itemId, pending);
        return [];
      }

      if (eventName === 'response.function_call_arguments.done') {
        const itemId = getString(data.item_id) ?? getString(data.call_id);
        if (!itemId) return [];
        const pending = pendingToolCalls.get(itemId) ?? { id: getString(data.item_id), arguments: '' };
        pending.callId = getString(data.call_id) ?? pending.callId;
        pending.name = getString(data.name) ?? pending.name;
        pending.arguments = getString(data.arguments) ?? pending.arguments;
        pending.outputIndex = getNumber(data.output_index) ?? pending.outputIndex;
        pendingToolCalls.set(itemId, pending);
        const toolCall = emitToolCall(pending);
        return toolCall ? [{ type: 'tool_call', toolCall }] : [];
      }

      if (eventName === 'response.completed') {
        const responseData = isRecord(data.response) ? data.response : data;
        const completedItems = getOutputItems(responseData);
        const orderedItems = completedItems.length > 0
          ? completedItems
          : [...outputItems.entries()]
              .sort(([left], [right]) => left - right)
              .map(([, item]) => item);
        completed = true;
        return [{ type: 'done', result: createResult(orderedItems, streamedText, streamedToolCalls) }];
      }

      return [];
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const frames = parser.push(decoder.decode(value, { stream: true }));
        for (const frame of frames) {
          const events = handleFrame(frame);
          for (const event of events) {
            yield event;
            if (event.type === 'error') return;
          }
        }
      }

      const frames = parser.push(decoder.decode());
      frames.push(...parser.finish());
      for (const frame of frames) {
        const events = handleFrame(frame);
        for (const event of events) {
          yield event;
          if (event.type === 'error') return;
        }
      }
    } finally {
      reader.releaseLock();
    }

    if (!completed) {
      const orderedItems = [...outputItems.entries()]
        .sort(([left], [right]) => left - right)
        .map(([, item]) => item);
      yield { type: 'done', result: createResult(orderedItems, streamedText, streamedToolCalls) };
    }
  }

  private async post(request: OpenAIResponsesRequest, stream: boolean): Promise<Response> {
    const requestUrl = buildResponsesUrl(request.baseUrl ?? this.defaultBaseUrl);
    const body: Record<string, unknown> = {
      model: request.model,
      instructions: request.systemPrompt,
      input: toInputItems(request.messages),
      stream,
    };

    if (request.tools && request.tools.length > 0) {
      body.tools = request.tools.map((tool) => ({
        type: 'function',
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      }));
    }
    if (request.temperature !== undefined) body.temperature = request.temperature;
    if (request.maxOutputTokens !== undefined) body.max_output_tokens = request.maxOutputTokens;

    let response: Response;
    try {
      response = await this.fetchImplementation(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${request.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      throw new Error(
        `faui-agent: OpenAI Responses API request failed (${requestUrl}): ${reason}. Check the endpoint, network, and CORS settings.`,
        { cause: error },
      );
    }

    if (!response.ok) {
      let detail = '';
      try {
        const errorBody = await response.text();
        if (errorBody) detail = `: ${errorBody.slice(0, 500)}`;
      } catch {
        // Keep the HTTP status when the response body cannot be read.
      }
      throw new Error(
        `faui-agent: OpenAI Responses API request failed (HTTP ${response.status})${detail}`,
      );
    }

    return response;
  }
}
