---
title: "Source: LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
summary: "NeurIPS 2022 paper behind bitsandbytes 8-bit inference: vector-wise quantization plus outlier decomposition."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (NeurIPS 2022), arXiv:2208.07339
- **Author:** Tim Dettmers, Mike Lewis, Younes Belkada, Luke Zettlemoyer
- **Date:** 2022-08-15
- **Original:** [LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale](https://arxiv.org/abs/2208.07339)

## Summary

Large transformers develop systematic outlier feature dimensions that break naive INT8. LLM.int8() quantizes most of the matmul vector-wise in 8-bit and routes the few outlier dimensions through a 16-bit matmul.

## Key claims

- Vector-wise quantization with separate normalization constants per inner product.
- Mixed-precision decomposition: outlier dimensions in 16-bit, more than 99.9% of values in 8-bit.
- Halves inference memory without degradation up to 175B parameters (e.g. OPT-175B on one server of consumer GPUs).

## Feeds

[Quantization](../concepts/quantization.md)
