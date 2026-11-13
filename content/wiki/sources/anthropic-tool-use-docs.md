---
title: "Source: Anthropic Tool Use Docs"
summary: "Claude API documentation on tool use: client vs server tools, tool definitions, tool_choice, parallel tool calls and token overhead."
category: source
lastmod: 2026-11-14
tags: ["models", "tools", "anthropic"]
---

- **What:** official API documentation (Tool use overview, Define tools, Parallel tool use pages)
- **Author/publisher:** Anthropic
- **Date:** living documents; read 2026-11-14
- **Original:** [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

Related pages: [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) · [Parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use)

## Summary

Claude's tool use is a request/response protocol: tools are declared with a name, description and JSON Schema `input_schema`; the model replies with `stop_reason: "tool_use"` and one or more `tool_use` blocks; the client runs them and returns `tool_result` blocks keyed by `tool_use_id`. Server tools (web search, web fetch, code execution, tool search) run on Anthropic's side. The pages cover `tool_choice`, forced tool restrictions, parallel-call formatting rules, input examples and the hidden tool system prompt.

## Key claims

- Tool names must match `^[a-zA-Z0-9_-]{1,128}$`. Optional fields include `input_examples`, `cache_control`, `strict`, `defer_loading`.
- The API builds a special system prompt from the tool definitions; this costs roughly 286–804 extra input tokens depending on model and `tool_choice` (e.g. 286 on Opus 5.5 / Sonnet 5.5; 675 with `auto`/`none` and 804 with `any`/`tool` on Opus 4.7).
- Descriptions are the most important factor in tool performance; aim for at least 3–4 sentences. Consolidate related operations; namespace tool names by service.
- `tool_choice`: `auto` (default with tools), `any`, `tool` (named), `none`. `any`/`tool` prefill the assistant turn, so no prose precedes the call and thinking is skipped; they are rejected with manual extended thinking and on Opus 5.5 / Sonnet 5.5 (use `auto` + strict tools or structured outputs instead).
- Changing `tool_choice` invalidates cached message blocks.
- Parallel calls are on by default. Return all `tool_result` blocks in one user message, before any text; splitting them across messages "teaches" the model to stop parallelising. Disable via `disable_parallel_tool_use` inside `tool_choice` (at most one call with `auto`, exactly one with `any`/`tool`).
- Execution order of parallel calls is the client's choice; skipped or failed calls still get a `tool_result` with `is_error: true`.
- When required parameters are missing, Opus is more likely to ask for them, while Sonnet may infer a plausible value (e.g. guess a location).
- `input_examples` must validate against the schema and cost roughly 20–200 tokens each.
- With `strict: true`, tool inputs are grammar-constrained to the schema.

## Feeds

[Function calling](../concepts/function-calling.md) · [Structured outputs](../concepts/structured-outputs.md) · [Tools](../concepts/tools.md)
