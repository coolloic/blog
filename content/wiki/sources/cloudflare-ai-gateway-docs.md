---
title: "Source: Cloudflare AI Gateway docs (features, caching, request handling)"
summary: "Cloudflare's edge AI gateway: analytics, logging, exact-match caching via headers, rate limiting, per-request timeouts and retries, and dynamic routes."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways"]
---

- **What:** official documentation (overview, "Caching", "Request handling")
- **Publisher:** Cloudflare
- **Date:** living docs, read 2026-11-14
- **Original:** [Overview](https://developers.cloudflare.com/ai-gateway/), [Caching](https://developers.cloudflare.com/ai-gateway/features/caching/), [Request handling](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/)

## Summary

A managed proxy on Cloudflare's network in front of Workers AI, OpenAI, Anthropic, Gemini and others, configured largely through request headers.

## Key claims

- Features: analytics (requests, tokens, cost), logging, caching, rate limiting, model aliases and dynamic routes (conditional flows, per-model timeouts/retries, rate and budget limits), retries and model fallback.
- Caching is off by default and exact-match: the key is a SHA-256 of provider, endpoint, model, auth header and full body. Text and image responses only. Headers `cf-aig-cache-ttl` (60 s to one month), `cf-aig-skip-cache`, `cf-aig-cache-key`; `cf-aig-cache-status` returns HIT/MISS. Semantic caching is listed as future work.
- Concurrent identical requests can both miss because the first response may not be stored yet.
- `cf-aig-request-timeout` (ms) counts until the first response chunk, so streams are not cut off once started. Retries via `cf-aig-max-attempts` (max 5), `cf-aig-retry-delay` (max 60 s), `cf-aig-backoff` (`constant`/`linear`/`exponential`).

## Feeds

[LLM gateways](../concepts/llm-gateways.md)
