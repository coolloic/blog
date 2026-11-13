---
title: "Source: DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models"
summary: "DeepSeek's MoE design: many fine-grained routed experts plus always-on shared experts, the template later used by DeepSeek-V2/V3, Llama 4, Qwen and Kimi."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "paper", "deepseek"]
---

- **What:** paper, arXiv:2401.06066
- **Authors:** Damai Dai, Chengqi Deng, Chenggang Zhao and others (DeepSeek-AI)
- **Date:** 2024-01-11
- **Original:** [arXiv:2401.06066](https://arxiv.org/abs/2401.06066)

## Summary

Argues that conventional top-2-of-N MoE (GShard style) gives experts overlapping, unfocused knowledge. Proposes two changes: **fine-grained expert segmentation** (split each expert into smaller ones and activate more of them, keeping compute constant but allowing far more combinations) and **shared expert isolation** (a few experts process every token to hold common knowledge, so routed experts need not duplicate it).

## Key claims

- DeepSeekMoE 2B matches GShard 2.9B, which has 1.5x the expert parameters and compute.
- DeepSeekMoE 16B is comparable to LLaMA2 7B at about 40% of the compute.
- A preliminary 145B model is comparable to DeepSeek 67B at 28.5% of the compute.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
