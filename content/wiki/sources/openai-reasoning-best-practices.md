---
title: "Source: Reasoning best practices (OpenAI)"
summary: "OpenAI's guide to when to use reasoning models and how prompting them differs: simpler prompts, no CoT instructions, zero-shot first."
category: source
lastmod: 2026-11-14
tags: ["prompting", "openai", "reasoning"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14 (examples reference o1, o3, o3-mini, o4-mini, GPT-4o)
- **Original:** [Reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)

## Summary

Positions reasoning models as "planners" for ambiguous, multi-step, document-heavy or evaluation tasks, and GPT models as fast, cheap "workhorses" for well-defined tasks, with a common pattern of planning on one and executing on the other. It then lists how prompting changes for reasoning models.

## Key claims

- From `o1-2024-12-17`, reasoning models take `developer` messages in place of system messages.
- Keep prompts brief and direct. Asking reasoning models to "think step by step" is unnecessary and can hurt.
- Use delimiters (Markdown, XML, section titles) to separate input parts.
- Try zero-shot first; add few-shot examples only if needed, and make them match the instructions closely.
- State explicit constraints and define what success looks like.
- Reasoning models avoid markdown by default; a first line of "Formatting re-enabled" in the developer message turns it back on.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md) · [Few-shot prompting](../concepts/few-shot-prompting.md) · [System prompts](../concepts/system-prompts.md)
