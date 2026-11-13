---
title: "Source: vLLM docs: Optimization and Tuning"
summary: "Official vLLM guide to preemption, chunked prefill, scheduler budgets and parallelism settings."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Optimization and Tuning](https://docs.vllm.ai/en/latest/configuration/optimization.html)

## Summary

Practical tuning guide for the vLLM V1 engine: what happens when KV cache memory runs out, how the token budget trades TTFT against inter-token latency, and when to use tensor, pipeline, expert or data parallelism.

## Key claims

- When the KV cache cannot hold all batched requests, requests are preempted; V1 defaults to recompute rather than swap.
- Reduce preemption by raising gpu_memory_utilization, lowering max_num_seqs or max_num_batched_tokens, or adding TP/PP.
- Chunked prefill is on by default in V1; the scheduler batches all pending decodes first, then fills remaining max_num_batched_tokens budget with (chunked) prefills.
- Small max_num_batched_tokens (e.g. 2048) improves inter-token latency; larger values improve TTFT; above 8192 recommended for throughput.
- TP shards each layer (use when the model does not fit or to free KV memory); PP splits layers (after TP is maxed, adds latency); EP for MoE; DP replicates for throughput.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [KV cache](../concepts/kv-cache.md)
