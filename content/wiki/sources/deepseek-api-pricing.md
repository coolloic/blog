---
title: "Source: Models and pricing (DeepSeek API docs)"
summary: "DeepSeek's API models (V4.1-Flash, V4-Pro): 1M context, thinking modes, cache-hit pricing and off-peak discounts."
category: source
lastmod: 2026-11-14
tags: ["models", "deepseek", "pricing"]
---

- **What:** official API documentation page
- **Publisher:** DeepSeek
- **Date:** accessed 2026-11-14
- **Original:** [Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing)

## Summary

Describes the two API models, which map to the open-weight DeepSeek-V4.1-Flash-1017 and DeepSeek-V4-Pro-0813 checkpoints, and their pricing.

## Key claims

- `deepseek-flash` serves DeepSeek-V4.1-Flash-1017; `deepseek-v4-pro` serves DeepSeek-V4-Pro-0813; both 1M context with thinking (default) and non-thinking modes.
- Peak prices: Flash $0.30 input (cache miss) / $1.20 output; V4-Pro $1.32 / $3.96. Off-peak is half.
- Cache-hit input is 50x cheaper than cache-miss input on Flash ($0.006 vs $0.30) and 30x cheaper on V4-Pro ($0.044 vs $1.32).
- Peak hours are 01:00-04:00 and 06:00-10:00 UTC on weekdays (excluding Chinese public holidays); all other times are off-peak.
- Max output is listed as 384K tokens.
- The older `deepseek-v4-flash` and `deepseek-v4-flash-vision-exp` names are retired but still accepted; requests are served by V4.1-Flash-1017 at the Flash price.
- Both expose OpenAI-compatible and Anthropic-compatible endpoints, JSON output and tool calls.
- Flash supports vision; V4-Pro does not.

## Feeds

[Open-weight models](../concepts/open-weight-models.md) · [Frontier model landscape](../concepts/frontier-model-landscape.md)
