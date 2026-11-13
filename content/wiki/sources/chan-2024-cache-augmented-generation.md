---
title: "Source: Chan et al. 2024: Don't Do RAG, Cache-Augmented Generation"
summary: "WWW 2025 short paper proposing CAG: preload the whole knowledge base and precompute its KV cache instead of retrieving."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (WWW '25 short), arXiv:2412.15605
- **Author:** Brian J. Chan, Chao-Ting Chen, Jui-Hung Cheng, Hen-Hsen Huang
- **Date:** 2024-12-20 (v2 2025-02-23)
- **Original:** [Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks](https://arxiv.org/abs/2412.15605)

## Summary

When the knowledge base fits in a long context window, load it once, compute and store the model's KV cache, and answer every query from that cache with no retrieval step.

## Key claims

- Cache reset is done by truncating the appended query tokens rather than reloading the cache.
- Experiments: Llama 3.1 8B (128k context) on SQuAD and HotPotQA subsets of 21k to 85k tokens.
- CAG matched or beat sparse and dense RAG on BERTScore in most settings, e.g. 0.7951 vs 0.7676 on small HotPotQA; sparse RAG (top-5) won on the largest HotPotQA set (0.7535 vs 0.7407). The authors say only that the CAG advantage narrows with size, citing prior work on long-context degradation; they do not analyse this case.
- Precomputed cache cut generation time on large HotPotQA from about 92 s (in-context, no cache) to about 2.3 s.
- Limitation: everything must fit in the window; the authors suggest preloading a core and retrieving for edge cases.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
