---
title: "Source: Red Teaming Language Models to Reduce Harms"
summary: "Ganguli et al. (Anthropic, Aug 2022): 38,961 human red-team attacks across 2.7B-52B models; RLHF models get harder to red team as they scale."
category: source
lastmod: 2026-11-14
tags: ["security", "red-teaming", "paper"]
---

- **What:** research paper and dataset, arXiv:2209.07858
- **Authors:** Deep Ganguli, Liane Lovitt and 34 others (Anthropic)
- **Date:** 2022-08-23 (v2 2022-11-22)
- **Original:** [arXiv:2209.07858](https://arxiv.org/abs/2209.07858)

## Summary

A large manual red-teaming study that also released its attack data, and documented the instructions, process and statistics of the exercise so others could reproduce it.

## Key claims

- Released 38,961 human red-team attacks, ranging from offensive language to subtler non-violent unethical outputs.
- Compared four model types at 2.7B, 13B and 52B parameters: plain LM, LM prompted to be helpful/honest/harmless, rejection sampling, and RLHF.
- RLHF models became harder to red team as they scaled; the other three types showed a roughly flat trend.

## Feeds

[LLM red teaming](../concepts/llm-red-teaming.md)
