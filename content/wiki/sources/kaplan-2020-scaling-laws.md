---
title: "Source: Scaling Laws for Neural Language Models (Kaplan et al., 2020)"
summary: "OpenAI's 2020 paper showing language-model loss follows smooth power laws in parameters, data and compute, and recommending big models trained short of convergence."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws"]
---

- **What:** research paper (arXiv:2001.08361)
- **Authors:** Jared Kaplan, Sam McCandlish, Tom Henighan, Tom B. Brown, Benjamin Chess, Rewon Child, Scott Gray, Alec Radford, Jeffrey Wu, Dario Amodei (OpenAI)
- **Date:** 2020-01-23
- **Original:** [arxiv.org/abs/2001.08361](https://arxiv.org/abs/2001.08361)

## Summary

Trains decoder-only transformers (768 to 1.5B non-embedding parameters) on WebText2 with a 1,024-token context and measures test cross-entropy loss. When the other two factors do not limit it, loss falls as a power law in model size N, dataset size D and compute C, over six-plus orders of magnitude. The paper then derives how a fixed compute budget should be split, and concludes most extra compute should go into a larger model.

## Key claims

- Fitted single-factor laws: L(N) ∝ N^-0.076, L(D) ∝ D^-0.095, L(C_min) ∝ C^-0.050. N counts **non-embedding** parameters; with embeddings included the trend looks depth-dependent.
- Training compute is approximated as C ≈ 6·N·B·S (B batch size, S steps), i.e. about 6 FLOPs per parameter per token.
- Model shape (depth vs width, head count) matters very little at fixed N within a wide range.
- Overfitting depends on N^0.74/D: an 8x bigger model needs only about 5x more data to avoid a penalty.
- Larger models are more sample-efficient; under a fixed budget, the optimum is a very large model stopped well before convergence.
- Compute-optimal allocation: N ∝ C^0.73, B ∝ C^0.24, S ∝ C^0.03, so data grows only about as C^0.27.
- Learning curves are predictable early; loss on other distributions tracks training loss with a roughly constant offset.
- Critical batch size depends on loss only, about 1-2M tokens for their largest models.

## Feeds

[Scaling laws](../concepts/scaling-laws.md)
