---
title: "Source: Unsloth — LoRA Hyperparameters Guide"
summary: "Unsloth's practical guide to choosing LoRA/QLoRA hyperparameters, plus its speed and memory claims."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** vendor documentation
- **Author:** Unsloth AI
- **Date:** read 2026-11-14
- **Original:** [LoRA Hyperparameters Guide](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide/lora-hyperparameters-guide)

## Summary

Gives starting values for LoRA hyperparameters, explains overfitting and underfitting symptoms, and compares 16-bit LoRA with 4-bit QLoRA. Unsloth's project page claims about 2× faster training with up to 70% less VRAM.

## Key claims

- Start: LR 2e-4 for LoRA/QLoRA (5e-6 for DPO/GRPO), 1–3 epochs, r = 16 or 32, α = r or 2r, dropout 0, effective batch 16, warmup 5–10%.
- Target all seven projections: q, k, v, o, gate, up, down.
- Train on completions only (mask user tokens) for a small accuracy gain, larger in multi-turn data.
- QLoRA uses roughly 4× less VRAM than 16-bit LoRA at slightly lower speed and accuracy.
- Training loss below ~0.2 signals overfitting; remedies include lower LR, fewer epochs, more data, early stopping.
- Claims: ~2× faster, up to 70% less VRAM, 70B QLoRA in under 48 GB (project README, read 2026-11-14).

## Feeds

[PEFT and LoRA](../concepts/peft-and-lora.md) · [Fine-tuning](../concepts/fine-tuning.md)
