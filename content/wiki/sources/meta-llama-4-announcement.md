---
title: "Source: The Llama 4 herd (Meta AI blog)"
summary: "Meta's Llama 4 launch: Scout (109B/17B active, 16 experts) and Maverick (400B/17B active, 128 routed + 1 shared), Meta's first MoE models, with alternating dense and MoE layers."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "meta", "open-weight"]
---

- **What:** vendor engineering blog post
- **Publisher:** Meta AI
- **Date:** 2025-04-05
- **Original:** [The Llama 4 herd](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)

## Summary

Meta's switch from dense Llama 3 to MoE. Maverick alternates dense and MoE layers; in MoE layers each token goes to a shared expert plus exactly one of 128 routed experts. Meta stresses that all parameters stay in memory even though only a subset is active.

## Key claims

- Scout: 17B active, 109B total, 16 experts, 10M-token context; fits one H100 with Int4 quantisation.
- Maverick: 17B active, 400B total, 128 routed + 1 shared expert; fits one H100 DGX host.
- Behemoth (preview): 288B active, 16 experts, nearly 2T total; teacher for co-distilling Maverick; pre-trained in FP8 on 32K GPUs at 390 TFLOPs/GPU.
- Alternating dense and MoE layers is chosen for inference efficiency.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
