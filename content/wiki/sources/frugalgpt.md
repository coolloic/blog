---
title: "Source: FrugalGPT (Chen, Zaharia, Zou 2023)"
summary: "Paper proposing LLM cascades and other strategies to cut LLM API cost while matching or beating the best single model."
category: source
lastmod: 2026-11-14
tags: ["models", "model-selection", "cost"]
---

- **What:** research paper (arXiv:2305.05176)
- **Publisher:** Lingjiao Chen, Matei Zaharia, James Zou (Stanford)
- **Date:** 2023-05-09
- **Original:** [arXiv:2305.05176](https://arxiv.org/abs/2305.05176)

## Summary

Observes that LLM API prices vary by two orders of magnitude and proposes three cost levers. Its main method is a learned cascade that sends a query to cheap models first and escalates when a scorer judges the answer unreliable.

## Key claims

- Three strategies: prompt adaptation (shorter prompts), LLM approximation (caching, fine-tuned substitutes), LLM cascade.
- The cascade learns which sequence of LLMs to query per input.
- Reported result: matches GPT-4 with up to 98% cost reduction, or improves accuracy by 4% at equal cost (2023 models and prices).

## Feeds

[Model selection](../concepts/model-selection.md)
