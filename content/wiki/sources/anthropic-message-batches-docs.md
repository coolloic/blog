---
title: "Source: Anthropic Message Batches Docs"
summary: "Claude API documentation on the Message Batches API: 50% discount, limits, lifecycle, result types and interplay with prompt caching."
category: source
lastmod: 2026-11-14
tags: ["models", "batch", "anthropic"]
---

- **What:** official API documentation page
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing)

## Summary

The Message Batches API accepts many Messages requests at once and processes them asynchronously at half price. The page covers limits, lifecycle, unsupported parameters, result types, retention, and how batches combine with prompt caching.

## Key claims

- 50% cost reduction; most batches finish within 1 hour; batches expire if not complete within 24 hours.
- Limit: 100,000 requests or 256 MB per batch, whichever comes first.
- Each request has a `custom_id` matching `^[a-zA-Z0-9_-]{1,64}$`; results may come back in any order, so match on `custom_id`.
- `processing_status`: `in_progress` → `ended` (via `canceling` if cancelled). Per-request result types: `succeeded`, `errored`, `canceled`, `expired`; only succeeded requests are billed.
- Request params are validated asynchronously, so a malformed shape surfaces only when the batch ends; dry-run one request on the Messages API first.
- Not supported in batches: `stream: true`, fast mode `speed`, server-side `fallbacks`, `max_tokens: 0`.
- Results available for 29 days; batches are scoped to a workspace; not ZDR-eligible. Batch traffic has its own rate limits (HTTP requests and queued requests) and may slightly overshoot workspace spend limits.
- Prompt caching stacks with the batch discount, but hits are best-effort because requests run concurrently in any order; typical hit rates 30–98%. Use the 1-hour TTL for shared context in batches.

## Feeds

[Batch processing](../concepts/batch-processing.md) · [Prompt caching](../concepts/prompt-caching.md)
