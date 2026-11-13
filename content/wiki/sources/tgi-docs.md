---
title: "Source: Text Generation Inference (TGI) documentation"
summary: "Hugging Face's TGI serving toolkit docs, which now state the project is in maintenance mode."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (read 2026-11-14)
- **Author:** Hugging Face
- **Date:** 2026-11-14 (accessed)
- **Original:** [Text Generation Inference (TGI) documentation](https://huggingface.co/docs/text-generation-inference/index)

## Summary

TGI was Hugging Face's production LLM server (continuous batching, tensor parallelism, FlashAttention and PagedAttention, quantization, SSE streaming, guidance). The docs now mark it as maintenance mode and recommend vLLM, SGLang, llama.cpp or MLX going forward.

## Key claims

- TGI accepts only minor fixes and docs changes; Hugging Face recommends vLLM and SGLang (or llama.cpp/MLX locally).
- Features: continuous batching, tensor parallelism, SSE token streaming, FlashAttention/PagedAttention, bitsandbytes and GPTQ quantization, OpenTelemetry tracing, Prometheus metrics, guided structured output.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md)
