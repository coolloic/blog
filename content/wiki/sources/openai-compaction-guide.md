---
title: "Source: Compaction (OpenAI guide)"
summary: "OpenAI's guide to compacting long Responses API conversations, server-side via context_management or explicitly via /responses/compact, using opaque encrypted compaction items."
category: source
lastmod: 2026-11-14
tags: ["platforms", "openai", "context"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Compaction](https://developers.openai.com/api/docs/guides/compaction)

## Summary

Two ways to shrink a long conversation so it keeps fitting the context window, both producing an opaque compaction item the model can continue from.

## Key claims

- Server-side: `context_management: [{type: "compaction", compact_threshold: N}]`; when the rendered prompt crosses N tokens, the server compacts, emits a compaction item in the same stream and prunes context.
- Standalone: `POST /responses/compact` takes a full window and returns a new, smaller one; it is stateless.
- The compaction item is encrypted and not human-readable; compacted windows may also keep some earlier items.
- With manual input chaining, items before the latest compaction item can be dropped; with `previous_response_id` chaining, do not prune manually; never prune `/responses/compact` output.
- Both modes work with ZDR when `store=false`.

## Feeds

[OpenAI Responses API](../concepts/openai-responses-api.md)
