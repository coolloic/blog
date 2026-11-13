---
title: "Source: NVIDIA Dynamo (GitHub README)"
summary: "NVIDIA's open-source datacenter-scale orchestration layer for disaggregated LLM serving over vLLM, SGLang and TensorRT-LLM."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** open-source project README (v1.6, read 2026-11-14)
- **Author:** NVIDIA
- **Date:** 2026-11-14 (accessed)
- **Original:** [NVIDIA Dynamo (GitHub README)](https://github.com/ai-dynamo/dynamo)

## Summary

Dynamo sits above inference engines and coordinates them across GPUs and nodes: separate prefill and decode pools, a router that sends requests to workers already holding matching KV cache, and a KV block manager that offloads cache to cheaper tiers.

## Key claims

- Disaggregated prefill/decode pools that scale independently.
- KV-aware routing by load and KV cache overlap (README cites 2x TTFT in one benchmark).
- KV Block Manager offloads KV cache from GPU to CPU, SSD and remote/object storage.
- Backends: vLLM, SGLang, TensorRT-LLM; Apache-2.0.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [KV cache](../concepts/kv-cache.md)
