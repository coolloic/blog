---
title: "Source: RouteLLM (Ong et al. 2024)"
summary: "Paper training routers on human preference data to send each query to a strong or weak LLM, cutting cost over 2x without quality loss."
category: source
lastmod: 2026-11-14
tags: ["models", "model-selection", "routing"]
---

- **What:** research paper (arXiv:2406.18665)
- **Publisher:** Isaac Ong, Amjad Almahairi, Vincent Wu, Wei-Lin Chiang, Tianhao Wu, Joseph E. Gonzalez, M Waleed Kadous, Ion Stoica
- **Date:** 2024-06-26 (v4 2025-02-23)
- **Original:** [arXiv:2406.18665](https://arxiv.org/abs/2406.18665)

## Summary

Frames model routing as a binary decision between a strong and a weak model made before generation, learned from preference data with augmentation.

## Key claims

- Routers predict, per query, whether the weak model's answer will be good enough.
- Trained on human preference data plus augmentation.
- Reports cost reductions of over 2x in some cases on standard benchmarks without hurting response quality.
- Routers kept working when the strong/weak pair was swapped at test time, suggesting transfer.

## Feeds

[Model selection](../concepts/model-selection.md)
