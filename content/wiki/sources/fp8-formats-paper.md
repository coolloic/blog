---
title: "Source: FP8 Formats for Deep Learning"
summary: "NVIDIA/Arm/Intel paper specifying the E4M3 and E5M2 8-bit floating-point formats."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper, arXiv:2209.05433
- **Author:** Paulius Micikevicius et al. (NVIDIA, Arm, Intel)
- **Date:** 2022-09-12
- **Original:** [FP8 Formats for Deep Learning](https://arxiv.org/abs/2209.05433)

## Summary

Proposes two FP8 encodings and shows they match 16-bit training quality across CNNs, RNNs and Transformers up to 175B parameters, and that FP8 post-training quantization works for models that resist INT8.

## Key claims

- E4M3: 4 exponent bits, 3 mantissa bits; extends range by dropping infinities and using one NaN pattern.
- E5M2: 5 exponent bits, 2 mantissa bits; follows IEEE 754 special-value conventions (wider range, less precision).
- FP8 training matched 16-bit result quality with unchanged hyperparameters.
- FP8 PTQ worked for language models that resisted INT8 quantization.

## Feeds

[Quantization](../concepts/quantization.md) · [KV cache](../concepts/kv-cache.md)
