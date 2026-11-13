---
title: "Source: Conversation state (OpenAI guide)"
summary: "OpenAI's guide to multi-turn state in the Responses API: previous_response_id chaining, the Conversations API, 30-day storage, manual replay and compaction pointers."
category: source
lastmod: 2026-11-14
tags: ["platforms", "openai"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)

## Summary

Describes the options for keeping a conversation going across Responses API calls and how long OpenAI keeps the state.

## Key claims

- `previous_response_id` chains a response to an earlier one; all earlier input tokens in the chain are still billed as input.
- In WebSocket mode, if a previous response ID cannot be resolved from cache, resend the full context with `previous_response_id: null`.
- The Conversations API creates a durable conversation object (messages, tool calls, tool outputs) passed via the `conversation` parameter; it can be reused across sessions, devices or jobs.
- Response objects are stored for 30 days by default; conversation objects and their items are not subject to the 30-day TTL.
- Manual mode: replay the full `output` array for reasoning models so reasoning items and assistant `phase` values stay intact; models with persisted reasoning can use `reasoning.context: "all_turns"`.
- The context window counts input, output and (for some models) reasoning tokens; excess generated tokens may be truncated.
- Compaction is available server-side (`context_management` with `compact_threshold`) or via a standalone `/responses/compact` endpoint.

## Feeds

[OpenAI Responses API](../concepts/openai-responses-api.md)
