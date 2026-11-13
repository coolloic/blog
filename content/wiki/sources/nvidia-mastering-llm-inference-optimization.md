---
title: "Source: Mastering LLM Techniques: Inference Optimization"
summary: "NVIDIA technical blog surveying prefill/decode, KV cache math, batching, attention variants, parallelism and compression."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** vendor engineering blog
- **Author:** Shashank Verma, Neal Vaidya (NVIDIA)
- **Date:** 2023-11-17
- **Original:** [Mastering LLM Techniques: Inference Optimization](https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/)

## Summary

A broad survey of the inference stack from the GPU vendor's perspective: why decode is memory-bound, how big the KV cache is, how batching, MQA/GQA, FlashAttention, PagedAttention, model parallelism, quantization, sparsity, distillation and speculative inference each help.

## Key claims

- Prefill processes input tokens in parallel (matrix-matrix) and saturates the GPU; decode is memory-bound and dominated by data movement.
- A 7B model in FP16/BF16 needs about 14 GB for weights.
- KV cache size = batch x sequence length x 2 x layers x (KV heads x head dim) x bytes per element; Llama 2 7B at 4,096 tokens, batch 1, FP16 is about 2 GB.
- In-flight (continuous) batching evicts finished sequences immediately and admits new ones.
- MQA shares one K/V head across all query heads; GQA uses groups; both shrink the KV cache. Llama 2 70B uses GQA.
- Weights are easier to quantize than activations, which have outliers.
- Speculative inference: a cheap draft proposes tokens, the main model verifies them in parallel and discards everything after the first mismatch.
- Tensor parallelism splits layers' matrices across GPUs; pipeline parallelism splits layers and suffers bubbles.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [KV cache](../concepts/kv-cache.md) · [Quantization](../concepts/quantization.md) · [Speculative decoding](../concepts/speculative-decoding.md)
