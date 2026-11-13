---
title: "Source: LLM Evaluators Recognize and Favor Their Own Generations (Panickssery et al., 2024)"
summary: "Paper linking an LLM's ability to recognise its own text to its tendency to rate that text higher."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2404.13076 (NeurIPS 2024)
- **Authors:** Arjun Panickssery, Samuel R. Bowman, Shi Feng
- **Date:** 15 April 2024
- **Original:** [arxiv.org/abs/2404.13076](https://arxiv.org/abs/2404.13076)

## Summary

Studies self-preference bias: judges such as GPT-4 and Llama 2 rate their own outputs higher than others rate them. The paper tests whether this comes from the judge recognising its own text.

## Key claims

- Out of the box, models distinguish their own outputs from other LLMs' and humans' with non-trivial accuracy.
- Fine-tuning that changes self-recognition changes self-preference in a linear relationship.
- Controlled experiments suggest the link is causal rather than explained by simple confounders.
- Self-recognition threatens unbiased LLM-as-evaluator setups (and reward modelling).

## Feeds

[LLM-as-judge](../concepts/llm-as-judge.md)
