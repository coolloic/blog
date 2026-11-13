---
title: "Source: GPT Semantic Cache (Regmi & Pun, 2024)"
summary: "Reports that caching query embeddings in Redis and serving similar queries from cache cut LLM API calls by up to 68.8% with high precision on their test categories."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "caching", "cost"]
---

- **What:** arXiv preprint 2411.05276 (v3, revised 2024-12-09)
- **Authors:** Sajal Regmi, Chetan Phakami Pun
- **Date:** 2024-11-08
- **Original:** [arXiv:2411.05276](https://arxiv.org/abs/2411.05276)

## Summary

Stores embeddings of user queries in an in-memory store (Redis); when a new query is semantically close to a cached one, the stored response is returned without calling the LLM.

## Key claims

- Up to 68.8% fewer API calls across query categories.
- Cache hit rates of 61.6% to 68.8%.
- Over 97% of hits judged correct ("positive hits") on their evaluation sets.

## Feeds

[Cost and latency optimization](../concepts/cost-and-latency-optimization.md)
