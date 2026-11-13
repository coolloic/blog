---
title: "Source: Anthropic Streaming Messages Docs"
summary: "Claude API documentation on SSE streaming: event sequence, delta types, partial JSON tool inputs, errors mid-stream and recovery."
category: source
lastmod: 2026-11-14
tags: ["models", "streaming", "anthropic"]
---

- **What:** official API documentation page
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [Streaming messages](https://platform.claude.com/docs/en/build-with-claude/streaming)

## Summary

Setting `stream: true` on the Messages API returns server-sent events. The page documents the event grammar, each delta type, how tool inputs stream as partial JSON, thinking deltas and signatures, mid-stream errors, SDK accumulation helpers, and how to recover from an interrupted stream.

## Key claims

- Event flow: `message_start` (Message with empty content) → per content block `content_block_start`, N × `content_block_delta`, `content_block_stop` → one or more `message_delta` (stop_reason, usage) → `message_stop`. `ping` events may appear anywhere. Some blocks (server tool results, redacted thinking) arrive whole.
- Delta types: `text_delta`, `input_json_delta` (partial JSON string for `tool_use.input`), `thinking_delta`, `signature_delta` (sent just before the thinking block closes).
- Usage counts in `message_delta` are cumulative.
- By default tool input is buffered per complete key/value before being emitted; fine-grained streaming (`eager_input_streaming` per tool) streams values sooner.
- Errors can arrive inside a 200 stream, e.g. `overloaded_error` (the streaming equivalent of HTTP 529). New event types may be added; clients must ignore unknown ones.
- SDKs require streaming for large `max_tokens` to avoid HTTP timeouts and offer helpers that accumulate the final Message.
- Recovery: keep the partial response and send a continuation request. For Claude 4.5 and earlier the partial text goes in an assistant message; for Claude 4.6 and later, add a user message containing the partial response and asking the model to continue. Tool use and thinking blocks cannot be partially recovered.
- Bedrock's `bedrock-runtime` endpoint does not stream plain SSE.

## Feeds

[Streaming](../concepts/streaming.md) · [Function calling](../concepts/function-calling.md)
