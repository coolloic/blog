---
title: "Source: On the Theoretical Limitations of Embedding-Based Retrieval (Weller et al.)"
summary: "Google DeepMind paper proving that embedding dimension caps which top-k document sets a single-vector retriever can return, with the LIMIT benchmark to show it."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "papers"]
---

- **What:** research paper, arXiv:2508.21038 (ICLR 2026)
- **Authors:** Orion Weller, Michael Boratko, Iftekhar Naim, Jinhyuk Lee
- **Date:** submitted 28 August 2025; v2 revised 12 March 2026
- **Original:** [arxiv.org/abs/2508.21038](https://arxiv.org/abs/2508.21038)

## Summary

The paper argues that single-vector retrieval has a hard ceiling: for a given dimension, only a bounded number of distinct top-k result sets can be produced across all possible queries. The bound holds even when document vectors are optimized directly on the test set. A deliberately simple dataset, LIMIT, built to need many combinations, defeats state-of-the-art embedders.

## Key claims

- The number of top-k subsets realizable by queries is limited by embedding dimension.
- The limit holds with freely optimized embeddings, so more data or bigger models alone do not remove it.
- State-of-the-art embedding models fail on LIMIT despite its simple queries.
- The limitation is intrinsic to the single-vector paradigm and motivates other retrieval approaches.

## Feeds

[Embeddings](../concepts/embeddings.md)
