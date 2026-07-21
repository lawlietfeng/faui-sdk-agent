# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-05-01

### Added
- **Tool-based incremental building**: `set_components`, `update_components`, `remove_components`, `update_data_model`, `validate_schema`
- **Streaming generation**: real-time events for text deltas, tool calls, schema updates
- **Multi-turn conversation**: history and currentSchema support for iterative editing
- **Multi-LLM support**: Anthropic, OpenAI, Google, Azure, Groq, Mistral, xAI, OpenRouter
- **Fully customizable**: systemPrompt, tools, toolExecutor, skills all externally configurable
- **Runtime parameter validation**: tool arguments validated before execution
- **Message history trimming**: auto-trim when exceeding configurable limit (default 60)
- **Schema snapshot rollback**: auto-rollback on tool execution failure (max 10 snapshots)
- **Consecutive failure circuit breaker**: abort after configurable consecutive JSON parse failures (default 3)
- **Built-in skills**: component-catalog, layout-patterns, data-binding, pitfalls (14 entries)
- **Built-in TOOL_SYSTEM_PROMPT**: comprehensive prompt for form generation with best practices
