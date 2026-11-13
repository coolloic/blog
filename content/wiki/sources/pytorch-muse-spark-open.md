---
title: "Source: Muse Spark Is Now an Open-Weights Model (PyTorch blog)"
summary: "Meta's announcement of Muse Spark Open: an 816B/42B-active multimodal MoE with 1M context under the custom Muse Model License."
category: source
lastmod: 2026-11-14
tags: ["models", "meta", "open-weight"]
---

- **What:** vendor engineering blog post
- **Publisher:** PyTorch Team at Meta
- **Date:** 2026-10-15
- **Original:** [Muse Spark Is Now an Open-Weights Model](https://pytorch.org/blog/muse-spark-open/)

## Summary

Announces open weights for Muse Spark, Meta's post-Llama model family, with extra safety post-training for standalone use, Helion kernels for SGLang and TorchTitan fine-tuning support.

## Key claims

- 816B total / 42B active parameters, 1M-token context, natively multimodal (image, audio, audio-video, documents).
- Released on Hugging Face under the Muse Model License (not an OSI licence).
- Shares a base model with the hosted Muse Spark 1.3; coding- and agent-optimised.
- Additional safety post-training targets robustness when deployed without system guardrails.
- Optimised on SGLang and vLLM across NVIDIA, AMD and Intel; TorchTitan supports SFT, LoRA and RL.
- Meta previously released Muse Glimmer, a small dense open model.

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
