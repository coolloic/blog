---
title: "Source: Compaction on demand (Claude API docs)"
summary: "Reference for Anthropic's on-demand compaction: the application sends a separate summarise request and swaps the returned signed compaction block in for the messages it covers."
category: source
lastmod: 2026-11-14
tags: ["agents", "context", "anthropic"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14 (beta header `compact-2026-09-04`)
- **Original:** [platform.claude.com/docs/en/build-with-claude/compaction-on-demand](https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand)

## Summary

The application decides when to compact. It sends the conversation with `"compaction": {"type": "summarize"}`; the API returns one `compaction` block (readable summary plus signature) and no reply. That block then goes first in `messages` in place of the summarised turns. The page covers the compaction loop, custom prompts, failure handling, billing and interactions with other features. Overview pages say on-demand is the recommended mode where available.

## Key claims

- Supported on Claude 4.6-and-later models (Opus 4.6 through Opus 5.5, Sonnet 4.6 through 5.5, Haiku 5.5, Fable and Mythos lines) on the Claude API, Bedrock, Claude Platform on AWS, Google Cloud and Foundry, all in beta. The Models API exposes `capabilities.compaction`.
- `compaction` cannot be combined with `context_management` on one request, and threshold compaction cannot run on a request carrying a signed block.
- Send the same `system` and `tools` as the conversation: the summariser reads tool definitions but never runs tools. `max_tokens` caps the whole call including thinking.
- The block must be sent back unchanged; edits to its content or signature return `compaction_signature_invalid` or `compaction_content_mismatch`. Leaving summarised messages in front of it returns `compaction_block_misplaced`.
- Custom `instructions` (up to 16,384 characters) replace the default prompt; the docs advise stating what must be retained and forbidding tool calls.
- No-summary outcomes are signalled by `stop_reason`: `max_tokens` (summary truncated), `model_context_window_exceeded` (no room for the prompt), `tool_use` (model called a tool), `refusal`.
- To decide when to compact, the client sums last-turn input and output tokens, adding cache read and creation tokens when prompt caching is on, and compares against a limit it chooses below the window.
- Billing: the summarisation call is billed and rate-limited normally and appears as the `compaction` entry in `usage.iterations`; carrying the block later adds no compaction cost.
- Lost on compaction: images, documents, container uploads and fetched URLs inside the summarised range; mid-conversation `system` messages and per-message effort settings stop applying.
- Variants: keep recent turns verbatim, compact in the background while work continues, compact again when a compacted conversation grows.

## Feeds

[Context compaction](../concepts/context-compaction.md)
