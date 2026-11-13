---
title: "Source: Large Language Models are not Fair Evaluators (Wang et al., 2023)"
summary: "Paper showing LLM-judge rankings flip with answer order, and proposing evidence, position-balancing and human-in-the-loop calibration."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2305.17926 (ACL 2024)
- **Authors:** Peiyi Wang, Lei Li, Liang Chen, Zefan Cai, Dawei Zhu, Binghuai Lin, Yunbo Cao, Qi Liu, Tianyu Liu, Zhifang Sui
- **Date:** 29 May 2023 (v2 30 August 2023)
- **Original:** [arxiv.org/abs/2305.17926](https://arxiv.org/abs/2305.17926); code at github.com/i-Eval/FairEval

## Summary

Shows that pairwise LLM judges are sensitive to which answer comes first, enough to reverse a model ranking, and proposes three calibration methods.

## Key claims

- Changing answer order alone can manipulate the ranking: with ChatGPT as judge, Vicuna-13B could be made to beat ChatGPT on 66 of 80 queries.
- **Multiple Evidence Calibration:** the judge writes explanations before the score, sampled several times.
- **Balanced Position Calibration:** evaluate both orders and aggregate.
- **Human-in-the-Loop Calibration:** an entropy measure over position-swapped judgments flags hard examples for human review.
- Calibrated judgments aligned more closely with their human annotations.

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md)
