---
title: "Source: Turning Up the Heat: Min-p Sampling (Nguyen et al., 2025)"
summary: "Proposes min-p, a truncation sampler whose cut-off scales with the top token's probability, improving quality at high temperature."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 2407.01082, ICLR 2025 oral)
- **Author:** Minh Nhat Nguyen, Andrew Baker, Clement Neo, Allen Roush, Andreas Kirsch, Ravid Shwartz-Ziv
- **Date:** 2024-07-01 (v1); revised 2025-11-20 (v8)
- **Original:** [arXiv:2407.01082](https://arxiv.org/abs/2407.01082)

## Summary

Min-p keeps tokens whose probability is at least a fraction (min_p) of the most likely token's probability. When the model is confident the pool is tiny; when it is uncertain the pool widens.

## Key claims

- Top-p struggles to balance quality and diversity, especially at higher temperatures.
- Min-p sets the threshold relative to the top token's probability, adapting to model confidence.
- It improved quality and diversity on GPQA, GSM8K and AlpacaEval creative writing for Mistral and Llama 3 models (1B-123B), most at high temperatures.
- Hugging Face Transformers and vLLM have adopted min-p.

## Feeds

[Sampling parameters](../concepts/sampling-parameters.md)
