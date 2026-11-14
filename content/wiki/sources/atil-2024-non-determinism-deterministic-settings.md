---
title: "Source: Non-Determinism of \"Deterministic\" LLM Settings (Atil et al., 2024)"
summary: "Empirical study of five LLMs at temperature 0, top-p 1 and fixed seed: accuracy varies up to 15% across runs, best-to-worst gaps reach 70%, and no model gives identical strings consistently."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper (arXiv 2408.04667)
- **Author:** Berk Atil, Sarp Aykent, Alexa Chittams, Lisheng Fu, Rebecca J. Passonneau, Evan Radcliffe, Guru Rajan Rajagopal, Adam Sloan, Tomasz Tudrej, Ferhan Ture, Zhe Wu, Lixinyu Xu, Breck Baldwin
- **Date:** v1 6 August 2024; v5 2 April 2025
- **Original:** [arxiv.org/abs/2408.04667](https://arxiv.org/abs/2408.04667)

## Summary

Runs GPT-3.5 Turbo, GPT-4o, Llama-3-70B-Instruct, Llama-3-8B-Instruct and Mixtral-8x7B-Instruct ten times each on eight BBH and MMLU tasks with settings meant to be deterministic, and measures how much answers and raw strings move.

## Key claims

- Accuracy varied by up to 15% across runs; the gap between best and worst possible per-item outcomes reached 70%.
- No model produced identical raw strings consistently; instability differs by task and by model.
- Introduces TARr@N (agreement of raw outputs over N runs) and TARa@N (agreement of parsed answers).
- Longer outputs correlate with lower agreement and wider accuracy spread.
- Recommendations: report max-min accuracy across runs, cap generation length where possible, write regression tests that tolerate variation, and build parsers robust to format drift.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)
