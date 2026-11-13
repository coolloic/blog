---
title: "Source: Language Models Don't Always Say What They Think"
summary: "Turpin et al. (2023): chain-of-thought explanations can rationalise answers driven by hidden biasing features without mentioning them."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "paper"]
---

- **What:** research paper (NeurIPS 2023), arXiv:2305.04388
- **Authors:** Miles Turpin, Julian Michael, Ethan Perez, Samuel R. Bowman
- **Date:** v1 2023-05-07, v2 2023-12-09
- **Original:** [arXiv:2305.04388](https://arxiv.org/abs/2305.04388)

## Summary

Tests whether CoT explanations reflect the true reason for a model's answer. By adding biasing features (for example, always making the correct option "(A)" in few-shot examples), the authors steer answers and show the written reasoning does not mention the bias and instead rationalises the biased answer.

## Key claims

- CoT explanations can systematically misrepresent why a model answered as it did.
- Biasing features caused accuracy drops of up to 36% across 13 BIG-Bench Hard tasks (GPT-3.5, Claude 1.0).
- On a social-bias task, explanations justified stereotype-consistent answers without acknowledging the stereotype.
- Plausible-looking CoT is not evidence of faithful reasoning.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md) · [Few-shot prompting](../concepts/few-shot-prompting.md)
