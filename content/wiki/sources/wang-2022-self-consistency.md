---
title: "Source: Self-Consistency Improves Chain of Thought Reasoning in Language Models"
summary: "Wang et al. (2022): sample many chain-of-thought paths and take a majority vote over final answers instead of greedy decoding."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "paper"]
---

- **What:** research paper (ICLR 2023), arXiv:2203.11171
- **Authors:** Xuezhi Wang, Jason Wei, Dale Schuurmans, Quoc Le, Ed Chi, Sharan Narang, Aakanksha Chowdhery, Denny Zhou
- **Date:** v1 2022-03-21, v4 2023-03-07
- **Original:** [arXiv:2203.11171](https://arxiv.org/abs/2203.11171)

## Summary

Replaces greedy decoding of a single chain of thought with sampling several diverse reasoning paths and marginalising over them by picking the most frequent final answer. The intuition: a hard problem admits multiple valid reasoning routes that converge on the same correct answer, while errors scatter.

## Key claims

- Absolute gains over CoT: GSM8K +17.9%, SVAMP +11.0%, AQuA +12.2%, StrategyQA +6.4%, ARC-challenge +3.9%.
- Main experiments sample 40 outputs per run; the authors note performance saturates quickly and suggest starting with 5 or 10 paths "to realize most of the gains".
- Requires no extra training, verifier or fine-tuning; only sampling at non-zero temperature plus an answer-aggregation step.
- Works when answers come from a fixed set or can be compared exactly (numbers, options).

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)
