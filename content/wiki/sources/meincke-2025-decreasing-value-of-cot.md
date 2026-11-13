---
title: "Source: Prompting Science Report 2: The Decreasing Value of Chain of Thought"
summary: "Meincke, Mollick, Mollick and Shapiro (2025): explicit CoT prompts give small, variable gains on non-reasoning models and only marginal gains on reasoning models at much higher time and token cost."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "paper"]
---

- **What:** technical report (Wharton Generative AI Labs), arXiv:2506.07142
- **Authors:** Lennart Meincke, Ethan Mollick, Lilach Mollick, Dan Shapiro
- **Date:** 2025-06-08
- **Original:** [arXiv:2506.07142](https://arxiv.org/abs/2506.07142)

## Summary

Re-measures the benefit of "think step by step" style prompting on 2025-era models, using GPQA Diamond (198 PhD-level multiple-choice questions) with 25 runs per question per condition.

## Key claims

- Non-reasoning models: CoT prompting gives a small average improvement but adds answer variability, causing occasional errors on questions the model would otherwise get right.
- Many recent non-reasoning models already reason step by step unprompted, shrinking the gain.
- Reasoning models: explicit CoT gives marginal accuracy gains while substantially increasing time and tokens.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)
