---
title: "Source: Santhanam et al. 2022: PLAID"
summary: "Paper describing PLAID, the ColBERTv2 search engine that prunes candidates using centroids, cutting latency up to 7x on GPU and 45x on CPU."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** research paper, arXiv:2205.09707
- **Author:** Keshav Santhanam, Omar Khattab, Christopher Potts, Matei Zaharia
- **Date:** 2022-05-19
- **Original:** [PLAID: An Efficient Engine for Late Interaction Retrieval](https://arxiv.org/abs/2205.09707)

## Summary

Exploits the centroids already present in ColBERTv2's compressed index: each passage is first treated as a cheap "bag of centroids", scored against the query, and pruned, so the expensive residual decompression and full MaxSim run only on a small survivor set.

## Key claims

- Centroid interaction quickly discards low-scoring passages; centroid pruning sparsifies each passage's bag of centroids.
- Up to 7x lower latency on GPU and 45x on CPU versus vanilla ColBERTv2, without quality loss.
- Tens of milliseconds on GPU and tens to a few hundred milliseconds on CPU at 140M passages.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
