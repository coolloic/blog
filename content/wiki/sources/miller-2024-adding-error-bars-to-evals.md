---
title: "Source: Adding Error Bars to Evals (Miller, 2024)"
summary: "Statistics paper arguing evals are experiments: report standard errors, cluster them, use paired differences and power analysis."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2411.00640 (stat.AP)
- **Author:** Evan Miller (Anthropic)
- **Date:** 1 November 2024
- **Original:** [arxiv.org/abs/2411.00640](https://arxiv.org/abs/2411.00640)

## Summary

Treats eval questions as a sample from an unseen super-population, so an eval score is an estimate with sampling error. Gives formulas for standard errors, model comparisons and sample-size planning, and recommends how to report results.

## Key claims

- Report the standard error (and question count) with every mean; 95% CI is mean ± 1.96 × SE.
- Use the Central Limit Theorem standard error rather than bootstrapping for typical evals; the Bernoulli formula only applies to true 0/1 scores.
- Cluster standard errors when questions share a passage or come in groups; on DROP the clustered SE was about 3x the naive one (1.34 vs 0.44).
- Reduce variance by resampling each question K times (K=2 cuts it by 1/3, K=4 by 1/2 in the paper's example) or by using token probabilities.
- Do not lower temperature to reduce variance; it can shift the expected score.
- Compare models with **paired differences** on the same questions: the variance falls by twice the covariance term when scores are positively correlated.
- Run a power analysis first; detecting a 3-point difference at 80% power needed about 969 questions in the paper's example, and it suggests new evals have at least 1,000 questions.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md) · [Benchmarks](../concepts/benchmarks.md)
