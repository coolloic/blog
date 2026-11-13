---
title: "Source: Length-Controlled AlpacaEval (Dubois et al., 2024)"
summary: "Paper debiasing an LLM auto-evaluator for length by regression, raising correlation with Chatbot Arena from 0.94 to 0.98."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2404.04475 (COLM 2024)
- **Authors:** Yann Dubois, Balázs Galambosi, Percy Liang, Tatsunori B. Hashimoto (Stanford)
- **Date:** 6 April 2024 (v2 10 March 2025)
- **Original:** [arxiv.org/abs/2404.04475](https://arxiv.org/abs/2404.04475)

## Summary

AlpacaEval's GPT-4 judge prefers longer outputs. The authors fit a generalized linear model of the judge's preference on the length difference and other features, then predict the preference with the length difference set to zero.

## Key claims

- Length is a spurious feature an automatic judge rewards; it can be gamed by making outputs more verbose.
- Regression-based control answers the counterfactual "which output would win if both were the same length".
- Spearman correlation with LMSYS Chatbot Arena rose from 0.94 to 0.98, and the metric became more robust to verbosity manipulation.

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md)
