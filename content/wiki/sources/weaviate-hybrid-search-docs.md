---
title: "Source: Weaviate docs: Hybrid search"
summary: "Weaviate documentation for hybrid BM25 + vector queries: alpha weighting, fusion methods and thresholds."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor documentation
- **Author:** Weaviate
- **Date:** read 2026-11-14
- **Original:** [Hybrid search](https://docs.weaviate.io/weaviate/search/hybrid)

## Summary

Reference for running a keyword (BM25) search and a vector search in one query and fusing the results.

## Key claims

- `alpha` weights the two sides: 1 is pure vector, 0 is pure keyword.
- Two fusion methods: Ranked Fusion (by rank) and Relative Score Fusion (by normalized score); Relative Score Fusion is the default since v1.24.
- `maxVectorDistance` is the only threshold and applies only to the vector side.
- `queryProperties` restricts and boosts (e.g. `question^2`) the fields the keyword side searches.

## Feeds

[Hybrid search](../concepts/hybrid-search.md)
