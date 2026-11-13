---
title: "Source: Vespa blog 2024: Scaling ColPali to billions of PDFs"
summary: "Vespa post showing binary quantization of ColPali patch vectors (32x smaller, about 16 KB per page) with Hamming-distance MaxSim and optional float re-ranking."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases", "multimodal"]
---

- **What:** vendor engineering blog post
- **Author/publisher:** Jo Kristian Bergum (Vespa.ai)
- **Date:** 2024-09-20
- **Original:** [Scaling ColPali to billions of PDFs with Vespa](https://blog.vespa.ai/scaling-colpali-to-billions/)

## Summary

Takes ColPali's 1,030 x 128-float vectors per page and binarizes each vector to 128 bits, then retrieves with a multi-vector HNSW index on Hamming distance and ranks with a Hamming-based MaxSim, optionally re-ranking the top hits with float query vectors.

## Key claims

- Binarization stores each 128-dim vector in 16 bytes, a 32x saving over float; about 16.5 KB (1,030 x 16 bytes) per page.
- DocVQA nDCG@5: float-float 52.4; binary-binary (Hamming) 49.5; binary plus float re-ranking 51.6.
- Hamming MaxSim ran about 3.5x faster than float dot products on one core in the latency test (the post elsewhere says about 4x).
- Candidate retrieval: one nearest-neighbour search per query token vector, results unioned, then MaxSim ranking, all on the content nodes in a single query.
- Page encoding benefits from a GPU; serving can run on CPU.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
