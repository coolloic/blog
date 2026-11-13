---
title: "Source: How continuous batching enables 23x throughput in LLM inference"
summary: "Anyscale engineering blog benchmarking static vs continuous batching and vLLM."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** engineering blog post
- **Author:** Cade Daniel, Chen Shen, Eric Liang, Richard Liaw (Anyscale)
- **Date:** 2023-06-22
- **Original:** [How continuous batching enables 23x throughput in LLM inference](https://www.anyscale.com/blog/continuous-batching-llm-inference)

## Summary

A clear explanation of why static batching wastes GPU time when output lengths vary and how continuous (iteration-level) batching fixes it, with a benchmark of OPT-13B on one A100-40GB.

## Key claims

- LLM decoding is limited by memory bandwidth rather than compute, so throughput depends on how many sequences fit in GPU memory.
- A 13B model on a 40 GB A100 leaves room for only about 14k tokens of state.
- Continuous batching alone gave about 8x throughput over naive static batching; continuous batching plus PagedAttention (vLLM) gave up to 23x.
- Latency gains from continuous batching shrink as the server approaches saturation.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md)
