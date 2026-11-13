---
title: "Source: Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads"
summary: "Paper adding extra decoding heads plus tree attention as a draft-model-free form of speculative decoding."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper, arXiv:2401.10774
- **Author:** Tianle Cai, Yuhong Li, Zhengyang Geng, Hongwu Peng, Jason D. Lee, Deming Chen, Tri Dao
- **Date:** 2024-01-19
- **Original:** [Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads](https://arxiv.org/abs/2401.10774)

## Summary

Instead of a separate draft model, Medusa attaches several extra heads to the target model, each predicting a token further ahead; candidate continuations form a tree verified in one pass with tree attention.

## Key claims

- Extra decoding heads predict several future tokens in parallel; no separate draft model to obtain and maintain.
- Tree-based attention verifies multiple candidate continuations in one step.
- Medusa-1 (frozen backbone) is lossless with over 2.2x speedup; Medusa-2 (joint fine-tune) reaches 2.3-3.6x but needs a careful recipe.
- Typical acceptance raises acceptance rate while aiming to maintain quality (not exactly distribution-preserving).

## Feeds

[Speculative decoding](../concepts/speculative-decoding.md)
