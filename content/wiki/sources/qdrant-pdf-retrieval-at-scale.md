---
title: "Source: Qdrant tutorial: PDF Retrieval at Scale (ColPali/ColQwen)"
summary: "Qdrant tutorial that makes ColPali/ColQwen indexing practical by HNSW-indexing row/column mean-pooled multivectors and reranking with the full multivector, which is stored without an HNSW graph."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases", "multimodal"]
---

- **What:** vendor tutorial
- **Author/publisher:** Qdrant
- **Date:** read 2026-11-14 (no publication date shown)
- **Original:** [PDF Retrieval at Scale](https://qdrant.tech/documentation/tutorials-search-engineering/pdf-retrieval-at-scale/)

## Summary

Shows why naive HNSW indexing of visual late-interaction vectors is slow, and a two-stage fix: mean-pool patch vectors by rows and by columns into small multivectors, index only those with HNSW, prefetch candidates from them, then rerank with the original full multivector.

## Key claims

- ColPali produces about 1,030 vectors per page; ColQwen about 700 (up to 768).
- Inserting one page into an HNSW graph costs on the order of 700 x 700 x 100, about 49 million vector comparisons; quantization saves memory but not these comparisons.
- Row and column mean pooling turns ColPali's 32x32 patch grid into 32 vectors each (special tokens appended back).
- Setup: `original` multivector with HNSW disabled (`m=0`) used only for reranking; two pooled multivectors with default HNSW; prefetch 100 from each, rerank, return top 10.
- Indexing is an order of magnitude faster with retrieval quality described as comparable (no numbers given).

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
