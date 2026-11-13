---
title: "Source: Hybrid LLM, cost-efficient and quality-aware query routing (Ding et al., ICLR 2024)"
summary: "Paper routing each query to a small or large model by predicted difficulty, with a quality knob tunable at test time; up to 40% fewer large-model calls without quality loss."
category: source
lastmod: 2026-11-14
tags: ["platforms", "routing", "cost"]
---

- **What:** research paper, ICLR 2024 (arXiv:2404.14618)
- **Authors:** Dujian Ding, Ankur Mallick, Chi Wang, Robert Sim, Subhabrata Mukherjee, Victor Ruhle, Laks V.S. Lakshmanan, Ahmed Hassan Awadallah
- **Date:** 2024-04-22 (arXiv)
- **Original:** [arXiv:2404.14618](https://arxiv.org/abs/2404.14618)

## Summary

A pre-generation router predicts whether a query is easy enough for a small model given a desired quality level, so the expensive model is called only when needed.

## Key claims

- Routing is based on predicted query difficulty and a target quality level.
- Up to 40% fewer calls to the large model with no drop in response quality.
- The quality level can be changed at test time to trade quality for cost without retraining.

## Feeds

[Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
