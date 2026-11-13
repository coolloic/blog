---
title: "Source: Context Rot: How Increasing Input Tokens Impacts LLM Performance (Chroma)"
summary: "Chroma technical report testing 18 LLMs and showing performance falls as input grows, even on simple tasks, in ways NIAH does not reveal."
category: source
lastmod: 2026-11-14
tags: ["models", "long-context"]
---

- **What:** technical report
- **Authors:** Kelly Hong, Anton Troynikov, Jeff Huber (Chroma)
- **Date:** 14 July 2025
- **Original:** [trychroma.com/research/context-rot](https://www.trychroma.com/research/context-rot)

## Summary

The report popularised the term **context rot**. It holds task difficulty fixed and varies only input length, across 18 models (Claude Opus 4, Sonnet 4/3.7/3.5, Haiku 3.5; o3, GPT-4.1 family, GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo; Gemini 2.5 Pro/Flash, 2.0 Flash; Qwen3 235B/32B/8B). Performance degrades non-uniformly as inputs grow, even for trivially simple tasks, and standard needle-in-a-haystack (NIAH) scores overstate long-context reliability.

## Key claims

- Lower semantic similarity between question and needle makes degradation with length steeper.
- One distractor (topically similar but wrong) lowers accuracy; four compound it; distractors differ in how much they hurt.
- Counter-intuitively, haystacks of shuffled sentences gave better accuracy than logically coherent haystacks.
- LongMemEval (306 prompts): every model scored much higher on focused prompts (about 300 tokens of relevant history) than on the full prompt (about 113k tokens).
- Repeated-words copying task: accuracy falls with length for all families; failure modes include refusals (about 2.9% Opus 4, 2.6% GPT-4.1), random words and runaway generation.
- Family differences: Claude models hallucinated least under distractors but abstained more; GPT models showed the highest hallucination rates with distractors; Gemini and Qwen produced more off-task output on repetition.
- Takeaway: how information is presented matters, not only whether it is present; evaluate beyond NIAH and engineer the context.

## Feeds

[Long-context degradation](../concepts/long-context-degradation.md) · [Hallucination](../concepts/hallucination.md) · [LLM limitations](../concepts/llm-limitations.md)
