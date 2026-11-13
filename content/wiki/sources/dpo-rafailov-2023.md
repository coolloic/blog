---
title: "Source: Direct Preference Optimization (DPO)"
summary: "The 2023 Stanford paper showing RLHF's objective can be optimised with a classification loss on preference pairs."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2305.18290, NeurIPS 2023)
- **Author:** Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn (Stanford)
- **Date:** 2023-05-29 (v3 2024-07-29)
- **Original:** [arXiv:2305.18290](https://arxiv.org/abs/2305.18290)

## Summary

Reparameterises the KL-constrained RLHF reward so the optimal policy has a closed form. The policy itself then acts as an implicit reward model, and preferences can be fit with a logistic loss on log-probability ratios against a frozen reference, with no reward model, no sampling and no RL loop.

## Key claims

- Implicit reward is β·log(πθ(y|x)/πref(y|x)); the loss is −log σ of the chosen-minus-rejected reward difference.
- β controls deviation from the reference policy, which is the SFT model; the policy is also initialised from it.
- The gradient weights each pair by how wrongly the implicit reward orders it; dropping this weighting caused degeneration.
- Defaults used: β = 0.1 (0.5 for TL;DR summarisation), learning rate 1e-6, batch 64.
- Beat PPO-based RLHF on sentiment control and matched or improved it on summarisation and single-turn dialogue, with a better reward-vs-KL frontier.

## Feeds

[Preference optimization](../concepts/preference-optimization.md)
