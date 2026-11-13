---
title: "Source: OpenRouter provider routing and model fallbacks docs"
summary: "OpenRouter's reference for how it load-balances one model across many inference providers, the provider object (order, only, sort, max_price, zdr...), and the models-array fallback."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "routing"]
---

- **What:** official documentation ("Provider Routing", "Model Fallbacks")
- **Publisher:** OpenRouter
- **Date:** living docs, read 2026-11-14
- **Original:** [Provider routing](https://openrouter.ai/docs/features/provider-routing), [Model fallbacks](https://openrouter.ai/docs/guides/routing/model-fallbacks.md)

## Summary

OpenRouter is a hosted aggregator: one model slug may be served by many providers (with different prices, quantizations and data policies). By default it picks a provider at random, weighted toward the best on a composite of price, throughput, latency, 429 rate and reliability, and falls back to other providers on errors. Clients can override this with a `provider` object and list fallback models.

## Key claims

- Default routing weights traffic toward providers near the best on effective price, throughput, time to first token, 429 rate, reliability and tool-call quality, while still sending a small share to others so improvements are noticed.
- `provider` fields: `order`, `allow_fallbacks` (default true), `require_parameters` (only providers supporting every request parameter), `data_collection` (`allow`/`deny`), `zdr`, `only`, `ignore`, `quantizations`, `sort` (`price`/`throughput`/`latency`; bypasses default weighting), `max_price` (hard ceiling), `preferred_min_throughput`/`preferred_max_latency` (soft, percentile-based).
- Slug suffixes `:nitro` (sort by throughput) and `:floor` (sort by price) are routing variants, not separate models; they also make priority (`:nitro`) or flex (`:floor`) service-tier endpoints eligible. The `preferred_*` thresholds use a rolling 5-minute window and only reorder endpoints, whereas `max_price` can block a request.
- Model fallbacks: a `models` array in priority order; by default any error triggers the next model, including context-length errors, moderation flags, rate limits and downtime. Billing is at the price of the model that answered, and the response `model` field shows which one did.

## Feeds

[LLM gateways](../concepts/llm-gateways.md), [Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
