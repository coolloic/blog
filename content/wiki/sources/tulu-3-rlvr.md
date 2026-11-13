---
title: "Source: Tulu 3 (Lambert et al., 2024) — RLVR"
summary: "Ai2's open post-training recipe that named Reinforcement Learning with Verifiable Rewards: RL against a correctness check instead of a learned reward model."
category: source
lastmod: 2026-11-14
tags: ["models", "training", "reasoning"]
---

- **What:** research paper / open post-training recipe (arXiv 2411.15124)
- **Authors:** Nathan Lambert, Jacob Morrison, Valentina Pyatkin, et al. (Allen Institute for AI)
- **Date:** 2024-11-22 (v5 2025-04-14)
- **Original:** [arXiv:2411.15124](https://arxiv.org/abs/2411.15124)

## Summary

Tulu 3 is a fully open post-training pipeline: SFT, then DPO, then a final stage the authors call Reinforcement Learning with Verifiable Rewards (RLVR). RLVR replaces the learned reward model of RLHF with a programmatic check of whether the completion is correct.

## Key claims

- RLVR gives a constant reward when a completion passes a verifiable check, and nothing otherwise. It trains on these verifiable rewards rather than on a reward model.
- Target domains: grade-school and competition math (GSM8K, MATH) and precise instruction following with checkable constraints (IFEval). Datasets for each are released.
- RLVR improved GSM8K, MATH and IFEval scores.

## Feeds

[Reasoning models](../concepts/reasoning-models.md)
