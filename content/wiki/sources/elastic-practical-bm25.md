---
title: "Source: Elastic: Practical BM25, Part 2"
summary: "Elastic blog explaining the BM25 formula's IDF, term-frequency saturation (k1) and length normalization (b)."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor engineering blog post
- **Author:** Shane Connelly (Elastic)
- **Date:** 2018-04-19
- **Original:** [Practical BM25 - Part 2: The BM25 Algorithm and its Variables](https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables)

## Summary

Walks through each component of BM25, the default ranking function in Lucene-based engines, and what its two free parameters do.

## Key claims

- IDF down-weights terms that appear in many documents, so rare terms dominate the score.
- k1 (default 1.2) controls term-frequency saturation: lower values make repeated occurrences stop adding score sooner.
- b (default 0.75) controls document-length normalization: 0 disables it, higher values penalize long documents more.
- BM25 is a bag-of-words model: it scores exact term matches and knows nothing about meaning.

## Feeds

[Hybrid search](../concepts/hybrid-search.md)
