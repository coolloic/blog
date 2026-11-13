---
title: "Source: FlashAttention (Dao et al., 2022)"
summary: "An exact attention algorithm that tiles computation to cut GPU memory traffic, making long sequences faster and cheaper."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 2205.14135)
- **Author:** Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré
- **Date:** 2022-05-27 (v1); revised 2022-06-23 (v2)
- **Original:** [arXiv:2205.14135](https://arxiv.org/abs/2205.14135)

## Summary

Standard attention materialises the full N x N score matrix in GPU high-bandwidth memory (HBM), so time and memory grow quadratically with sequence length and the kernel is bound by memory reads and writes. FlashAttention computes the same exact result in tiles that fit in fast on-chip SRAM, never writing the full matrix out. It is an implementation optimisation, not an approximation.

## Key claims

- Attention algorithms should be IO-aware: count reads/writes between HBM and on-chip SRAM, not just FLOPs.
- Tiling reduces HBM accesses versus standard attention, and is optimal for a range of SRAM sizes.
- Reported speedups: 15% end-to-end on BERT-large (seq 512), 3x on GPT-2 (seq 1K), 2.4x on Long-Range Arena.
- Cheaper attention enables longer context, improving GPT-2 perplexity by 0.7 and long-document classification by 6.4 points.

## Feeds

[Transformer architecture](../concepts/transformer-architecture.md) · [Context window](../concepts/context-window.md)
