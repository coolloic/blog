---
title: "Source: RLAIF vs. RLHF"
summary: "Google's 2023 study finding that AI-labelled preferences can match human preferences for RL fine-tuning."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2309.00267, ICML 2024)
- **Author:** Harrison Lee, Samrat Phatale, Hassan Mansoor, et al. (Google)
- **Date:** 2023-09-01 (rev. 2024-09-03)
- **Original:** [arXiv:2309.00267](https://arxiv.org/abs/2309.00267)

## Summary

Compares RL from AI feedback with RL from human feedback on summarisation, helpful dialogue and harmless dialogue, and proposes direct RLAIF, which skips the reward model and asks an LLM for rewards during RL.

## Key claims

- RLAIF performs about as well as RLHF on the three tasks tested.
- RLAIF beat the SFT baseline even when the labeller was the same size as, or the same checkpoint as, the policy.
- Direct RLAIF (rewards straight from an LLM, no reward model) outperformed standard RLAIF.

## Feeds

[Preference optimization](../concepts/preference-optimization.md)
