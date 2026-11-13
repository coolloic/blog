---
title: "Source: OpenAI Streaming API Responses Guide"
summary: "OpenAI API guide on streaming the Responses API with typed semantic SSE events, and the moderation risk of partial output."
category: source
lastmod: 2026-11-14
tags: ["models", "streaming", "openai"]
---

- **What:** official API documentation page
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Streaming API responses](https://developers.openai.com/api/docs/guides/streaming-responses)

## Summary

With `stream=true`, the Responses API emits typed semantic events instead of raw token chunks. The guide lists the lifecycle, output-item, content-part, text, refusal and function-argument events, recommends a minimal subset for text streaming, and warns that partial output is harder to moderate.

## Key claims

- Lifecycle events: `response.created`, `response.in_progress`, `response.completed`, `response.failed`, `error`.
- Structure events: `response.output_item.added/done`, `response.content_part.added/done`.
- Content events: `response.output_text.delta/done`, `response.output_text.annotation.added`, `response.refusal.delta/done`, `response.function_call_arguments.delta/done`; plus tool-specific events (file search, code interpreter).
- For plain text, listening to `response.created`, `response.output_text.delta`, `response.completed` and `error` is enough.
- Streaming makes moderation harder: partial completions are harder to evaluate, and moderation results arrive only after full generation.

## Feeds

[Streaming](../concepts/streaming.md)
