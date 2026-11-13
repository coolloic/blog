---
title: "Source: Chen et al. 2024: BGE-M3 (M3-Embedding)"
summary: "BAAI paper on one embedding model that emits dense, sparse and multi-vector (late-interaction) representations, multilingual, up to 8,192 tokens."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "papers"]
---

- **What:** research paper, arXiv:2402.03216
- **Author:** Jianlv Chen, Shitao Xiao, Peitian Zhang, Kun Luo, Defu Lian, Zheng Liu (BAAI)
- **Date:** 2024-02-05
- **Original:** [M3-Embedding: Multi-Linguality, Multi-Functionality, Multi-Granularity Text Embeddings Through Self-Knowledge Distillation](https://arxiv.org/abs/2402.03216)

## Summary

A single model (released as BGE-M3) that can serve dense retrieval, sparse lexical retrieval and multi-vector retrieval from one forward pass, trained with self-knowledge distillation where the combined scores of the three modes teach each mode.

## Key claims

- Three retrieval functions: dense, multi-vector and sparse.
- Over 100 working languages; inputs from sentences up to 8,192-token documents.
- Self-knowledge distillation uses relevance scores from the different modes as a teacher signal.
- Reported state-of-the-art results on multilingual, cross-lingual and long-document retrieval at release.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
