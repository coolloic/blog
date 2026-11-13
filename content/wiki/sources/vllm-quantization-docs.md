---
title: "Source: vLLM docs: Quantization"
summary: "Official list of vLLM's quantization methods and hardware support matrix."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Quantization](https://docs.vllm.ai/en/latest/features/quantization/)

## Summary

Catalogues the quantized checkpoint formats vLLM loads (AWQ, GPTQ, bitsandbytes, GGUF, FP8, INT8 W8A8, INT4 W4A16 via LLM Compressor, ModelOpt, Quark, TorchAO) and which GPU generations support each kernel.

## Key claims

- AWQ needs Turing or newer; GPTQ runs from Volta; Marlin kernels (GPTQ/AWQ/FP8/FP4) need Turing/Ampere or newer and keep 16-bit activations.
- FP8 W8A8 requires Ada or Hopper (or AMD) GPUs; INT8 W8A8 runs from Turing.
- GGUF is supported on NVIDIA and AMD GPUs but is not the primary path.
- LLM Compressor produces FP8 W8A8, INT4 W4A16, INT8 W8A8 checkpoints (compressed-tensors format).

## Feeds

[Quantization](../concepts/quantization.md)
