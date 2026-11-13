---
title: "Source: Prompt design strategies (Google Gemini)"
summary: "Google's Gemini prompting guide: instructions, constraints, few-shot formatting, prefixes, decomposition, sampling parameters, system instructions and Gemini 3 advice."
category: source
lastmod: 2026-11-14
tags: ["prompting", "google", "gemini"]
---

- **What:** official documentation page
- **Publisher:** Google (Gemini API / AI Studio docs)
- **Date:** accessed 2026-11-14
- **Original:** [Prompt design strategies](https://aistudio.google.com/docs/prompting-strategies) (formerly ai.google.dev/gemini-api/docs/prompting-strategies)

## Summary

A broad, practical guide that treats prompting as iterative. It covers instructions and constraints, output format, zero-shot vs few-shot, adding context, prefixes and partial completions, breaking tasks down (split, chain, aggregate), sampling parameters, system instructions, a Gemini 3-specific section, and iteration tactics.

## Key claims

- Google recommends always including few-shot examples; clear examples can sometimes replace instructions. Too many examples risk overfitting.
- Examples must be formatted identically (tags, whitespace, separators); inconsistent examples produce inconsistent outputs.
- Starting the output yourself ("completion strategy", a prefix such as `Output:` or partial JSON) steers the model to continue in that format.
- Decomposition: one prompt per instruction, chained prompts where each output feeds the next, or parallel operations aggregated afterwards.
- Sampling: temperature 0 is greedy; topK 1 is greedy; topP default 0.95; pick stop sequences that will not appear in normal output.
- As of 2026-11, Gemini 4 and Gemini 3.6+ ignore custom `temperature`, `top_p` and `top_k`; for earlier Gemini 3 models keep defaults to avoid degraded reasoning.
- System instructions hold persistent behaviour (persona, verbosity, grounding rules, current date and knowledge cutoff).
- Gemini 3: be direct; pick one delimiter style (XML or Markdown) per prompt; put role, constraints and format in the system instruction or at the start; for long context put data first and instructions last, bridged by a phrase like "Based on the information above".
- Gemini 2.5/3 think internally, so asking them to show steps is usually unnecessary; asking them to think carefully on hard problems trades tokens for quality.
- Iteration tactics: rephrase, reframe as an analogous task, reorder examples/context/input.
- Avoid overly persuasive language with Gemini 3.

## Feeds

[Prompt engineering](../concepts/prompt-engineering.md) · [Few-shot prompting](../concepts/few-shot-prompting.md) · [Chain-of-thought](../concepts/chain-of-thought.md) · [System prompts](../concepts/system-prompts.md)
