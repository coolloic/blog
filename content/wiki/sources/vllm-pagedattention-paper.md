---
title: "Source: Efficient Memory Management for LLM Serving with PagedAttention"
summary: "SOSP 2023 paper introducing PagedAttention and the vLLM serving engine."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (SOSP 2023), arXiv:2309.06180
- **Author:** Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, Ying Sheng, Lianmin Zheng, Cody Hao Yu, Joseph E. Gonzalez, Hao Zhang, Ion Stoica (UC Berkeley et al.)
- **Date:** 2023-09-12
- **Original:** [Efficient Memory Management for LLM Serving with PagedAttention](https://arxiv.org/abs/2309.06180)

## Summary

The paper shows that pre-2023 serving systems wasted most of their KV cache memory because they reserved one contiguous slab per request sized for the maximum sequence length. It borrows virtual memory and paging from operating systems: the KV cache is split into fixed-size blocks allocated on demand and tracked through a per-request block table, so memory is no longer contiguous and blocks can be shared. vLLM, built on this, raises batch size and therefore throughput.

## Key claims

- Per-token KV cache for OPT-13B is about 800 KB (2 x 5120 hidden x 40 layers x 2 bytes); a 2048-token request needs up to 1.6 GB.
- In existing systems only 20.4%-38.2% of KV cache memory held actual token states; waste came from reserved slots, internal fragmentation and external fragmentation.
- PagedAttention stores K/V in fixed-size blocks mapped through a block table; small blocks limit internal fragmentation and equal sizes eliminate external fragmentation.
- Blocks can be shared within and across requests (parallel sampling, beam search, shared prefixes) using reference counts and copy-on-write.
- When memory runs out, vLLM preempts sequences and either swaps their blocks to CPU RAM or recomputes the KV cache later (recompute can be cheap since prompt+generated tokens are re-prefilled in one pass).
- Default block size 16 tokens: large enough for GPU efficiency, small enough to limit internal fragmentation.
- Throughput improves 2-4x over FasterTransformer and Orca at the same latency, more with longer sequences and larger models.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [KV cache](../concepts/kv-cache.md)
