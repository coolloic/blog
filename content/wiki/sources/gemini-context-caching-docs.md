---
title: "Source: Gemini API Context Caching and Pricing Docs"
summary: "Google Gemini API documentation on implicit and explicit context caching, plus the pricing page's cache and batch rates."
category: source
lastmod: 2026-11-14
tags: ["models", "caching", "google"]
---

- **What:** official API documentation (caching guide and pricing page)
- **Author/publisher:** Google
- **Date:** living documents; read 2026-11-14 via the AI Studio docs bundle
- **Original:** [Context caching](https://aistudio.google.com/docs/caching)

## Summary

Gemini offers two caching modes. Implicit caching is automatic on Gemini 2.5 and newer and passes savings through when a request happens to hit. Explicit caching (generateContent API only, beta, not supported on Gemini 4) creates a named `cachedContents` resource with a TTL that you reference in later calls, which guarantees the discount but adds an hourly storage charge. The pricing page lists cached-token and storage rates per model, including Batch-tier rates.

## Key claims

- Implicit caching is enabled by default for Gemini 2.5+ with no cost-saving guarantee; explicit caching guarantees savings and is available on Gemini 3 and 2.5 models only.
- Minimum tokens for a cache: 4,096 on Gemini 4 models and Gemini 3.x; 2,048 on Gemini 2.5 Flash/Pro.
- Hit rates improve when large shared content sits at the start of the prompt and similar-prefix requests arrive close together in time.
- On Gemini 4 multi-turn/agent loops, the whole previous request is cached only if the new request adds at least 2,050 tokens; otherwise the last 2,050 tokens are reprocessed at full price.
- Explicit caches default to a 1-hour TTL; `ttl` or `expire_time` can be set and later updated, nothing else about a cache can change.
- Pricing examples (paid tier, through end of 2026): Gemini 3.8 Flash input $0.75/MTok, cached $0.075/MTok, storage $0.50 per MTok per hour; Gemini 4 Carbon input $2.00, cached $0.10, implicit only. Gemini 4 Carbon prices double on 1 Dec 2026; Gemini 3.8 Flash prices (including storage) double on 1 Jan 2027.
- Cache hits are reported in usage metadata (`total_cached_tokens` in the Interactions API).

## Feeds

[Prompt caching](../concepts/prompt-caching.md) · [Batch processing](../concepts/batch-processing.md)
