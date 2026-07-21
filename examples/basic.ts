/**
 * faui-agent 基础示例
 *
 * 演示工具模式的流式生成 + 多轮对话修改
 *
 * 运行方式：
 *   ANTHROPIC_API_KEY=sk-xxx npx tsx examples/basic.ts
 */

import {
  FauiAgent,
  TOOL_SYSTEM_PROMPT,
  SYSTEM_BASE,
  builtinSkills,
} from '../src/index.js';
import type { PageSchema, StreamEvent } from '../src/index.js';

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('请设置环境变量 ANTHROPIC_API_KEY');
  process.exit(1);
}

// ============================================================
// 示例 1：工具模式 — 流式增量生成
// ============================================================

console.log('=== 示例 1：工具模式流式生成 ===\n');

const toolAgent = new FauiAgent({
  apiKey,
  systemPrompt: TOOL_SYSTEM_PROMPT,
  useTools: true,
});

let schema: PageSchema | null = null;

for await (const event of toolAgent.generatePageStream('生成一个请假表单，包含姓名、部门、请假类型、开始日期、结束日期、请假原因')) {
  logEvent(event);
  if (event.type === 'done') {
    schema = event.result.schema;
  }
}

console.log(`\n生成完成，共 ${schema?.components.length} 个组件\n`);

// ============================================================
// 示例 2：多轮对话 — 基于已有 schema 增量修改
// ============================================================

if (schema) {
  console.log('=== 示例 2：多轮对话增量修改 ===\n');

  for await (const event of toolAgent.generatePageStream(
    '给开始日期和结束日期加上范围约束，结束日期不能早于开始日期',
    {
      history: [
        { role: 'user', content: '生成一个请假表单' },
        { role: 'assistant', content: '已生成请假表单' },
      ],
      currentSchema: schema,
    },
  )) {
    logEvent(event);
    if (event.type === 'done') {
      schema = event.result.schema;
    }
  }

  console.log(`\n修改完成，共 ${schema?.components.length} 个组件\n`);
}

// ============================================================
// 示例 3：非工具模式 — 直接输出 JSON
// ============================================================

console.log('=== 示例 3：非工具模式 ===\n');

const simpleAgent = new FauiAgent({
  apiKey,
  systemPrompt: SYSTEM_BASE,
  skills: builtinSkills,
});

const result = await simpleAgent.generatePage('生成一个登录表单，包含用户名和密码');
console.log('组件数:', result.schema.components.length);
console.log('轮次:', result.turns);
console.log('JSON:\n', JSON.stringify(result.schema, null, 2));

// ============================================================
// 工具函数
// ============================================================

function logEvent(event: StreamEvent) {
  switch (event.type) {
    case 'status':
      console.log(`  [状态] ${event.message}`);
      break;
    case 'tool_use':
      console.log(`  [工具] ${event.name}`);
      break;
    case 'schema_updated':
      console.log(`  [更新] ${event.schema.components.length} 个组件`);
      break;
    case 'text_delta':
      process.stdout.write(event.delta);
      break;
    case 'error':
      console.error(`  [错误] ${event.message}`);
      break;
    case 'done':
      console.log(`\n  [完成] ${event.result.schema.components.length} 个组件，${event.result.turns} 轮`);
      break;
  }
}
