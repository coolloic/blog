---
title: "Source: Redis LangCache docs (overview and API/SDK examples)"
summary: "Redis's managed semantic-caching service: a search-then-store REST API with automatic embeddings, similarity thresholds, attribute scoping, exact/semantic search strategies and attribute-based deletion; in preview as of late 2026."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "cost"]
---

- **What:** official product documentation ("Redis LangCache", "Use the LangCache API and SDK")
- **Publisher:** Redis
- **Date:** accessed 2026-11-14 (living docs)
- **Original:** [LangCache overview](https://redis.io/docs/latest/develop/ai/langcache/), [API and SDK examples](https://redis.io/docs/latest/develop/ai/langcache/api-examples/)

## Summary

LangCache is a hosted semantic cache. The application calls a search endpoint before the LLM; on a miss it calls the LLM and then calls a store endpoint. LangCache generates the embeddings itself, so the application never manages an embedding model or vector index.

## Key claims

- Two calls: `POST /v1/caches/{cacheId}/entries/search` (prompt in, cached response or empty out) and `POST /v1/caches/{cacheId}/entries` (prompt + response, optional `attributes`). Auth is a Bearer API key; Python (`langcache`) and JS (`@redis-ai/langcache`) SDKs exist.
- Search takes `similarityThreshold` (examples use 0.9, a similarity, so higher is stricter), optional `attributes` that must match for a hit, and `searchStrategies` of `exact` (case-insensitive string match) and/or `semantic`; semantic only is the default.
- Invalidation: delete one entry by ID, delete all entries matching a set of attributes, or flush. A delete-by-attributes call with no attributes deletes the whole cache.
- Configurable thresholds, TTLs and eviction; hit-rate monitoring in the Redis Cloud console.
- Savings model offered by Redis: monthly output-token spend times hit rate, on the assumption that saved input tokens roughly pay for embedding and storage. Worked example: $120 of output spend at a 50% hit rate saves $60/month.
- Positioned for chatbots, RAG, caching intermediate agent steps, and as a shared cache behind an AI gateway.
- Status (as of 2026-11): public preview on Redis Cloud; self-managed Kubernetes deployment and a fully managed tier are in private preview. Redis states it does not use cached data for training.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
