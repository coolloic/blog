---
title: "Source: GPTCache, an open-source semantic cache for LLM applications (Fu & Feng, 2023)"
summary: "Describes GPTCache's embedding-based semantic cache architecture and early hit/false-hit measurements, plus why negative hits limit production use."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "caching", "cost"]
---

- **What:** workshop paper, NLP-OSS 2023 (pp. 212-218)
- **Authors:** Bang Fu, Di Feng (Zilliz)
- **Date:** 2023-12-06
- **Original:** [ACL Anthology 2023.nlposs-1.24](https://aclanthology.org/2023.nlposs-1.24/)

## Summary

GPTCache sits in front of an LLM API: it embeds the incoming query, searches a vector store of past queries, and if a similar one is found returns the stored answer instead of calling the model. On a miss it calls the LLM and writes the result back.

## Key claims

- Six components: LLM adapter, pre-processor (picks the cache key, e.g. strips boilerplate prompt text or keeps only the last turn), embedding generator, cache manager (scalar store + vector store + LRU/FIFO eviction), similarity evaluator, post-processor.
- Pre-processing is critical: if long shared prompt text dominates the key, nearly every request will hit.
- Hit latency: about 0.3 s on a laptop versus about 3 s average for ChatGPT (intro), 0.20 s and 0.17 s in the experiment tables; the abstract claims 2-10x faster responses on hits, and hits consume no tokens.
- With a cosine similarity threshold of 0.7 (embeddings from `paraphrase-albert-small-v2`, a fine-tuned ALBERT similarity evaluator), 1,000 paraphrase queries gave 876 hits of which 39 were wrong ("negative hits"); a mixed 50/50 set of 1,160 queries gave 570 hits with 21 wrong. Correctness was judged by asking ChatGPT for a similarity score (positive at >= 0.7), on a small synthetic dataset.
- Embedding models tuned for search can rate opposite-meaning sentences as close, which is acceptable for search but not for a cache; even the best cache hit rates did not exceed 90% with current embedding models.
- Stricter similarity checks raise precision but lower hit rate; reaching about 99% correct hits without losing hit rate was judged unlikely. Long inputs are hard to key.
- Most useful for narrow domains, repetitive internal assistants, and large user groups with similar questions.

## Feeds

[Cost and latency optimization](../concepts/cost-and-latency-optimization.md)
