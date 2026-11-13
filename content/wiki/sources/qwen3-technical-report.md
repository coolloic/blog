---
title: "Source: Qwen3 Technical Report and launch blog"
summary: "Qwen3's MoE models (235B-A22B, 30B-A3B): 128 fine-grained experts with 8 active, no shared experts, and a global-batch load-balancing loss."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "paper", "qwen"]
---

- **What:** technical report (arXiv:2505.09388) plus the launch blog post
- **Author:** Qwen Team (Alibaba)
- **Date:** blog 2025-04-29; report 2025-05-14
- **Original:** [Qwen3 Technical Report](https://arxiv.org/abs/2505.09388) · [Qwen3 blog](https://qwenlm.github.io/blog/qwen3/)

## Summary

Qwen3 shipped dense models alongside two MoE models that share the dense architecture except for the FFN. The MoE design follows fine-grained segmentation but, unlike Qwen2.5-MoE, drops shared experts, and balances load with a loss computed over the global batch rather than per sequence to encourage specialisation.

## Key claims

- Qwen3-235B-A22B: 235B total / 22B active, 94 layers, 64 Q / 4 KV heads, 128 experts with 8 active, 128K context.
- Qwen3-30B-A3B: 30B total / 3B active, 48 layers, 32 Q / 4 KV heads, 128 experts with 8 active, 128K context.
- No shared experts (a change from Qwen2.5-MoE); global-batch load-balancing loss.
- The blog claims the MoE base models match Qwen2.5 dense base models with about 10% of the active parameters; the report says an MoE with 1/5 the activated parameters of a dense model performs similarly on the same data.
- Qwen3-30B-A3B beats Qwen2.5-14B and matches Qwen3-14B / Qwen2.5-32B; Qwen3-235B-A22B uses ~60% of DeepSeek-R1's active and ~35% of its total parameters yet beats it on 17 of 23 benchmarks in thinking mode (vendor-reported).

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
