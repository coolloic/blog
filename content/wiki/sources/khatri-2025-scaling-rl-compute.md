---
title: "Source: The Art of Scaling Reinforcement Learning Compute for LLMs (Khatri et al., 2025)"
summary: "Meta-led 400,000 GPU-hour study fitting sigmoid compute-performance curves to LLM RL and proposing the ScaleRL recipe."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws", "rl"]
---

- **What:** research paper (arXiv:2510.13786)
- **Authors:** Devvrit Khatri, Lovish Madaan, Rishabh Tiwari, Rachit Bansal, Sai Surya Duvvuri, Manzil Zaheer, Inderjit S. Dhillon, David Brandfonbrener, Rishabh Agarwal
- **Date:** 2025-10-15
- **Original:** [arxiv.org/abs/2510.13786](https://arxiv.org/abs/2510.13786)

## Summary

Pretraining has power laws; RL post-training had no comparable predictive method. Using more than 400,000 GPU-hours, the authors fit sigmoid curves of validation performance against RL compute, separate design choices that raise the ceiling from ones that only change efficiency, and validate predictions on one run scaled to 100,000 GPU-hours.

## Key claims

- RL performance versus compute fits a sigmoid with an asymptote (ceiling) and an efficiency term.
- Recipes differ in their asymptote, not just their speed.
- Loss aggregation, normalisation, curriculum and off-policy algorithm mostly change compute efficiency, not the ceiling.
- Stable recipes follow predictable curves, so small runs can be extrapolated; the proposed ScaleRL recipe was validated this way.

## Feeds

[Scaling laws](../concepts/scaling-laws.md) · [LLM training pipeline](../concepts/llm-training-pipeline.md)
