---
title: "Source: Kong AI Semantic Cache plugin docs"
summary: "Kong's enterprise gateway plugin for semantic response caching on Redis/Valkey or pgvector, with Cache-Control-driven expiry, X-Cache-Status headers and documented operational limits."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "gateways"]
---

- **What:** official plugin documentation
- **Publisher:** Kong
- **Date:** accessed 2026-11-14 (living docs)
- **Original:** [AI Semantic Cache plugin](https://developer.konghq.com/plugins/ai-semantic-cache/)

## Summary

The plugin intercepts chat requests at the gateway, embeds the last `message_countback` messages with an embeddings model, and searches a vector store of earlier requests. A match returns the stored response (streamed if the client streams); a miss calls the LLM and stores vectors plus response.

## Key claims

- Requires the enterprise AI Gateway (Kong Gateway 3.8+).
- Vector stores: Redis with Query Engine and JSON (Redis 8+), Valkey 8.1+ with `valkey-search`/`valkey-json` (Kong 3.14+), managed Redis variants, or PostgreSQL pgvector (Kong 3.10+). ElastiCache for Redis OSS is unsupported (use ElastiCache for Valkey 8.2+); MemoryDB caps an instance at 10 indexes.
- Exact and semantic modes; enabling exact caching does not disable semantic matching.
- Expiry follows `max-age`/`s-maxage`; `no-store`, `no-cache` and `private` are honoured. Because most hosted AI APIs send `no-cache`, setting `cache_control: true` means the cache is almost always bypassed; Kong advises enabling it only for self-hosted models whose headers you control.
- Response headers: `X-Cache-Status` (Hit, Miss, Bypass, Refresh), `X-Cache-Key`, `X-Cache-Ttl`, `Age`.
- Costs: vector storage and similarity search need significant storage and compute; little benefit when exact matching would do.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
