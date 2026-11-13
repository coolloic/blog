---
title: "Source: Migrate to the Responses API (OpenAI guide)"
summary: "OpenAI's migration guide from Chat Completions to the Responses API: items vs messages, instructions, storage defaults, state options, tool and schema format changes, and gotchas."
category: source
lastmod: 2026-11-14
tags: ["platforms", "openai"]
---

- **What:** official migration guide
- **Publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)

## Summary

Explains how the Responses API differs from Chat Completions and what breaks when you port code. The central change is that input and output are lists of typed items rather than chat messages, and that the server can hold conversation state for you. It also records the Assistants API sunset.

## Key claims

- Input and output are typed items (`message`, `reasoning`, `function_call`, `function_call_output`), not `messages`; text is read from `output_text` or by walking `output`.
- No `n`: Responses returns a single generation.
- System guidance goes in a top-level `instructions` parameter.
- Responses are stored by default; `store: false` disables it. ZDR organizations have `store: false` enforced. Chat Completions are stored by default for new accounts (re-checked 2026-11-14).
- Three ways to carry state: `previous_response_id`, replaying output items manually, or a Conversations API object.
- Function tool definitions are internally tagged (fields at top level) instead of nested under `function`.
- Responses tries strict mode when `strict` is omitted and falls back if the schema is incompatible; Chat Completions defaults to non-strict.
- Structured Outputs move from `response_format` to `text.format`.
- Hosted tools (web search, file search, computer use, code interpreter, image generation, remote MCP) exist only in Responses.
- Streaming uses typed semantic events rather than `delta` chunks.
- The Assistants API was sunset on 2026-08-26.
- Gotchas: not every output item is a message; dropping reasoning or function-call items breaks continuity; results need the matching `call_id`; `previous_response_id` does not carry over `instructions` and does not reduce cost (the whole chain is billed as input).
- From GPT-5.4, Chat Completions supports tool calling only with `reasoning_effort: none`; GPT-6 Astra and GPT-6.1 Sol need Responses for tool calling.
- Stateless/ZDR: set `store: false` and replay every reasoning item, which carries `encrypted_content`.

## Feeds

[OpenAI Responses API](../concepts/openai-responses-api.md) · [Anthropic Messages API](../concepts/anthropic-messages-api.md) · [Gemini API](../concepts/gemini-api.md)
