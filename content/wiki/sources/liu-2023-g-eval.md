---
title: "Source: G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment (Liu et al., 2023)"
summary: "Paper introducing G-Eval: auto-generated evaluation steps, form-filling, and probability-weighted scores for LLM judges."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2303.16634 (EMNLP 2023)
- **Authors:** Yang Liu, Dan Iter, Yichong Xu, Shuohang Wang, Ruochen Xu, Chenguang Zhu (Microsoft)
- **Date:** 29 March 2023 (v3 23 May 2023)
- **Original:** [arxiv.org/abs/2303.16634](https://arxiv.org/abs/2303.16634)

## Summary

A recipe for pointwise LLM grading of generated text: give the judge the task and criterion, let it write its own evaluation steps (auto chain-of-thought), have it fill in a score field, and weight possible scores by their probabilities to get a continuous score.

## Key claims

- Direct integer scoring has two problems: one value (often 3 of 5) dominates, and models output integers even when asked for decimals, producing ties.
- Fix: score = Σ p(sᵢ) × sᵢ over the possible scores. GPT-4 exposed no token probabilities, so they estimated them from 20 samples at temperature 1.
- SummEval: G-Eval-4 reached Spearman 0.514 with human judgments, ahead of UniEval (0.474) and GPTScore (0.417); removing CoT dropped it to 0.500; GPT-3.5 reached 0.401.
- Bias: G-Eval-4 always scored GPT-3.5 summaries above human-written ones, even when humans preferred the human text; the authors warn that LLM evaluators used as reward signals could self-reinforce.

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md)
