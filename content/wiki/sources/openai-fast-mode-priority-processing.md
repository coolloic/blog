---
title: "Source: OpenAI — Fast mode (formerly priority processing)"
summary: "OpenAI's pay-per-token premium tier (`service_tier: \"fast\"`/`\"priority\"`): faster, steadier latency, ramp-rate downgrades to Standard, shared rate limits, and its relation to Scale Tier."
category: source
lastmod: 2026-11-14
tags: ["platforms", "capacity", "latency"]
---

- **What:** official API documentation
- **Publisher:** OpenAI
- **Date:** living docs, read 2026-11-14 (priority processing renamed Fast mode on 2026-07-30)
- **Original:** [developers.openai.com/api/docs/guides/priority-processing](https://developers.openai.com/api/docs/guides/priority-processing)

## Summary

Fast mode buys lower and more consistent latency per token, without a commitment, for user-facing traffic.

## Key claims

- Set `service_tier` to `"fast"` or `"priority"`, or make Fast the project default. Up to 2.5x faster than Standard for `gpt-5.6-sol`, with more consistent latency. For GPT-5.6 and earlier the response reports `priority` whichever value you send.
- The response's `service_tier` field reports the tier actually used; a request downgraded by the ramp limit reports `"default"` and is billed at Standard rates.
- Price premium: GPT-5.6 Sol at 2x Standard ($8/$40 per 1M input/output short context, $16/$60 long context, promotional through at least 2026-11-21).
- Fast and Standard share the same per-model rate limit. Ramp rule of thumb: past 1M input TPM, add no more than 50% per 15 minutes; the ramp limit is shared across all customers. Shift traffic over hours with feature flags; don't run ETL/batch jobs in Fast mode.
- GPT-6 Astra Fast mode has no latency SLA; for GPT-5.6 and earlier, Fast mode and Scale Tier share SLA treatment with service credits for eligible Enterprise contracts.
- Fast mode is billed separately from Scale Tier and does not draw on Scale Tier units; Scale Tier spillover does not go to Fast mode. Heavy ramp-limit hits suggest buying Scale Tier.
- Not available for fine-tuned models or embeddings, nor with EU data residency for GPT-6 Astra and GPT-6 Sol.

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md), [Provisioned throughput](../concepts/provisioned-throughput.md)
