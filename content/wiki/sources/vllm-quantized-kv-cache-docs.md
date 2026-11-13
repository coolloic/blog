---
title: "Source: vLLM docs: Quantized KV Cache"
summary: "Official guide to storing vLLM's KV cache in FP8 and calibrating its scales."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Quantized KV Cache](https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/)

## Summary

Explains kv_cache_dtype (auto, fp8, fp8_e4m3, fp8_e5m2), per-tensor vs per-head scales, calibration with LLM Compressor, and how to keep sensitive layers in native precision.

## Key claims

- FP8 KV cache shrinks KV memory so more tokens fit, raising throughput or allowing longer contexts.
- Without calibration all scales default to 1.0; dataset calibration via LLM Compressor is recommended for best accuracy.
- Per-attention-head scales require the FlashAttention backend; with FlashAttention 3, attention itself runs in FP8 and queries are quantized too.
- Sensitive layers (e.g. sliding-window attention) can be skipped with --kv-cache-dtype-skip-layers.

## Feeds

[KV cache](../concepts/kv-cache.md) · [Quantization](../concepts/quantization.md)
