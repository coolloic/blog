---
title: "Source: Defeating Nondeterminism in LLM Inference (Thinking Machines Lab)"
summary: "Thinking Machines post showing temperature-0 nondeterminism comes from batch-size-dependent kernels, and building batch-invariant kernels to fix it."
category: source
lastmod: 2026-11-14
tags: ["models", "inference"]
---

- **What:** research blog post (Connectionism)
- **Author:** Horace He, with others at Thinking Machines Lab
- **Date:** 10 September 2025
- **Original:** [thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)

## Summary

Why does the same prompt at temperature 0 return different completions? The common answer, "GPU concurrency plus floating-point non-associativity", is incomplete: individual forward-pass kernels are run-to-run deterministic. The real cause is lack of **batch invariance**: reduction order inside kernels changes with batch size, and batch size depends on how many other requests the server is handling. The post builds batch-invariant RMSNorm, matmul and attention kernels in vLLM.

## Key claims

- Temperature 0 (greedy decoding) is deterministic in theory, but hosted APIs and vLLM/SGLang still vary.
- Same-shape matmuls on a GPU are bitwise reproducible; most forward kernels use no atomic adds.
- From one user's view, output depends on concurrent load, which is effectively random.
- Fixes: fixed reduction order in RMSNorm; one matmul kernel configuration for all shapes; attention with fixed-size KV splits and KV cache updated before attention.
- Qwen3-235B, 1,000 temperature-0 completions of one prompt: 80 unique outputs, first divergence at token 103; with batch-invariant kernels, all 1,000 identical.
- Cost: on 1,000 Qwen3-8B sequences, 26 s default vLLM vs 55 s unoptimised deterministic vs 42 s with an improved attention kernel.
- Sampler/trainer numeric mismatch makes "on-policy" RL silently off-policy; bitwise-identical inference kept KL at zero.

## Feeds

[LLM limitations](../concepts/llm-limitations.md)
