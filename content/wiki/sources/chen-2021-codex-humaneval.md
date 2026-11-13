---
title: "Source: Evaluating Large Language Models Trained on Code (Chen et al., 2021)"
summary: "The Codex/HumanEval paper, which defined pass@k with an unbiased estimator and showed repeated sampling boosts success."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "coding"]
---

- **What:** research paper, arXiv:2107.03374 (OpenAI)
- **Authors:** Mark Chen, Jerry Tworek, Heewoo Jun and 55 others
- **Date:** 7 July 2021 (v2 14 July 2021)
- **Original:** [arxiv.org/abs/2107.03374](https://arxiv.org/abs/2107.03374)

## Summary

Introduces HumanEval (hand-written Python problems graded by unit tests) and the functional-correctness metric pass@k: the probability that at least one of k samples passes. Gives the standard unbiased estimator still used today.

## Key claims

- pass@k is estimated by drawing n ≥ k samples per problem (the paper uses n = 200, k ≤ 100), counting c correct, and averaging 1 − C(n−c, k)/C(n, k) over problems.
- The plug-in estimate 1 − (1 − p̂)^k is biased; the paper gives a numerically stable product form instead of computing binomials directly.
- Optimal temperature depends on k: for a 679M model, T = 0.2 was best for pass@1 and T = 0.8 for pass@100, because diversity helps when only one success is needed.
- Codex-12B solved 28.8% of HumanEval with one sample and 70.2% with 100 samples per problem.
- BLEU correlates poorly with functional correctness: correct and incorrect solutions have overlapping BLEU distributions.

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
