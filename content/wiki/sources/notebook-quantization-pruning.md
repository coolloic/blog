---
title: "Source: Quantization & Pruning: Make Models Small and Fast (Notebook tutorial)"
summary: "The owner's tutorial on quantization (PTQ/QAT, INT8/INT4, GPTQ/AWQ/GGUF) and pruning."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** tutorial (owner's Notebook site)
- **Author:** Loic (coolloic)
- **Date:** 2026
- **Original:** [Quantization & Pruning: Make Models Small and Fast (Notebook tutorial)](https://coolloic.github.io/Notebook/quantization-pruning.html)

## Summary

An introductory tutorial contrasting quantization (fewer bits per weight) and pruning (fewer weights), with the affine quantization formula, PTQ vs QAT, dynamic vs static quantization, a survey of LLM methods and a PyTorch worked example.

## Key claims

- Affine quantization: q = round(r/S) + Z and r ~ S(q - Z); symmetric uses Z = 0; per-channel scales beat per-tensor.
- Outliers stretch the range and coarsen the scale, which is why activations are harder to quantize than weights.
- PTQ needs no retraining (static PTQ needs a calibration pass); QAT simulates quantization in training and is more accurate at low bits.
- LLM inference is memory-bandwidth bound, so fewer bits per weight directly means more tokens per second.
- 8-bit is usually near-lossless, 4-bit often a good trade; below that quality degrades unevenly (reasoning, rare knowledge) beyond what perplexity shows.
- Lower precision only becomes faster if hardware and runtime support the format.

## Feeds

[Quantization](../concepts/quantization.md)
