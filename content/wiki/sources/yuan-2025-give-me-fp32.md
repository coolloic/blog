---
title: "Source: Give Me FP32 or Give Me Death? Challenges and Solutions for Reproducible Reasoning (Yuan et al., 2025)"
summary: "Paper showing that batch size, GPU count and GPU type change greedy-decoding results under BF16, with up to 9% accuracy spread on reasoning models; FP32 nearly eliminates it and LayerCast is proposed as a cheaper middle ground."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** research paper (arXiv 2506.09501)
- **Author:** Jiayi Yuan, Hao Li, Xinheng Ding, Wenya Xie, Yu-Jhe Li, Wentian Zhao, Kun Wan, Jing Shi, Xia Hu, Zirui Liu (Rice University, University of Minnesota, Adobe)
- **Date:** v1 11 June 2025
- **Original:** [arxiv.org/abs/2506.09501](https://arxiv.org/abs/2506.09501)

## Summary

Measures how much "deterministic" greedy decoding changes when only the serving configuration changes, across 12 configurations (2 GPU types: L40S and A100; 2 GPU counts; batch sizes 8/16/32). Attributes the spread to non-associative floating-point arithmetic at limited precision, and shows numerical precision is the main lever.

## Key claims

- Models: DeepSeek-R1-Distill-Qwen-7B, DeepSeek-R1-Distill-Llama-8B, Qwen2.5-7B-Instruct, Llama-3.1-8B-Instruct; benchmarks AIME'24, MATH500, LiveCodeBench.
- Under BF16 greedy decoding, accuracy standard deviation on AIME'24 reached 9.15% (R1-Distill-Qwen-7B); FP16 5.74%; FP32 0.
- Response length varied by up to roughly 9,000 tokens (std) under BF16 on AIME'24 for the same model; FP32 gave 0 there.
- The reasoning (R1-distilled) models, which emit long outputs, produced the headline spreads (AIME'24 accuracy and length).
- LayerCast: keep weights in BF16, upcast to FP32 just before each matmul, compute in FP32; about 34% less memory than full FP32, released as a vLLM patch.
- Recommendations: with compute to spare, sample at non-zero temperature over multiple runs and report error bars; for single-run greedy evaluation, use FP32.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)
