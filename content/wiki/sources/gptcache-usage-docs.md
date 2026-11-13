---
title: "Source: GPTCache usage documentation"
summary: "GPTCache's library docs: Config similarity_threshold, temperature-driven cache skipping, cache_skip, sessions, and pluggable scalar/vector stores with LRU or FIFO eviction."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching"]
---

- **What:** official library documentation ("Usage")
- **Publisher:** Zilliz (GPTCache project)
- **Date:** accessed 2026-11-14 (project largely unchanged since 2023-2024)
- **Original:** [gptcache.readthedocs.io usage](https://gptcache.readthedocs.io/en/latest/usage.html)

## Summary

How to configure the GPTCache library that the [GPTCache paper](gptcache-2023.md) describes: it wraps an OpenAI-style client and inserts cache lookup and write-back around the call.

## Key claims

- `Config(similarity_threshold=...)` sets how close embeddings must be for a hit; the page gives no default or range (its example uses 1).
- `temperature` (0-2, default 0) doubles as a cache knob: the higher it is, the more likely the cache lookup is skipped; at 2 it is always skipped. The page says the default post-processor is `temperature_softmax`, but the `Cache.init` signature it shows lists `post_process_messages_func=first`, so check the installed version.
- `cache_skip=True` bypasses lookup but still writes the fresh answer to the cache.
- `Session` objects let you scope and apply rules to hits per conversation.
- Data manager = scalar store (SQLite, MySQL, PostgreSQL) + vector store (FAISS, Milvus) with `max_size` and `eviction='LRU'|'FIFO'` by entry count.
- The docs are inconsistent on the evaluator argument name (`similarity_evaluation` vs `evaluation_func`), so check the installed version.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
