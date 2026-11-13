---
title: "Source: DeepSeekMath and GRPO"
summary: "The 2024 DeepSeek paper that introduced Group Relative Policy Optimization, a critic-free PPO variant."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2402.03300)
- **Author:** Zhihong Shao, Peiyi Wang, Qihao Zhu, et al. (DeepSeek-AI)
- **Date:** 2024-02-05 (v3 2024-04-27)
- **Original:** [arXiv:2402.03300](https://arxiv.org/abs/2402.03300)

## Summary

Presents DeepSeekMath 7B (51.7% on MATH without tools) and GRPO. GRPO drops PPO's learned value model and instead uses the mean and standard deviation of rewards over a group of sampled answers to the same question as the baseline.

## Key claims

- For each question, sample G outputs; advantage of each = (r − mean(r)) / std(r) of the group.
- No critic: PPO's value model is usually as large as the policy, so dropping it saves substantial memory and compute.
- KL to the reference model is added directly to the loss (via an unbiased, always-positive estimator) rather than folded into the reward.
- Supports outcome supervision (one reward per answer) and process supervision (reward per reasoning step).
- Training used 64 samples per question and KL coefficient 0.04.
- RL improved Maj@K but not Pass@K: it makes correct answers more likely rather than adding new capability.

## Feeds

[Preference optimization](../concepts/preference-optimization.md)
