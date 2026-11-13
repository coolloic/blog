---
title: "Source: Hugging Face Hub docs: GGUF"
summary: "Hub documentation for the GGUF file format and its quantization types with bits-per-weight."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (read 2026-11-14)
- **Author:** Hugging Face
- **Date:** 2026-11-14 (accessed)
- **Original:** [Hugging Face Hub docs: GGUF](https://huggingface.co/docs/hub/gguf)

## Summary

GGUF is the binary single-file model format of GGML/llama.cpp, holding tensors plus standardized metadata (unlike tensor-only safetensors). The page tabulates its quantization types and their effective bits per weight.

## Key claims

- GGUF was created by Georgi Gerganov (llama.cpp) and is used by llama.cpp, Ollama, LM Studio and GPT4All.
- K-quants use super-blocks: Q4_K is 4.5 bpw, Q5_K 5.5 bpw, Q6_K 6.5625 bpw, Q3_K 3.4375 bpw, Q2_K 2.625 bpw.
- I-quants use an importance matrix: IQ4_XS 4.25 bpw, IQ3_XXS 3.06, IQ2_XXS 2.06, IQ1_S 1.56 bpw.
- Legacy Q4_0/Q8_0 etc. use 32-weight blocks with round-to-nearest; MXFP4 and ternary TQ types are also defined.

## Feeds

[Quantization](../concepts/quantization.md)
