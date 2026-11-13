---
title: "Source: Justice or Prejudice? Quantifying Biases in LLM-as-a-Judge (Ye et al., 2024)"
summary: "Paper defining 12 LLM-judge biases and the CALM framework that measures each by perturbing answers."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2410.02736 (ICLR 2025)
- **Authors:** Jiayi Ye, Yanbo Wang, Yue Huang, Dongping Chen, Qihui Zhang, Nuno Moniz, Tian Gao, Werner Geyer, Chao Huang, Pin-Yu Chen, Nitesh V. Chawla, Xiangliang Zhang
- **Date:** 3 October 2024
- **Original:** [arxiv.org/abs/2410.02736](https://arxiv.org/abs/2410.02736)

## Summary

CALM injects a controlled perturbation (reordering, padding, fake citations, emotional tone, and so on) into judged answers and measures the robustness rate: the share of verdicts that do not change. Judges tested were ChatGPT, GPT-4-Turbo, GPT-4o, GLM-4, Claude-3.5 and Qwen2.

## Key claims

- Twelve biases: position, verbosity, compassion-fade (model names shown), bandwagon (majority opinion), distraction, fallacy-oversight, authority (citations, even fake), sentiment, diversity (identity markers), chain-of-thought, self-enhancement, refinement-aware (told an answer was refined).
- Sentiment was the most severe: making the better answer sad, angry or fearful cut robustness to roughly 0.24-0.38 for most strong judges.
- Position robustness ranged from 0.57 (ChatGPT) to 0.83 (Claude-3.5) with two candidates and fell below 0.5 for most models with three or four candidates.
- Self-enhancement varied widely by model (highest for Qwen2, lowest for GPT-4-Turbo and GLM-4).
- Authority, bandwagon and distraction moved verdicts noticeably for some judges; verbosity and fallacy-oversight robustness were high (about 0.88-0.98) for these 2024 judges.
- Strong judges perform well overall, but significant biases persist on specific tasks.

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md)
