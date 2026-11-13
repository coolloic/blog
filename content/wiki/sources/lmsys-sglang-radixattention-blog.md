---
title: "Source: Fast and Expressive LLM Inference with RadixAttention and SGLang"
summary: "LMSYS blog post explaining RadixAttention's radix-tree KV cache and LRU eviction."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** project blog
- **Author:** Lianmin Zheng, Liangsheng Yin, Zhiqiang Xie, Jeff Huang, Chuyue Sun, Cody Hao Yu, Shiyi Cao, Christos Kozyrakis, Ion Stoica, Joseph E. Gonzalez, Clark Barrett, Ying Sheng (LMSYS)
- **Date:** 2024-01-17
- **Original:** [Fast and Expressive LLM Inference with RadixAttention and SGLang](https://lmsys.org/blog/2024-01-17-sglang/)

## Summary

Describes how SGLang keeps KV cache after requests finish, indexed in a radix tree keyed by token sequences, so any later request with a matching prefix (system prompt, few-shot examples, chat history) skips that prefill.

## Key claims

- The radix tree lives on the CPU and maps token sequences to KV tensors stored on the GPU in a paged layout with page size one token.
- Supports prefix match, insert and LRU eviction of leaf nodes; nodes split when requests diverge.
- A cache-aware scheduling policy complements LRU to raise hit rate.
- No noticeable overhead without cache hits, so it is always on; up to 5x throughput vs vLLM 0.2.5, Guidance and TGI 1.3 in their benchmarks.

## Feeds

[KV cache](../concepts/kv-cache.md) · [LLM inference serving](../concepts/llm-inference-serving.md)
