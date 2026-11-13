---
title: "Source: Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.)"
summary: "NeurIPS 2023 paper introducing MT-Bench and quantifying LLM-judge position, verbosity and self-enhancement biases."
category: source
lastmod: 2026-11-14
tags: ["models", "evaluation"]
---

- **What:** research paper (arXiv:2306.05685), NeurIPS 2023 Datasets and Benchmarks
- **Authors:** Lianmin Zheng, Wei-Lin Chiang, Ying Sheng, ... Joseph E. Gonzalez, Ion Stoica (LMSYS, UC Berkeley and others)
- **Date:** 9 June 2023 (v4 24 December 2023)
- **Original:** [arxiv.org/abs/2306.05685](https://arxiv.org/abs/2306.05685)

## Summary

The paper introduces MT-Bench (multi-turn questions) and Chatbot Arena (crowdsourced pairwise battles) and studies whether strong LLMs can stand in for human raters. GPT-4 agrees with humans over 80% of the time, about the human-human level, but judges have measurable biases, which the paper quantifies and partially mitigates.

## Key claims

- **Position bias** (pairwise, answers swapped): consistency was 65.0% for GPT-4, 46.2% for GPT-3.5 and 23.8% for Claude-v1 (default prompt); Claude-v1 favoured the first answer 75% of the time.
- **Verbosity bias:** a "repetitive list" attack (padding an answer with rephrased items) fooled Claude-v1 and GPT-3.5 in 91.3% of 23 cases and GPT-4 in 8.7%.
- **Self-enhancement:** GPT-4 rated itself about 10% higher win rate than humans did, Claude-v1 about 25%, but data were too limited to conclude.
- Judges can be misled by the answers they grade, even on math they can solve; a reference-guided judge cut GPT-4's math grading failure rate from 70% to 15%.
- Mitigations: call the judge twice with swapped order and count disagreement as a tie; few-shot examples raised GPT-4 consistency from 65.0% to 77.5% at about 4x prompt cost; chain-of-thought and reference answers.

## Feeds

[LLM limitations](../concepts/llm-limitations.md)
