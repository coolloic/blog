---
title: "Source: YaRN: Efficient Context Window Extension (Peng et al., 2023)"
summary: "A RoPE-scaling method that extends a model's usable context with a small amount of fine-tuning."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 2309.00071)
- **Author:** Bowen Peng, Jeffrey Quesnelle, Honglu Fan, Enrico Shippole
- **Date:** 2023-08-31 (v1); revised 2026-02-06 (v3)
- **Original:** [arXiv:2309.00071](https://arxiv.org/abs/2309.00071)

## Summary

Models trained with RoPE break down on sequences longer than those seen in training, because they meet rotation angles they never learned. YaRN rescales RoPE frequencies (treating high- and low-frequency dimensions differently) and adjusts attention temperature, then fine-tunes briefly, so a model trained at one length can work at a much longer one.

## Key claims

- RoPE models fail to generalise past their training sequence length.
- YaRN extends context with about 10x fewer tokens and 2.5x fewer training steps than earlier methods.
- Fine-tuned LLaMA models can use and extrapolate to contexts much longer than their pre-training length, even beyond the fine-tuning length.

## Feeds

[Transformer architecture](../concepts/transformer-architecture.md) · [Context window](../concepts/context-window.md)
