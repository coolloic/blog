---
title: "Source: Calibrate Before Use: Improving Few-Shot Performance of Language Models"
summary: "Zhao et al. (2021): few-shot accuracy swings with example choice, order and format because of recency and common-token biases; contextual calibration corrects it."
category: source
lastmod: 2026-11-14
tags: ["prompting", "paper"]
---

- **What:** research paper (ICML 2021), arXiv:2102.09690
- **Authors:** Tony Z. Zhao, Eric Wallace, Shi Feng, Dan Klein, Sameer Singh
- **Date:** v1 2021-02-19, v2 2021-06-10
- **Original:** [arXiv:2102.09690](https://arxiv.org/abs/2102.09690)

## Summary

Documents how unstable GPT-3 few-shot prompting is, traces the instability to systematic output biases, and proposes contextual calibration to correct them.

## Key claims

- Accuracy depends on prompt format, which examples are chosen and even their order, ranging from near chance to near state of the art.
- Causes: recency bias (favouring answers near the end of the prompt) and common-token bias (favouring answers frequent in pre-training).
- Contextual calibration: run the prompt with a content-free input such as "N/A", estimate the bias, then rescale so that input's predictions are uniform.
- Calibration raised GPT-2/GPT-3 average accuracy by up to 30.0 points absolute and reduced variance across prompts.

## Feeds

[Few-shot prompting](../concepts/few-shot-prompting.md)
