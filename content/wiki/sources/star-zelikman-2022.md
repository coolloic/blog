---
title: "Source: STaR — Self-Taught Reasoner (Zelikman et al., 2022)"
summary: "Stanford/Google paper that bootstraps reasoning by fine-tuning a model on its own rationales that reach correct answers: the template for rejection-sampling fine-tuning."
category: source
lastmod: 2026-11-14
tags: ["training", "reasoning"]
---

- **What:** research paper (arXiv:2203.14465, NeurIPS 2022)
- **Author:** Eric Zelikman, Yuhuai Wu, Jesse Mu, Noah D. Goodman
- **Date:** 2022-03-28 (v2 2022-05-20)
- **Original:** [arXiv:2203.14465](https://arxiv.org/abs/2203.14465)

## Summary

STaR loops: generate rationales, keep the ones whose final answer is correct, fine-tune on them, and repeat. For questions the model gets wrong, it is given the correct answer as a hint and asked to produce a rationale for it ("rationalization").

## Key claims

- Loop: few-shot prompt for rationales, filter by answer correctness, rationalize failures with the answer as a hint, fine-tune on all correct rationales, iterate.
- Clearly beats fine-tuning to predict final answers directly, across several datasets.
- On CommonsenseQA it is comparable to fine-tuning a model about 30× larger.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md) · [Reinforcement fine-tuning](../concepts/reinforcement-fine-tuning.md)
