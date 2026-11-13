---
title: "Source: A Careful Examination of LLM Performance on Grade School Arithmetic (Zhang et al., 2024)"
summary: "GSM1k paper: a fresh GSM8k-style test set reveals up to 8-point drops and memorisation-linked overfitting in some model families."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2405.00332 (NeurIPS 2024 Datasets and Benchmarks; Scale AI)
- **Authors:** Hugh Zhang, Jeff Da, Dean Lee, and 12 others
- **Date:** 1 May 2024 (v4 22 November 2024)
- **Original:** [arxiv.org/abs/2405.00332](https://arxiv.org/abs/2405.00332)

## Summary

To test whether GSM8k scores reflect reasoning or contamination, the authors wrote GSM1k, matched to GSM8k on human solve rate, step count and answer magnitude, and compared model scores on the two.

## Key claims

- Accuracy dropped by up to 8 points on GSM1k relative to GSM8k.
- Several model families showed systematic overfitting across almost all sizes.
- Spearman r² = 0.36 between a model's likelihood of generating GSM8k examples and its GSM8k-GSM1k gap, suggesting partial memorisation.
- Many models, especially frontier ones, showed little overfitting and generalised reasonably well.

## Feeds

[Benchmarks](../concepts/benchmarks.md)
