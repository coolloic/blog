---
title: "Source: vLLM docs: Batch Invariance"
summary: "vLLM's documentation for its beta batch-invariant mode (VLLM_BATCH_INVARIANT=1): supported hardware, tested models, tensor-parallel caveats and cost."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest/developer-preview docs, page footer dated 2026-11-04)
- **Author:** vLLM project
- **Date:** accessed 2026-11-14
- **Original:** [vLLM docs: Batch Invariance](https://docs.vllm.ai/en/latest/features/batch_invariance/)

## Summary

Describes vLLM's opt-in mode that makes a request's output independent of batch size and of the order in which requests are batched. Intended for debugging, RL rollouts and systems that need reproducible results. The feature is labelled beta, with open work tracked in a GitHub issue.

## Key claims

- Enabled with the environment variable `VLLM_BATCH_INVARIANT=1`, for both `vllm serve` and the offline `LLM` class.
- Hardware: NVIDIA GPUs with compute capability 8.0+, AMD Instinct (gfx90a, gfx942, gfx950), and Intel XPUs via Triton (which also need the `TRITON_ATTN` attention backend).
- Validated models include DeepSeek V3/R1, Qwen3 (dense, MoE, VL), Qwen2.5, Llama 3.x, GPT-OSS, Mistral-7B-v0.3, GLM-4, Gemma 2 and others; other models may work but are unvalidated.
- Under tensor parallelism, vLLM keeps custom all-reduce with a fixed reduction order and disables FlashInfer, AITER and QuickReduce all-reduce.
- Known gap: all-reduces whose size is not a multiple of 16 bytes can switch between NCCL and custom all-reduce depending on batch size, which breaks invariance.
- On Ada, Hopper and Blackwell, the mode runs without `torch.compile`, using breakable CUDA graphs.
- The mode can be slower than the default; the docs frame this as a deliberate reproducibility-for-speed trade.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)
