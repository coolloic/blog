---
title: "Source: s1 — Simple Test-Time Scaling (Muennighoff et al., 2025)"
summary: "Paper showing 1,000 curated reasoning traces plus 'budget forcing' give a 32B model controllable test-time scaling that beats o1-preview on competition math."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "research"]
---

- **What:** research paper (arXiv 2501.19393)
- **Authors:** Niklas Muennighoff, Zitong Yang, Weijia Shi, Xiang Lisa Li, Li Fei-Fei, Hannaneh Hajishirzi, Luke Zettlemoyer, Percy Liang, Emmanuel Candès, Tatsunori Hashimoto
- **Date:** 2025-01-31 (v3 2025-03-01)
- **Original:** [arXiv:2501.19393](https://arxiv.org/abs/2501.19393)

## Summary

A minimal recipe for a reasoning model: SFT Qwen2.5-32B-Instruct on 1,000 hard, diverse, high-quality questions with reasoning traces (s1K). Thinking length is then controlled at decode time with "budget forcing".

## Key claims

- Budget forcing: to cut thinking, force the end-of-thinking delimiter; to extend it, suppress the stop and append "Wait", which often makes the model re-check and fix errors.
- s1-32B beats o1-preview on competition math (MATH, AIME24) by up to 27%.
- Budget forcing lifts AIME24 from 50% to 57%, beyond the model's unforced performance.
- Model, data and code are open.

## Feeds

[Test-time compute](../concepts/test-time-compute.md) · [Reasoning models](../concepts/reasoning-models.md)
