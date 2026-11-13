---
title: "Source: Portkey AI Gateway docs (fallbacks, retries, simple and semantic cache)"
summary: "Portkey's gateway config reference: ordered fallback targets on status codes, retries with exponential backoff or Retry-After, and exact or semantic caching with documented limits."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "routing"]
---

- **What:** official documentation ("Fallbacks", "Automatic Retries", "Cache (Simple & Semantic)")
- **Publisher:** Portkey
- **Date:** living docs, read 2026-11-14
- **Original:** [Fallbacks](https://portkey.ai/docs/product/ai-gateway/fallbacks), [Retries](https://portkey.ai/docs/product/ai-gateway/automatic-retries), [Cache](https://portkey.ai/docs/product/ai-gateway/cache-simple-and-semantic)

## Summary

Portkey routes requests through a JSON "config" attached to the request. Configs declare a strategy (fallback, load balance, conditional), targets, retries and cache, and can nest.

## Key claims

- `strategy.mode: "fallback"` tries `targets` in order; `on_status_codes` (e.g. `[429, 503]`) limits which failures trigger fallback, otherwise any non-2xx does. Targets can themselves be load balancers, conditional routers or fallbacks.
- `retry.attempts` up to 5; default retried codes 429, 500, 502, 503, 504, 529; setting `on_status_codes` replaces them. Backoff is exponential (1, 2, 4, 8, 16 s).
- `use_retry_after_headers` honours `retry-after-ms`, `x-ms-retry-after-ms` or `retry-after`; total wait is capped at 60 s, and a single Retry-After over 60 s fails immediately. Response header `x-portkey-retry-attempt-count` reports the outcome.
- Simple cache matches the full body exactly. Semantic cache matches only user text by cosine similarity (default threshold 0.95) while model and parameters must match exactly; the system prompt is ignored for matching.
- Semantic cache limits: under 8,191 tokens and at most 4 messages; needs a vector DB and embedding provider; Enterprise-only. `max_age` 60 s to 90 days (default 7 days). Namespaces partition the cache; `x-portkey-cache-force-refresh` bypasses it.

## Feeds

[LLM gateways](../concepts/llm-gateways.md), [Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
