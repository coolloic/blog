---
title: "Source: LoRA Without Regret (Thinking Machines)"
summary: "John Schulman and Thinking Machines Lab's 2025 study of when LoRA matches full fine-tuning."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** engineering blog post
- **Author:** John Schulman and Thinking Machines Lab
- **Date:** 2025-09-29
- **Original:** [LoRA Without Regret](https://thinkingmachines.ai/blog/lora/)

## Summary

Experiments mapping the regime where LoRA matches full fine-tuning: small-to-medium supervised datasets and reinforcement learning, provided LoRA covers all layers and uses a higher learning rate.

## Key claims

- LoRA reaches full fine-tuning loss on small-to-medium SFT datasets; it falls behind once data exceeds adapter capacity.
- Apply LoRA to all weight matrices, especially MLP/MoE layers; attention-only LoRA underperforms even at matched parameter count.
- Optimal LoRA learning rate is about 10× the full fine-tuning rate, roughly constant across ranks.
- LoRA tolerates large batch sizes worse than full fine-tuning, and raising rank does not fix it.
- For RL, LoRA matches full fine-tuning even at rank 1, since policy gradients carry little information per episode.

## Feeds

[PEFT and LoRA](../concepts/peft-and-lora.md) · [Preference optimization](../concepts/preference-optimization.md)
