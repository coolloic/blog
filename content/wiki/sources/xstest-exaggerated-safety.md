---
title: "Source: XSTest: A Test Suite for Identifying Exaggerated Safety Behaviours in LLMs"
summary: "NAACL 2024 test suite of 250 safe-but-scary-sounding prompts that measures over-refusal."
category: source
lastmod: 2026-11-14
tags: ["models", "safety", "benchmarks"]
---

- **What:** benchmark paper (arXiv:2308.01263), NAACL 2024
- **Authors:** Paul Roettger, Hannah Rose Kirk, Bertie Vidgen, Giuseppe Attanasio, Federico Bianchi, Dirk Hovy
- **Date:** 2 August 2023 (v3 1 April 2024)
- **Original:** [arxiv.org/abs/2308.01263](https://arxiv.org/abs/2308.01263)

## Summary

XSTest measures **exaggerated safety**: refusing prompts that are clearly safe but resemble unsafe ones ("how do I kill a Python process?"). It has 250 safe prompts in ten types and 200 contrasting unsafe prompts that models should refuse, so over-refusal and under-refusal are measured together.

## Key claims

- Safe prompt types: homonyms, figurative language, safe targets, safe contexts, definitions, real discrimination against nonsense groups, nonsense discrimination against real groups, historical events, privacy (public figures), privacy (fictional).
- Full refusal on safe prompts: Llama-2-70B-chat with its original system prompt 38% (plus 21.6% partial); without system prompt 14%; GPT-4 6.4%; Mistral-7B-Instruct 0.8%, rising to 9.6% with a guardrail system prompt.
- Cause: lexical overfitting; models react to trigger words instead of meaning.
- System prompts that emphasise safety raise over-refusal.
- Some over-refusal can be an acceptable price for safety on unsafe prompts, depending on the application.

## Feeds

[LLM limitations](../concepts/llm-limitations.md) · [Jailbreaks](../concepts/jailbreaks.md)
