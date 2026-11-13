---
title: "Source: Models (OpenAI API docs)"
summary: "OpenAI's model catalogue: the GPT-6 family (Astra, Sol, Terra, Luna) with context windows, output limits, prices, cutoffs and reasoning-effort levels."
category: source
lastmod: 2026-11-14
tags: ["models", "openai"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Models](https://developers.openai.com/api/docs/models)

## Summary

Lists OpenAI's current flagship text models and how to pick among them. Each model exposes a reasoning-effort setting rather than a separate reasoning model line.

## Key claims

- Current family (2026-11-14): GPT-6 Astra (most capable, $10/$50), GPT-6.1 Sol (near-Astra at $2/$10), GPT-6.1 Terra (visual reasoning, computer use, writing; $1/$5), GPT-6 Luna (most efficient, $0.10/$0.50).
- All four list a 1.05M-token context window and 128K max output.
- Knowledge cutoffs: Astra and Sol 2026-04-30, Luna 2026-05-18, Terra 2026-06-01.
- Reasoning effort: Astra and Sol accept low to max; Terra and Luna also accept `none`.
- Recommendations: Astra for complex reasoning and coding, Sol for capability/cost balance, Luna for cost-sensitive high-volume work.
- The catalogue page does not list the gpt-oss open-weight models.

## Feeds

[Frontier model landscape](../concepts/frontier-model-landscape.md) · [Model selection](../concepts/model-selection.md)
