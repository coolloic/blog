---
title: "Source: Textbooks Are All You Need (phi-1)"
summary: "Microsoft Research paper training a 1.3B code model on filtered 'textbook-quality' web data plus GPT-3.5-generated synthetic textbooks and exercises."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2306.11644)
- **Author:** Suriya Gunasekar and 18 co-authors (Microsoft Research)
- **Date:** 2023-06-20 (v2 2023-10-02)
- **Original:** [arXiv:2306.11644](https://arxiv.org/abs/2306.11644)

## Summary

The paper argues that data quality can stand in for scale. phi-1, a 1.3B-parameter code model, is trained on a small corpus: web data filtered for "textbook quality" plus synthetic textbooks and exercises written by GPT-3.5. It beats much larger models on code benchmarks.

## Key claims

- Data: about 6B tokens of filtered web data plus about 1B tokens of GPT-3.5-generated textbooks and exercises.
- Training: about 4 days on 8 A100s.
- Results: 50.6% pass@1 on HumanEval and 55.5% on MBPP. phi-1-small (350M) reaches 45% on HumanEval.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)
