---
title: "Source: Compaction at a token threshold (Claude API docs)"
summary: "Reference for Anthropic's compact_20260112 context-management edit: the API summarises the conversation inside the request that crosses an input-token trigger."
category: source
lastmod: 2026-11-14
tags: ["agents", "context", "anthropic"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14 (beta header `compact-2026-01-12`)
- **Original:** [platform.claude.com/docs/en/build-with-claude/compaction-threshold](https://platform.claude.com/docs/en/build-with-claude/compaction-threshold)

## Summary

Threshold compaction is one entry in `context_management.edits`. When a request's input reaches the trigger, Claude writes a summary at the start of its response, and on later requests the API ignores everything before the most recent compaction block. The page documents parameters, the block format, pausing, streaming, caching, usage accounting and thinking-block constraints.

## Key claims

- Edit type `compact_20260112`; beta on the Claude API, Bedrock, Claude Platform on AWS, Google Cloud and Microsoft Foundry; always on in Managed Agents. ZDR-eligible except for Covered Models, because summaries round-trip statelessly.
- `trigger` defaults to 150,000 input tokens; `input_tokens` is the only trigger type and the minimum value is 50,000.
- `instructions` replaces the default summarisation prompt entirely rather than adding to it. The default asks for state, next steps and learnings so work can resume without the raw history, wrapped in `<summary>` tags; it varies by model.
- `pause_after_compaction: true` ends the response with `stop_reason: "compaction"` and only the block, so the client can reinsert recent turns before continuing. A missing summary returns `content: null`; a safeguard block returns `refusal`.
- Thinking blocks from before the compaction are not carried forward. Reinserting earlier assistant turns can fail the thinking prefix check on newer models; strip the thinking, set `prefix_mismatch_behavior: "drop_block"`, or don't reinsert.
- Streaming delivers the whole summary in one `compaction_delta`, not incrementally.
- A `cache_control` breakpoint on the block caches the summary; a breakpoint at the end of the system prompt keeps it cached across compactions.
- `usage.iterations` lists `compaction` and `message` iterations separately; the top-level token counts exclude compaction, so billing must sum the iterations. Reusing an existing block costs nothing extra.
- With server tools, the trigger is checked at each sampling iteration, so one request can compact more than once. Token counting applies existing blocks but never triggers a new one.
- Serialising blocks with Pydantic `model_dump()` adds null fields that the API rejects with a 400.

## Feeds

[Context compaction](../concepts/context-compaction.md)
