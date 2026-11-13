---
title: "Source: gpt-oss-120b & gpt-oss-20b Model Card (arXiv)"
summary: "OpenAI's technical model card for gpt-oss: per-component parameter counts, 128/32 experts with top-4 routing, and MXFP4-quantised expert weights that fit 120b on one 80GB GPU."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "openai", "open-weight"]
---

- **What:** technical model card, arXiv:2508.10925
- **Publisher:** OpenAI
- **Date:** 2025-08 (models released 2025-08-05)
- **Original:** [arXiv:2508.10925](https://arxiv.org/abs/2508.10925)

## Summary

The architecture appendix to OpenAI's open-weight reasoning models. It is the clearest public breakdown of where an MoE's parameters live: almost all of them sit in the expert MLPs, which is why quantising only the experts shrinks the checkpoint so much. Complements the Hugging Face card summarised in [gpt-oss model card](gpt-oss-model-card.md).

## Key claims

- 120b: 36 layers, 128 experts per MoE block; 20b: 24 layers, 32 experts. Both route each token to the top-4 experts and weight outputs by a softmax over the selected router scores. Experts are gated SwiGLU (with clamping and a residual connection).
- Attention alternates 128-token banded-window and dense layers; 64 query heads, GQA with 8 KV heads; YaRN extends dense layers to 131,072 tokens.
- Parameters (120b / 20b): MLP 114.71B / 19.12B; attention 0.96B / 0.64B; embed+unembed 1.16B / 1.16B; active 5.13B / 3.61B; total 116.83B / 20.91B.
- MoE weights (90%+ of parameters) are quantised to MXFP4 at 4.25 bits/parameter; checkpoints are 60.8 GiB and 12.8 GiB.
- 120b fits a single 80GB GPU; 20b runs in 16GB of memory.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
