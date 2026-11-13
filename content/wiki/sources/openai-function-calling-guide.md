---
title: "Source: OpenAI Function Calling Guide"
summary: "OpenAI API guide to function calling in the Responses API: strict schemas, tool_choice, parallel calls, custom grammar tools, tool search and streaming."
category: source
lastmod: 2026-11-14
tags: ["models", "tools", "openai"]
---

- **What:** official API documentation page
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Function calling](https://developers.openai.com/api/docs/guides/function-calling)

## Summary

Explains how to declare `function` tools in the Responses API, how the model emits `function_call` output items and how to return `function_call_output` items, plus strict mode, tool choice, parallel calling, free-form "custom" tools constrained by a grammar, namespaces with deferred loading and tool search, token costs and streaming events.

## Key claims

- A function tool has `type: "function"`, `name`, `description`, `parameters` (JSON Schema), optional `strict`.
- Strict mode requires `additionalProperties: false` and every property in `required`; optional fields are expressed as a union with `null`. In Responses, omitted `strict` means the API tries to normalise to strict and falls back if it cannot; Chat Completions defaults to non-strict.
- `tool_choice`: `auto`, `required`, a specific function, `allowed_tools` (subset without changing the tool list, which preserves the prompt cache), `none`.
- `parallel_tool_calls: false` limits the model to zero or one call per turn; built-in tools can't join a parallel batch.
- Calls carry a `call_id`; results go back as `function_call_output` with the same `call_id`. Reasoning items must be passed back alongside tool outputs.
- Custom tools take free-form text, optionally constrained by a Lark or regex (Rust syntax) grammar.
- Tool definitions are injected into the context and billed as input tokens; keep fewer than about 20 functions available at turn start (soft guideline); `tool_search` with `defer_loading` loads tools on demand (gpt-5.4+).
- Streaming: `response.output_item.added` opens a call, `response.function_call_arguments.delta` streams argument fragments, `.done` carries the full arguments.

## Feeds

[Function calling](../concepts/function-calling.md) · [Streaming](../concepts/streaming.md)
