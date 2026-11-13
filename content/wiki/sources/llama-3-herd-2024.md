---
title: "Source: The Llama 3 Herd of Models (Meta, 2024)"
summary: "Meta's Llama 3 paper; its post-training sections document large-scale rejection sampling, LLM-judge filtering and execution-verified synthetic data."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** technical report (arXiv:2407.21783)
- **Author:** Aaron Grattafiori, Abhimanyu Dubey, Abhinav Jauhri, et al. (Llama Team, Meta)
- **Date:** 2024-07-31 (v3 2024-11-23)
- **Original:** [arXiv:2407.21783](https://arxiv.org/abs/2407.21783)

## Summary

Describes the Llama 3 model family up to 405B. Read here: the post-training capability sections (4.3) on code, multilinguality, maths and reasoning, and long context, which explain how synthetic and rejection-sampled data were produced and filtered.

## Key claims

- Code: earlier Llama 3 checkpoints judge rejection-sampled code with a binary score for correctness and style, and only perfect scores are kept. This strict filter first hurt benchmarks because it removed hard prompts disproportionately. The fix was to revise responses in the hardest categories until they passed.
- Maths: step-by-step solutions are filtered by final-answer correctness and self-verification. Outcome and stepwise reward models remove traces with invalid intermediate steps. MCTS with step-wise reward models is used on hard prompts. Code execution weeds out invalid interleaved code-and-text reasoning.
- Multilingual: rejection sampling used a constant temperature of 0.6 in the final post-training round (earlier rounds varied it), with language-match checks before reward-model selection.
- Long context: synthetic long-context data was only about 0.1% of the SFT mix.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)
