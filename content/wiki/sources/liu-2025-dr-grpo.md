---
title: "Source: Understanding R1-Zero-Like Training (Dr. GRPO)"
summary: "2025 Sea AI Lab / NUS paper showing GRPO's normalisation biases inflate response length, proposing Dr. GRPO, and questioning how much 'emergent' reasoning comes from the base model."
category: source
lastmod: 2026-11-14
tags: ["training", "reasoning"]
---

- **What:** research paper (arXiv:2503.20783)
- **Author:** Zichen Liu, Changyu Chen, Wenjun Li, Penghui Qi, Tianyu Pang, Chao Du, Wee Sun Lee, Min Lin
- **Date:** 2025-03-26 (v2 2025-10-06)
- **Original:** [arXiv:2503.20783](https://arxiv.org/abs/2503.20783)

## Summary

A critical look at R1-Zero-style RL that examines both the base models and the algorithm. The paper finds an optimisation bias in GRPO that makes responses longer, especially wrong ones. It proposes an unbiased variant, Dr. GRPO ("GRPO Done Right").

## Key claims

- GRPO's normalisation terms (dividing by response length, and by the group's reward standard deviation) bias the optimisation. The effect inflates the length of incorrect responses.
- Dr. GRPO removes the bias. It improves token efficiency and keeps reasoning accuracy the same.
- A minimal R1-Zero recipe reached 43.3% on AIME 2024 with a 7B base model.
- DeepSeek-V3-Base already shows "aha moment" self-reflection before any RL.
- Qwen2.5 base models reason well even without a prompt template, which suggests pre-training biases. RL gains measured on these models may partly reflect what was already there.

## Feeds

[Reinforcement fine-tuning](../concepts/reinforcement-fine-tuning.md)
