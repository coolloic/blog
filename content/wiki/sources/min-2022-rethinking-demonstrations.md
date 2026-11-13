---
title: "Source: Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?"
summary: "Min et al. (2022): in few-shot classification, label correctness matters little; label space, input distribution and format drive gains."
category: source
lastmod: 2026-11-14
tags: ["prompting", "paper"]
---

- **What:** research paper (EMNLP 2022), arXiv:2202.12837
- **Authors:** Sewon Min, Xinxi Lyu, Ari Holtzman, Mikel Artetxe, Mike Lewis, Hannaneh Hajishirzi, Luke Zettlemoyer
- **Date:** v1 2022-02-25, v2 2022-10-20
- **Original:** [arXiv:2202.12837](https://arxiv.org/abs/2202.12837)

## Summary

Asks which parts of few-shot demonstrations actually help. Across 12 models including GPT-3, on classification and multiple-choice tasks, randomly replacing demonstration labels barely hurt accuracy. What mattered was exposure to the label space, the distribution of input text, and the overall format.

## Key claims

- Ground-truth labels in demonstrations are largely not required for these tasks.
- Label space, input distribution and sequence format are the main drivers of in-context gains.
- Suggests demonstrations mostly tell the model *what the task looks like* rather than teaching the input-label mapping.

## Feeds

[Few-shot prompting](../concepts/few-shot-prompting.md)
