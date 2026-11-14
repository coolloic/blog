---
title: "Source: Towards Deterministic Inference in SGLang and Reproducible RL Training (LMSYS)"
summary: "SGLang team's post adding a deterministic-inference mode built on batch-invariant kernels, with seeded sampling, CUDA-graph support, overhead benchmarks and an RL reproducibility recipe."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** engineering blog post
- **Author:** The SGLang Team (LMSYS)
- **Date:** 22 September 2025 (updated 24 September 2025)
- **Original:** [lmsys.org/blog/2025-09-22-sglang-deterministic](https://lmsys.org/blog/2025-09-22-sglang-deterministic/)

## Summary

Builds on Thinking Machines' batch-invariant operators to give SGLang a deterministic mode, extends it to chunked prefill, CUDA graphs and seeded non-greedy sampling, measures the cost, and uses it to make RL training runs reproducible end to end.

## Key claims

- Enabled with `--enable-deterministic-inference` plus an attention backend of flashinfer, fa3 or triton (SGLang 0.5.3+).
- Attention uses a fixed split-KV size; chunked-prefill boundaries are aligned to multiples of that size; FA3 fixes the number of splits to 1.
- Per-request seeds make sampling at temperature > 0 deterministic: seeded Gumbel noise replaces `torch.multinomial`.
- In 50-trial tests on Qwen3-8B, normal mode produced several distinct outputs; deterministic mode produced one in every test.
- Overhead on Qwen3-8B (H200, 256 requests): roughly +24% to +55% latency depending on backend and length; FlashInfer and FA3 average 34.35% slowdown, versus 61.5% reported by Thinking Machines. CUDA graphs give about 2.8x speedup within deterministic mode.
- Limits at publication: dense models only (MoE planned), deterministic only at TP1/TP2, radix cache support incomplete; recommended mainly for debugging and reproducibility.
- Reproducible RL training also needed deterministic training settings (e.g. Megatron deterministic mode, `NCCL_ALGO=Ring`, `torch.use_deterministic_algorithms(True)`).

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)
