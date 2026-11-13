---
title: "Source: Constitutional AI: Harmlessness from AI Feedback"
summary: "Anthropic's 2022 paper training a harmless assistant using AI-generated critiques and AI preference labels guided by a written constitution."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2212.08073)
- **Author:** Yuntao Bai et al. (Anthropic, 51 authors)
- **Date:** 2022-12-15
- **Original:** [arXiv:2212.08073](https://arxiv.org/abs/2212.08073)

## Summary

Replaces human harmlessness labels with a short list of principles. A supervised phase has the model critique and revise its own answers, then trains on the revisions. An RL phase has an AI model choose the better of two samples, trains a preference model on those choices, and runs RL against it (RLAIF).

## Key claims

- The only human oversight is the list of principles (the constitution).
- Supervised phase: sample → self-critique → revise → fine-tune on revisions.
- RL phase: AI pairwise preferences train a preference model used as the RL reward (RL from AI Feedback).
- The result is harmless but non-evasive: it explains objections instead of just refusing.

## Feeds

[Preference optimization](../concepts/preference-optimization.md)
