---
title: "Source: Unsloth Faster MoE training docs"
summary: "Unsloth's MoE fine-tuning guide: grouped-GEMM and split-LoRA kernels, VRAM figures for gpt-oss and Qwen3 MoE, router frozen by default, and no 4-bit QLoRA for MoE."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "fine-tuning"]
---

- **What:** official documentation
- **Publisher:** Unsloth
- **Date:** describes the February 2026 release (transformers 5.1, TRL 0.27); accessed 2026-11-14
- **Original:** [Faster MoE](https://unsloth.ai/docs/basics/faster-moe)

## Summary

Explains why MoE fine-tuning in stock Transformers was slow (looping over experts) and how Unsloth uses grouped GEMMs (`torch._grouped_mm` plus Triton kernels) and a "split LoRA" that avoids materialising a full LoRA delta for every expert. Gives practical defaults for LoRA on MoE models.

## Key claims

- Claims ~12x faster MoE training, >35% less VRAM and ~6x longer context vs older Transformers, with no accuracy loss (vendor-reported).
- gpt-oss-20b fine-tunes in 12.8 GB VRAM; Qwen3-30B-A3B with 16-bit LoRA uses 63 GB.
- Supported: Qwen3 MoE variants, gpt-oss 20B/120B, GLM 4.5-4.7, DeepSeek V3/R1/V3.1/V3.2.
- The router layer is frozen by default: Unsloth considers fine-tuning it a bad idea.
- Example LoRA targets attention projections plus `gate_up_proj` and `down_proj`, which covers the expert layers; rank 16, alpha 2x rank.
- 4-bit QLoRA is not recommended for MoE because bitsandbytes does not support it; use bf16 LoRA or full fine-tuning.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
