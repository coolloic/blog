---
title: "Source: vLLM docs: Speculative Decoding"
summary: "Official vLLM guide to its speculative decoding methods, configuration and when they help."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Speculative Decoding](https://docs.vllm.ai/en/latest/features/speculative_decoding/)

## Summary

Lists vLLM's speculators (EAGLE, MTP, draft model, n-gram, suffix decoding and others), the speculative_config interface, the lossless guarantee of its rejection sampler, and guidance on which methods pay off at which load.

## Key claims

- Methods include EAGLE, multi-token prediction (MTP), draft model, n-gram (prompt lookup), suffix decoding, custom speculators, dynamic speculation, adaptive verification, and a lossy FLy verification mode (rejection_sample_method="fly", explicitly not distribution preserving).
- Configured via speculative_config / --speculative-config JSON with method, model and num_speculative_tokens; draft_tensor_parallel_size sets draft TP.
- The standard rejection sampler is lossless up to hardware numerics, validated by convergence and greedy-equality tests; logprobs are not guaranteed stable.
- Pipeline parallelism is not composable with speculative decoding as of vllm<=0.15.0.
- Targets memory-bound, low-to-medium QPS workloads; EAGLE/MTP/draft give the largest gains at low QPS, n-gram and suffix give low-to-medium gains at low QPS and medium gains at high QPS, without extra load at peak.

## Feeds

[Speculative decoding](../concepts/speculative-decoding.md)
