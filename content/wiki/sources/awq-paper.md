---
title: "Source: AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration"
summary: "MLSys 2024 best paper: protect salient weight channels, identified from activations, via equivalent scaling."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (MLSys 2024 best paper), arXiv:2306.00978
- **Author:** Ji Lin, Jiaming Tang, Haotian Tang, Shang Yang, Wei-Ming Chen, Wei-Chen Wang, Guangxuan Xiao, Xingyu Dang, Chuang Gan, Song Han (MIT et al.)
- **Date:** 2023-06-01
- **Original:** [AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration](https://arxiv.org/abs/2306.00978)

## Summary

AWQ observes that about 1% of weights matter disproportionately and that activation magnitudes, not weight magnitudes, reveal which. It scales those channels up before quantization (with the inverse scale folded elsewhere), so no mixed precision and no backpropagation are needed.

## Key claims

- Salient weights (~1%) are identified from activation statistics.
- Per-channel scaling is a mathematically equivalent transform, avoiding mixed-precision kernels.
- No backpropagation or reconstruction, so it overfits the calibration set less and generalizes across domains and modalities.
- TinyChat runtime is over 3x faster than Hugging Face FP16 and runs Llama-2 70B on mobile GPUs.

## Feeds

[Quantization](../concepts/quantization.md)
