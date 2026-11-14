---
title: "Source: vLLM V1: A Major Upgrade to vLLM's Core Architecture"
summary: "vLLM team blog post (January 2025) announcing the V1 engine rewrite: separate engine-core process, unified token-budget scheduler, zero-overhead prefix caching, piecewise CUDA graphs."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** project blog post (alpha release announcement)
- **Author:** the vLLM team (credits contributors from UC Berkeley, Neural Magic/Red Hat, Anyscale, Roblox)
- **Date:** 2025-01-27
- **Original:** [vLLM V1: A Major Upgrade to vLLM's Core Architecture](https://vllm.ai/blog/2025-01-27-v1-alpha-release)

## Summary

Announces V1, a re-architecture of vLLM's scheduler, KV cache manager, worker and API server that keeps the model code and kernels. The aim is near-zero CPU overhead: CPU work (tokenization, detokenization, streaming) moves out of the GPU loop, and per-step state is sent as diffs instead of rebuilt. Prefill and decode stop being separate phases; the scheduler simply gives each request a number of tokens under a fixed budget.

## Key claims

- The engine core (scheduler + model execution) runs in its own process, talking to the API server over ZeroMQ, so CPU-heavy serving work overlaps with GPU execution.
- Scheduler decisions are a map from request ID to token count; prompt and output tokens are treated alike, which makes chunked prefill and prefix caching natural.
- Prefix caching was re-implemented (hashing, constant-time LRU eviction) and turned on by default; the post reports under 1% throughput loss at a 0% hit rate.
- Workers cache request state and receive incremental diffs; the scheduler and worker 0 are separate processes, giving the same ("symmetric") design for one or many GPUs.
- Persistent batch: input tensors are cached and patched each step.
- torch.compile integration and piecewise CUDA graphs; FlashAttention 3 integrated.
- Multimodal: preprocessing in a separate process with a cache, image hashes in prefix-cache keys, and an encoder cache for vision embeddings.
- Up to 1.7x throughput over V0. Enabled at the time with `VLLM_USE_V1=1`, no API changes.

## Feeds

[vLLM](../concepts/vllm.md)
