---
title: "Source: Anthropic Prompt Caching Docs"
summary: "Claude API documentation on prompt caching: breakpoints, TTLs, pricing multipliers, lookback, invalidation and usage fields."
category: source
lastmod: 2026-11-14
tags: ["models", "caching", "anthropic"]
---

- **What:** official API documentation page
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14 (examples use `anthropic-version: 2026-10-21`)
- **Original:** [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

## Summary

Describes how the Claude Messages API reuses a stored prompt prefix. Caching is opt-in, either per content block (`cache_control` breakpoints) or via a single top-level `cache_control` field ("automatic caching") that places the breakpoint on the last cacheable block and moves it forward as a conversation grows. The page specifies the prefix order, minimum lengths, lifetimes, prices, the backward lookup algorithm, a table of which parameter changes invalidate which part of the cache, usage accounting, concurrency behaviour and isolation scope.

## Key claims

- The prefix is hashed in the order `tools` → `system` → `messages`; a hit needs a byte-identical prefix (text and images) up to the breakpoint. Caching never changes the output.
- Up to 4 explicit breakpoints per request; automatic caching consumes one of them. `ephemeral` is the only cache type. Automatic caching is not available on Bedrock's `bedrock-runtime` endpoint.
- Minimum cacheable length depends on the model: 512 tokens for the 5.x generation (e.g. Opus 5.5, Sonnet 5.5, Haiku 5.5), 1,024 for Opus 4.8 / Sonnet 5 / Sonnet 4.6, 2,048 for Opus 4.7, 4,096 for Opus 4.6/4.5 and Haiku 4.5. Shorter prefixes are silently not cached.
- Default TTL 5 minutes, measured from the start of the request and counting time spent streaming; refreshed free on every hit; optional `"ttl": "1h"`.
- Pricing vs base input: 5-minute write 1.25×, 1-hour write 2×, read 0.1× (0.05× on Opus 5.5 / Sonnet 5.5, 0.025× on Fable 5.1/5.2 and Mythos 5.1/5.2). Multipliers stack with the Batch discount.
- Writes happen only at breakpoints. On a miss at a breakpoint, the system walks back up to 20 blocks looking for an earlier written entry; long growing conversations need an extra breakpoint.
- Invalidation cascades: changing tool definitions invalidates everything; toggling web search/citations or speed invalidates system+messages; changing `tool_choice` or adding/removing images invalidates messages.
- Usage fields: `cache_creation_input_tokens`, `cache_read_input_tokens`, and `input_tokens` (only the tokens after the last breakpoint).
- A cache entry exists only once the first response starts streaming, so parallel fan-out should wait for the first response to begin.
- Caches are isolated per organization, and additionally per workspace on the first-party API.
- Pre-warming: a request with `max_tokens: 0` writes the cache without generating output; not allowed with streaming, batches, structured outputs or forced tool choice.

## Feeds

[Prompt caching](../concepts/prompt-caching.md) · [Batch processing](../concepts/batch-processing.md)
