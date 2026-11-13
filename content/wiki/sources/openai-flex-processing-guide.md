---
title: "Source: OpenAI — Flex processing guide"
summary: "OpenAI's `service_tier: \"flex\"`: Batch-rate pricing on synchronous calls in exchange for slower responses and occasional 429 Resource Unavailable, with longer timeouts and fallback guidance."
category: source
lastmod: 2026-11-14
tags: ["platforms", "capacity", "cost"]
---

- **What:** official API documentation
- **Publisher:** OpenAI
- **Date:** living docs (beta), read 2026-11-14
- **Original:** [developers.openai.com/api/docs/guides/flex-processing](https://developers.openai.com/api/docs/guides/flex-processing)

## Summary

Flex is a cheaper synchronous tier for evals, enrichment and async jobs. It is billed at Batch API rates but may be slow or temporarily unavailable.

## Key claims

- Enabled per request with `service_tier="flex"` on Responses or Chat Completions; beta, limited model support.
- Pricing equals Batch API rates; prompt caching discounts stack.
- Official SDKs default to a 10-minute timeout; the guide suggests raising it (examples use 15 minutes) for flex. SDKs retry `408 Request Timeout` twice.
- When capacity is short, flex returns `429 Resource Unavailable`, which is not billed.
- Two retry strategies: exponential backoff when cost matters more than latency, or fall back to the default tier (`service_tier="auto"` or omit) when completion matters more.

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md)
