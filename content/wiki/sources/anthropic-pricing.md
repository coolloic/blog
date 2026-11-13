---
title: "Source: Pricing (Anthropic Claude API)"
summary: "Anthropic's full price list: per-model token prices, cache multipliers, batch discount, long-context rules, data-residency and fast-mode premiums."
category: source
lastmod: 2026-11-14
tags: ["models", "anthropic", "pricing"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

## Summary

Lists every Claude model's price for base input, 5-minute and 1-hour cache writes, cache hits and output, then the modifiers that stack on top: batch, data residency, fast mode and long context.

## Key claims

- Cache writes cost 1.25x base input (5-minute TTL) or 2x (1-hour TTL); cache hits use a model-specific multiplier (0.1x by default, lower on Fable 5.x, Opus 5.5, Sonnet 5.5).
- The Batch API gives 50% off input and output; batch and caching discounts combine.
- Claude 4.6 and later models (except Haiku 5.5) bill the full 1M context at standard rates: a 900K-token request pays the same per-token rate as a 9K one.
- Haiku 5.5 is priced by prompt length: prompts over 100K tokens pay $0.50/$2.50 instead of $0.10/$0.50, counting cached tokens toward the threshold.
- US-only inference (`inference_geo: "us"`) applies a 1.1x multiplier to all token categories on 4.6+ models; partner clouds (Bedrock, Google-managed Vertex) price independently, regional endpoints there carry a 10% premium.
- Fast mode (up to 2.5x output speed) is premium-priced ($8/$40 on Opus 5.5, $16/$80 on Fable 5.2 and Mythos 5.2, $10/$50 on Opus 5 and Opus 4.8), available on Fable 5.2, Opus 5.5, Opus 5 (research preview) and Opus 4.8 (deprecated), and not combinable with batch.

## Feeds

[Frontier model landscape](../concepts/frontier-model-landscape.md) · [Model selection](../concepts/model-selection.md)
