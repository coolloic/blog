---
title: "Source: The Curse of Recursion / Model Collapse (Shumailov et al.)"
summary: "Paper showing that training generative models recursively on model-generated data erases the tails of the original distribution ('model collapse')."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2305.17493); a later version appeared in *Nature* (2024) as "AI models collapse when trained on recursively generated data"
- **Author:** Ilia Shumailov, Zakhar Shumaylov, Yiren Zhao, Yarin Gal, Nicolas Papernot, Ross Anderson
- **Date:** 2023-05-27 (v3 2024-04-14)
- **Original:** [arXiv:2305.17493](https://arxiv.org/abs/2305.17493)

## Summary

When generations of models are trained on the outputs of earlier generations, defects accumulate irreversibly. The tails of the original data distribution vanish first. The paper shows this for VAEs, Gaussian mixture models and LLMs, and gives theoretical intuition for why it is general.

## Key claims

- Recursive training on generated content causes "model collapse": rare events (the distribution's tails) disappear.
- The effect appears across model families, including LLMs.
- As LLM text spreads on the web, genuine human-generated data becomes more valuable.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)
