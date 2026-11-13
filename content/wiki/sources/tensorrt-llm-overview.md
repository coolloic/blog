---
title: "Source: TensorRT-LLM overview"
summary: "NVIDIA's official overview of TensorRT-LLM, its PyTorch-based LLM inference library."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (last updated 2026-11-03)
- **Author:** NVIDIA
- **Date:** 2026-11-03
- **Original:** [TensorRT-LLM overview](https://nvidia.github.io/TensorRT-LLM/overview.html)

## Summary

TensorRT-LLM is NVIDIA's open-source library for fast LLM inference on NVIDIA GPUs, now architected on PyTorch (the older TensorRT engine backend was removed) and exposing a Python LLM API from one GPU to multi-node.

## Key claims

- In-flight batching with paged KV cache including block reuse.
- FP8 on H100 (Hopper) and later, FP4 on Blackwell (B200).
- Speculative decoding: EAGLE, MTP, n-gram.
- Disaggregated serving (beta), chunked prefill, LoRA, guided decoding, tensor/pipeline/expert parallelism; trtllm-serve CLI.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md) · [Quantization](../concepts/quantization.md) · [Speculative decoding](../concepts/speculative-decoding.md)
