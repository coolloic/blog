---
title: "Source: Training Compute-Optimal Large Language Models (Chinchilla, Hoffmann et al., 2022)"
summary: "DeepMind's 2022 paper finding that parameters and training tokens should grow in equal proportion with compute, and that Gopher-era models were undertrained."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws"]
---

- **What:** research paper (arXiv:2203.15556), NeurIPS 2022
- **Authors:** Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch and 19 others (DeepMind)
- **Date:** 2022-03-29
- **Original:** [arxiv.org/abs/2203.15556](https://arxiv.org/abs/2203.15556)

## Summary

Over 400 runs (70M to 16B parameters, 5B to 500B tokens) are used to answer: for a fixed FLOP budget, what model size and token count minimise loss? Three estimation methods agree that N and D should scale roughly equally with compute, contradicting Kaplan et al. To test it, a 70B model (Chinchilla) was trained on 1.4T tokens with Gopher's (280B, 300B tokens) budget and beat it.

## Key claims

- Approach 1 (minimum over training curves): N_opt ∝ C^0.50, D_opt ∝ C^0.50. Approach 2 (IsoFLOP profiles over 9 budgets): 0.49 / 0.51. Approach 3 (parametric fit): 0.46 / 0.54. Kaplan et al.: 0.73 / 0.27.
- Parametric loss: L(N, D) = E + A/N^α + B/D^β, with E = 1.69 (irreducible entropy of text), A = 406.4, B = 410.7, α = 0.34, β = 0.28; fitted with a Huber loss under FLOPs ≈ 6ND.
- Compute-optimal token counts from Approach 1: 1B → 20.2B tokens, 10B → 205B, 67B → 1.5T, 175B → 3.7T, 280B → 5.9T, 1T → 21.2T. This is the origin of the "about 20 tokens per parameter" heuristic.
- Why Kaplan differs: Kaplan used one fixed token count and learning-rate schedule for all runs, so intermediate checkpoints overstated loss for shorter runs; Hoffmann matches the cosine cycle length to the token count. Kaplan's runs were also mostly under 100M parameters, while most of Hoffmann's exceed 500M.
- Chinchilla (70B, 1.4T tokens) beat Gopher 280B, GPT-3 175B, Jurassic-1 178B and MT-NLG 530B; MMLU 67.5%, 7+ points above Gopher. Being smaller, it is also cheaper to fine-tune and serve.

## Feeds

[Scaling laws](../concepts/scaling-laws.md) · [LLM training pipeline](../concepts/llm-training-pipeline.md)
