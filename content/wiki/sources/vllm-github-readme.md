---
title: "Source: vLLM GitHub README"
summary: "Project README for vLLM: origin at UC Berkeley's Sky Computing Lab, feature list, hardware coverage, license."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** open-source project README (read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vllm-project/vllm](https://github.com/vllm-project/vllm)

## Summary

Describes vLLM as a high-throughput, memory-efficient inference and serving library with an OpenAI-compatible server, started at UC Berkeley's Sky Computing Lab and now community-maintained.

## Key claims

- Origin: Sky Computing Lab, UC Berkeley; over 2,000 contributors; Apache-2.0.
- Features: PagedAttention, continuous batching, chunked prefill, prefix caching, CUDA/HIP graphs and torch.compile, quantization (FP8, INT4/INT8, GPTQ/AWQ, GGUF), speculative decoding, disaggregated prefill/decode/encode, tensor/pipeline/data/expert/context parallelism, structured outputs, tool calling, multi-LoRA, Anthropic Messages API and gRPC.
- 200+ Hugging Face model architectures.
- Hardware: NVIDIA, AMD and Intel GPUs; x86, ARM and PowerPC CPUs; plugins for TPU, Gaudi, Spyre, Ascend and others.

## Feeds

[vLLM](../concepts/vllm.md)
