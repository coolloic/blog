---
title: "Source: DeepSeek-V3/R1 Inference System Overview"
summary: "DeepSeek's production serving write-up: cross-node expert parallelism with prefill/decode disaggregation, compute-communication overlap, EP load balancing, and per-node throughput and cost figures."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "inference", "deepseek"]
---

- **What:** engineering write-up (Open Source Week, day 6), GitHub `deepseek-ai/open-infra-index`
- **Author:** DeepSeek-AI
- **Date:** 2025-03-01 (statistics for 2025-02-27/28)
- **Original:** [Day 6: DeepSeek-V3/R1 Inference System Overview](https://github.com/deepseek-ai/open-infra-index/blob/main/202502OpenSourceWeek/day_6_one_more_thing_deepseekV3R1_inference_system_overview.md)

## Summary

Explains why DeepSeek serves V3/R1 with very wide expert parallelism and how. Because only 8 of 256 experts fire per layer, each expert needs a very large global batch to be compute-efficient; spreading experts over many GPUs both enlarges the effective batch per expert and reduces the expert memory each GPU must read per step.

## Key claims

- Prefill: routed experts EP32, attention and shared experts DP32, 4 nodes, 32 redundant experts (9 routed + 1 shared per GPU).
- Decode: routed experts EP144, attention/shared DP144, 18 nodes, 32 redundant experts (2 routed + 1 shared per GPU).
- Communication is hidden by splitting the batch into two micro-batches (prefill) or a 5-stage pipeline (decode).
- Three balancers: prefill (attention compute, tokens per GPU), decode (KV cache and requests per GPU), and expert-parallel (minimise the max dispatch load on any GPU).
- Matmuls and dispatch in FP8; core MLA and combine in BF16.
- Per H800 node: ~73.7k input tokens/s (incl. cache hits) and ~14.8k output tokens/s; 56.3% of input tokens hit the on-disk KV cache.
- At $2/GPU-hour the fleet cost ~$87k/day against a theoretical $562k/day if all tokens were billed at R1 prices (545% theoretical margin, lower in practice).

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
