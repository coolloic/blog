---
title: "Source: EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test"
summary: "Paper on the third generation of EAGLE draft heads, which fuse multi-layer target features and predict tokens directly."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper, arXiv:2503.01840
- **Author:** Yuhui Li, Fangyun Wei, Chao Zhang, Hongyang Zhang
- **Date:** 2025-03-03
- **Original:** [EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test](https://arxiv.org/abs/2503.01840)

## Summary

EAGLE drafts using the target model's own hidden features. EAGLE-3 drops feature prediction, predicts tokens directly from a fusion of low, middle and top layer features, and trains with a technique the authors call training-time test so the draft scales with more training data.

## Key claims

- Up to 6.5x speedup over vanilla decoding, about 1.4x over EAGLE-2.
- 1.38x throughput gain at batch size 64 inside SGLang.
- Multi-layer feature fusion replaces top-layer-only features.

## Feeds

[Speculative decoding](../concepts/speculative-decoding.md)
