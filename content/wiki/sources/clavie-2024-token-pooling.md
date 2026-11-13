---
title: "Source: Clavié et al. 2024: Token Pooling for Multi-Vector Retrieval"
summary: "Answer.AI paper showing that clustering and mean-pooling similar document token vectors at index time cuts ColBERT storage by 50% with almost no loss."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** research paper, arXiv:2409.14683
- **Author:** Benjamin Clavié, Antoine Chaffin, Griffin Adams (Answer.AI)
- **Date:** 2024-09-23
- **Original:** [Reducing the Footprint of Multi-Vector Retrieval with Minimal Performance Impact via Token Pooling](https://arxiv.org/abs/2409.14683)

## Summary

Clusters each document's token vectors (hierarchical clustering) and replaces each cluster by its mean, so fewer vectors are stored. It is an index-time step: no model change, no query-time work.

## Key claims

- Halving the vector count (pool factor 2) gives virtually no retrieval degradation.
- Reducing vector count by 66-75% (pool factors 3-4) keeps degradation under 5% on most datasets.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
