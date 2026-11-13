---
title: "Source: Dhulipala et al. 2024: MUVERA"
summary: "Google Research paper that compresses a multi-vector set into one fixed-dimensional encoding so ordinary single-vector ANN can fetch candidates for MaxSim reranking."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** research paper, arXiv:2405.19504
- **Author:** Laxman Dhulipala, Majid Hadian, Rajesh Jayaram, Jason Lee, Vahab Mirrokni (Google Research)
- **Date:** 2024-05-29 (v2 2026-06-08)
- **Original:** [MUVERA: Multi-Vector Retrieval via Fixed Dimensional Encodings](https://arxiv.org/abs/2405.19504)

## Summary

Instead of building a special multi-vector index, MUVERA asymmetrically maps the query's and each document's vector sets to single Fixed Dimensional Encodings (FDEs) whose inner product approximates multi-vector (Chamfer/MaxSim) similarity. Any off-the-shelf maximum-inner-product search index can then retrieve candidates, which are reranked with exact MaxSim.

## Key claims

- First single-vector proxy for multi-vector similarity with theoretical approximation guarantees.
- Reaches the same recall as prior heuristics while retrieving 2-5x fewer candidates.
- On BEIR, averages 10% higher recall with 90% lower latency than the prior state-of-the-art implementation.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
