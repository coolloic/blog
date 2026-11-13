---
title: "Source: GroUSE, a benchmark to evaluate evaluators in grounded QA (Muller et al., 2024)"
summary: "Meta-evaluation of LLM judges for RAG answers: 144 unit tests over 7 failure modes show automated RAG evaluation frameworks miss failures even with GPT-4."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2409.06595 (COLING 2025)
- **Authors:** Sacha Muller, António Loison, Bilel Omrani, Gautier Viaud
- **Date:** 2024-09-10 (v3 2025-01-30)
- **Original:** [arxiv.org/abs/2409.06595](https://arxiv.org/abs/2409.06595)

## Summary

Builds a unit-test benchmark for the judges that grade grounded (RAG) answers, targeting seven generator failure modes, and measures how well judges are calibrated and discriminate good from bad answers.

## Key claims

- Existing automated RAG evaluation frameworks often overlook important failure modes, even with GPT-4 as the judge.
- Open-weight judges that correlate strongly with GPT-4 still fail to generalize to the benchmark's criteria, so correlation with GPT-4 is an incomplete proxy for judge quality.
- Judge evaluation should add unit tests for specific failure modes, not just correlation.
- Fine-tuning Llama-3 on GPT-4 reasoning traces improves its correlation and calibration.

## Feeds

[RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)
