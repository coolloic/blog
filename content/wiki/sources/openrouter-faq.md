---
title: "Source: OpenRouter FAQ (fees, BYOK, free-model limits)"
summary: "OpenRouter's FAQ: provider prices passed through, a fee on credit purchases, a BYOK allowance, and daily limits on free models."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "cost"]
---

- **What:** official FAQ page
- **Publisher:** OpenRouter
- **Date:** living docs, read 2026-11-14
- **Original:** [openrouter.ai/docs/faq](https://openrouter.ai/docs/faq)

## Summary

Explains how OpenRouter charges: inference passes through at provider prices, and the platform earns a fee when credits are purchased or when BYOK usage exceeds a free allowance.

## Key claims

- 5.5% fee ($0.80 minimum) on credit purchases; 5% for crypto. Inference is priced at the provider's rate.
- BYOK: no fee up to a plan-dependent allowance (pay-as-you-go: $25,000/month of list-price usage), then 5% of what the same usage would cost on OpenRouter.
- Free models: 50 requests/day with under 10 purchased credits, 1,000/day with at least 10.
- On provider errors, OpenRouter falls back to the next provider transparently.

## Feeds

[LLM gateways](../concepts/llm-gateways.md)
