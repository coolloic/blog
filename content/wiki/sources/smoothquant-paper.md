---
title: "Source: SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models"
summary: "ICML 2023 paper enabling W8A8 by migrating activation outliers into the weights."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (ICML 2023), arXiv:2211.10438
- **Author:** Guangxuan Xiao, Ji Lin, Mickael Seznec, Hao Wu, Julien Demouth, Song Han (MIT, NVIDIA)
- **Date:** 2022-11-18
- **Original:** [SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models](https://arxiv.org/abs/2211.10438)

## Summary

Activations have outlier channels that make INT8 activation quantization lossy, while weights are easy to quantize. SmoothQuant divides activations by a per-channel factor and multiplies the weights by it, an equivalent transform that makes both quantizable to INT8.

## Key claims

- Training-free W8A8 (8-bit weights and activations).
- Migrates quantization difficulty from activations to weights offline.
- Up to 1.56x speedup and 2x memory reduction with negligible accuracy loss; serves a 530B model on a single node.

## Feeds

[Quantization](../concepts/quantization.md)
