---
title: "Source: LLM Inference Performance Engineering: Best Practices"
summary: "Databricks/MosaicML guide to inference metrics (TTFT, TPOT, MBU) and the batch-size latency/throughput trade-off."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** vendor engineering blog
- **Author:** Megha Agarwal, Asfandyar Qureshi, Nikhil Sardana, Linden Li, Julian Quevedo, Daya Khudia (Databricks/MosaicML)
- **Date:** 2023-10-12
- **Original:** [LLM Inference Performance Engineering: Best Practices](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices)

## Summary

Defines the standard serving metrics and introduces Model Bandwidth Utilization as the right efficiency metric for memory-bound decode, then measures how batch size, tensor parallelism and quantization move latency and throughput.

## Key claims

- Latency = TTFT + TPOT x output tokens; throughput = output tokens per second across all requests.
- MBU = achieved bandwidth / peak bandwidth, where achieved bandwidth = (weights + KV cache bytes) / TPOT. A 7B FP16 model at 14 ms TPOT moves about 1 TB/s, i.e. 50% MBU on a 2 TB/s GPU.
- On one A100, batch 64 vs batch 1 raised latency about 4x but throughput about 14x; past some batch size decode becomes compute-bound.
- Tensor parallelism shows diminishing latency returns (Llama2-70B: 4 to 8 GPUs gave only about 0.7x latency at small batch).
- Output length dominates latency: 512 extra input tokens cost less than 8 extra output tokens on MPT models.
- INT8 weights can halve the number of GPUs needed; INT8 KV cache roughly halves KV memory; quality must be checked end to end.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [KV cache](../concepts/kv-cache.md) · [Quantization](../concepts/quantization.md)
