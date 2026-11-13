---
title: "Source: LoRA: Low-Rank Adaptation of Large Language Models"
summary: "The 2021 Microsoft paper introducing LoRA: frozen weights plus trainable low-rank update matrices."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2106.09685, ICLR 2022)
- **Author:** Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen (Microsoft)
- **Date:** 2021-06-17 (v2 2021-10-16)
- **Original:** [arXiv:2106.09685](https://arxiv.org/abs/2106.09685)

## Summary

Hypothesises that the weight change during adaptation has low intrinsic rank, so it can be represented as a product of two thin matrices. Pre-trained weights stay frozen; only the low-rank factors are trained. The update can be merged into the weights after training, so inference costs nothing extra.

## Key claims

- Forward pass becomes h = W0·x + B·A·x, with B (d×r) and A (r×k), r ≪ min(d,k).
- A is initialised Gaussian and B to zero, so the update starts at zero; ΔW·x is scaled by α/r, and α is set once and not tuned.
- On GPT-3 175B: ~10,000× fewer trainable parameters, training VRAM 1.2 TB → 350 GB, checkpoint 350 GB → 35 MB (r=4, Wq and Wv only), ~25% faster training.
- Matches or beats full fine-tuning on RoBERTa, DeBERTa, GPT-2 and GPT-3 in their experiments; very low ranks (even r=1) sufficed for some GPT-3 tasks.
- Merging B·A into W removes inference latency, but then batching requests for different adapters in one forward pass is not straightforward.
- Experiments adapted only attention weights; MLP adaptation was left to future work.

## Feeds

[PEFT and LoRA](../concepts/peft-and-lora.md) · [Fine-tuning](../concepts/fine-tuning.md)
