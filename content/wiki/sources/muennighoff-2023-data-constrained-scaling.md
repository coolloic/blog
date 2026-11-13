---
title: "Source: Scaling Data-Constrained Language Models (Muennighoff et al., 2023)"
summary: "400-run study showing up to about 4 epochs of repeated data is almost as good as fresh data, with value decaying after that; proposes a scaling law for repeated tokens."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws", "data"]
---

- **What:** research paper (arXiv:2305.16264), NeurIPS 2023
- **Authors:** Niklas Muennighoff, Alexander M. Rush, Boaz Barak, Teven Le Scao, Aleksandra Piktus, Nouamane Tazi, Sampo Pyysalo, Thomas Wolf, Colin Raffel
- **Date:** 2023-05-25 (v5 2025-06-28)
- **Original:** [arxiv.org/abs/2305.16264](https://arxiv.org/abs/2305.16264); code and models at github.com/huggingface/datablations

## Summary

Asks what to do when unique data runs out. Across 400 runs (up to 9B parameters, 900B tokens) it measures how much repeated epochs are worth and fits a compute-optimality law that discounts repeated tokens and excess parameters. It also tests adding code and relaxing quality filters as ways to stretch data.

## Key claims

- At fixed compute, up to about 4 epochs of repeated data gives negligible loss change versus unique data.
- With more repetition, the value of extra compute decays towards zero.
- A data-constrained scaling law that values repeated tokens less fits the results.
- Mixing in code and removing common filters are evaluated as mitigations for data scarcity.

## Feeds

[Scaling laws](../concepts/scaling-laws.md)
