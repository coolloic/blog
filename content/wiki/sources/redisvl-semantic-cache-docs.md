---
title: "Source: RedisVL SemanticCache user guide"
summary: "The open-source RedisVL library's SemanticCache: cosine-distance thresholds, TTL with refresh-on-hit, tag/numeric filters for per-user scoping, and drop/clear APIs."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching"]
---

- **What:** official library documentation (RedisVL user guide, "Semantic caching for LLMs")
- **Publisher:** Redis (RedisVL project)
- **Date:** accessed 2026-11-14 (living docs)
- **Original:** [docs.redisvl.com LLM cache guide](https://docs.redisvl.com/en/latest/user_guide/03_llmcache.html)

## Summary

RedisVL is Redis's Python client for vector workloads. Its `SemanticCache` class is a self-hosted semantic cache on Redis 8+ or Redis Cloud, with a pluggable vectorizer (the guide uses `redis/langcache-embed-v2`).

## Key claims

- `distance_threshold` is a maximum cosine *distance* on Redis's 0-2 scale (0 = identical). Lower is stricter. The guide's example uses 0.1 and shows a looser 0.5 matching more.
- The right threshold depends on the embedding model, the input distribution and the business case; it is meant to be tuned.
- `ttl` (seconds) expires entries; without it entries persist forever. By default `check()` refreshes the TTL of every matched entry (a sliding window), which can surprise you; turn it off with `refresh_ttl_on_hit=False` at init or `refresh_ttl=False` per check.
- `filterable_fields` (tag or numeric) are attached at `store()` and applied at `check()` via `filter_expression`, e.g. a `user_id` tag to keep users' entries apart.
- Entry IDs are a SHA-256 of prompt plus filters, so the same prompt under different filters is a separate entry.
- `drop(ids|keys)` removes entries, `clear()` empties the cache, `delete()` also drops the index.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
