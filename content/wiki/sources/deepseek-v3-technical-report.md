---
title: "Source: DeepSeek-V3 Technical Report"
summary: "DeepSeek-V3 (671B total / 37B active): 256 fine-grained routed experts + 1 shared, auxiliary-loss-free load balancing, node-limited routing, FP8 training and expert-parallel deployment."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "paper", "deepseek"]
---

- **What:** technical report, arXiv:2412.19437
- **Author:** DeepSeek-AI
- **Date:** 2024-12-27 (v2 2025-02)
- **Original:** [arXiv:2412.19437](https://arxiv.org/abs/2412.19437)

## Summary

The base model behind DeepSeek-R1 and the most detailed public description of a frontier-scale MoE. It combines Multi-head Latent Attention with DeepSeekMoE, replaces the usual auxiliary balancing loss with a per-expert bias adjusted online, trains in FP8, and documents the exact parallel layouts used for training and for serving.

## Key claims

- **Shape:** 671B total, 37B active; 61 layers, hidden 7168; all FFNs except the first three are MoE; each MoE layer has 1 shared + 256 routed experts (intermediate dim 2048), 8 routed active per token. Pre-trained on 14.8T tokens for 2.664M H800 GPU hours; 2.788M including context extension (119K) and post-training (5K).
- **Gating:** sigmoid affinities (V2 used softmax), top-8 selected, then normalised among the selected.
- **Node-limited routing:** each token goes to experts on at most 4 nodes, bounding cross-node traffic.
- **Auxiliary-loss-free balancing:** a bias per expert is added to affinities only for top-k selection (not to the gate weight); after each step it is lowered by gamma for overloaded and raised for underloaded experts (gamma = 0.001 for most of training). A tiny sequence-wise balance loss (alpha = 0.0001) prevents extreme imbalance within one sequence.
- **No token dropping** in training or inference.
- **Ablation:** aux-loss-free beat aux-loss balancing on most benchmarks at 16B and 229B scale (e.g. HumanEval 40.2 to 46.3 at the large scale), and produced stronger expert specialisation; batch-wise balancing beat sequence-wise because it constrains specialisation less.
- **FP8 training:** E4M3 GEMMs with 1x128 activation tiles and 128x128 weight blocks; relative loss error vs BF16 under 0.25%.
- **Training parallelism:** 2048 H800s, 16-way pipeline (DualPipe), 64-way expert parallelism across 8 nodes, ZeRO-1 data parallelism, no tensor parallelism; all-to-all runs IB across nodes then NVLink within.
- **Serving:** prefill unit 4 nodes / 32 GPUs (attention TP4+DP8, MoE EP32, 32 redundant experts rebalanced from load statistics ~every 10 minutes); decode unit 40 nodes / 320 GPUs (EP320, one expert per GPU, 64 GPUs for redundant and shared experts). The shared expert is treated as an always-selected routed expert, so each token touches 9 experts.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
