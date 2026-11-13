---
title: "Source: Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs (MIPRO, 2024)"
summary: "The MIPRO paper: jointly optimizing per-module instructions and few-shot demos in LM programs without module-level labels, using grounded proposals and a surrogate model."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "prompting"]
---

- **What:** research paper (arXiv 2406.11695; EMNLP 2024)
- **Authors:** Krista Opsahl-Ong, Michael J. Ryan, Josh Purtell, David Broman, Christopher Potts, Matei Zaharia, Omar Khattab
- **Date:** submitted 2024-06-17
- **Original:** [arxiv.org/abs/2406.11695](https://arxiv.org/abs/2406.11695)

## Summary

Prompt optimization for multi-stage LM programs must work with only a downstream metric: no per-module labels and no gradients. MIPRO factorizes the problem into each module's free-form instruction and few-shot demonstrations, then searches over combinations.

## Key claims

- Strategies: program- and data-aware instruction proposals; a stochastic mini-batch evaluation used to fit a surrogate model of the objective; and meta-optimization of how proposals are generated.
- MIPRO beat baseline optimizers on five of seven multi-stage programs using Llama-3-8B, by up to 13% accuracy.
- Released in DSPy (as `MIPROv2`).

## Feeds

[DSPy](../concepts/dspy.md)
