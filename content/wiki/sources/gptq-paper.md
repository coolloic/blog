---
title: "Source: GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
summary: "ICLR 2023 paper on one-shot 3-4 bit weight quantization using approximate second-order information."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (ICLR 2023), arXiv:2210.17323
- **Author:** Elias Frantar, Saleh Ashkboos, Torsten Hoefler, Dan Alistarh (IST Austria, ETH Zurich)
- **Date:** 2022-10-31
- **Original:** [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](https://arxiv.org/abs/2210.17323)

## Summary

GPTQ quantizes weights layer by layer, using approximate second-order (Hessian) information from a small calibration set to adjust the not-yet-quantized weights and compensate for each rounding error.

## Key claims

- One-shot, post-training, weight-only quantization to 3 or 4 bits with little accuracy loss.
- Quantizes a 175B model in about 4 GPU hours.
- Inference speedups over FP16 of about 3.25x on A100 and 4.5x on A6000.

## Feeds

[Quantization](../concepts/quantization.md)
