---
title: "Source: Pricing (OpenAI API)"
summary: "OpenAI's per-token prices across Standard, Batch/Flex and Priority tiers, including cached input and long-context surcharges."
category: source
lastmod: 2026-11-14
tags: ["models", "openai", "pricing"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Pricing](https://developers.openai.com/api/docs/pricing)

## Summary

Gives input, cached-input and output prices for current and legacy models across processing tiers, plus surcharges above 272K input tokens.

## Key claims

- Batch and Flex are half of Standard; Priority processing was renamed Fast mode on 2026-07-30 and costs 2x Standard.
- Cached input is 10x cheaper than fresh input on GPT-6 Astra ($1.00) and Luna ($0.01), and 20x cheaper on Sol ($0.10) and Terra ($0.05).
- Requests above 272K input tokens pay higher rates (Astra $20/$75, Sol $4/$15, Terra $2/$7.50, Luna $0.20/$0.75).
- Regional (data-residency) endpoints carry a 10% uplift for models released on or after 2026-03-05; FedRAMP endpoints also carry 10%.
- Legacy models remain priced (GPT-5.x, GPT-4.1, GPT-4o, o3, o3-pro), useful for migration cost comparisons.

## Feeds

[Frontier model landscape](../concepts/frontier-model-landscape.md) · [Model selection](../concepts/model-selection.md)
