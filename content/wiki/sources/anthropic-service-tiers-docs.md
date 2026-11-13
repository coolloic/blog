---
title: "Source: Anthropic — Service tiers (Priority Tier)"
summary: "Anthropic's legacy service-tier page: Standard, Batch and Priority Tier; Priority commitments in ITPM/OTPM with cache-weighted burndown, 99.5% uptime target, `service_tier` auto/standard_only. No longer sold as of late 2026."
category: source
lastmod: 2026-11-14
tags: ["platforms", "capacity"]
---

- **What:** official API documentation (marked legacy)
- **Publisher:** Anthropic
- **Date:** living docs, read 2026-11-14
- **Original:** [platform.claude.com/docs/en/api/service-tiers](https://platform.claude.com/docs/en/api/service-tiers)

## Summary

Describes how the Claude API assigns a request to Priority, Standard or Batch capacity. As read on 2026-11-14 the page is marked legacy: Priority Tier commitments are no longer sold, existing ones run to contract end, and guaranteed capacity goes through sales.

## Key claims

- Standard is best-effort and the default. Priority Tier requests are served ahead of all others, which reduces 529 overloaded errors at peak.
- A Priority commitment specifies input TPM, output TPM, a term (1, 3, 6 or 12 months) and one model version; it targets 99.5% uptime, and overflow falls back to Standard automatically.
- Burndown against Priority capacity follows relative price: cache reads 0.1, 5-minute cache writes 1.25, 1-hour cache writes 2.0, US-only inference 1.1 on Claude 4.6+; other tokens 1.
- Priority requests also count against regular rate limits; a request that would exceed them is declined.
- `service_tier`: `auto` (default, use Priority if available) or `standard_only`. The response `usage.service_tier` reports the assigned tier; `anthropic-priority-{input,output}-tokens-{limit,remaining,reset}` headers show commitment state.
- Priority Tier does not cover most 5.x-generation models (Opus 5/5.5, Sonnet 5/5.5, Haiku 5.5, Fable 5.1/5.2, Mythos 5.x and Mythos Preview); Claude Fable 5 is still supported, alongside the 4.5–4.8 models.

## Feeds

[Provisioned throughput](../concepts/provisioned-throughput.md), [Rate limits and retries](../concepts/rate-limits-and-retries.md)
