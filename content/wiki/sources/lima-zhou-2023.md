---
title: "Source: LIMA: Less Is More for Alignment"
summary: "Meta's 2023 paper showing 1,000 curated SFT examples can align a 65B model."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2305.11206, NeurIPS 2023)
- **Author:** Chunting Zhou, Pengfei Liu, Puxin Xu, et al. (Meta AI and others)
- **Date:** 2023-05-18
- **Original:** [arXiv:2305.11206](https://arxiv.org/abs/2305.11206)

## Summary

Fine-tunes LLaMA 65B on 1,000 carefully curated prompt-response pairs with plain supervised loss and no RLHF, and finds it competitive with much more heavily aligned systems. Argues that almost all knowledge comes from pre-training.

## Key claims

- 1,000 curated examples, standard SFT loss, no RL or preference modelling.
- Human raters judged LIMA equivalent to or better than GPT-4 in 43% of cases (58% vs Bard, 65% vs DaVinci003).
- Learned specific response formats from a handful of examples.
- Most knowledge is learned in pre-training; alignment mostly teaches format and style.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md)
