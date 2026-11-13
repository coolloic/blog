---
title: "Source: Gemini API — Rate limits"
summary: "Gemini Developer API limits: RPM/TPM/RPD per project (not per key), midnight-Pacific RPD reset, spend-based usage tiers, a rolling 10-minute spend limit, Priority inference limits, and Batch enqueued-token caps."
category: source
lastmod: 2026-11-14
tags: ["platforms", "rate-limits"]
---

- **What:** official API documentation
- **Publisher:** Google
- **Date:** living docs, read 2026-11-14
- **Original:** [aistudio.google.com/docs/rate-limits](https://aistudio.google.com/docs/rate-limits) (formerly ai.google.dev/gemini-api/docs/rate-limits)

## Summary

How the Gemini Developer API (AI Studio) meters usage. Vertex AI uses a different model; see [Vertex AI Standard PayGo](vertex-ai-standard-paygo-usage-tiers.md).

## Key claims

- Main dimensions are RPM, TPM (input) and RPD; exceeding any one returns an error. IPM applies to image models; some models have TPD. Built-in tools have their own limits (Search grounding on Gemini 3+: 1,500 RPD per project by default).
- Limits apply per project, not per API key; RPD resets at midnight Pacific.
- Tiers: Free; Tier 1 (linked billing); Tier 2 ($100 cumulative spend and 3 days since first payment); Tier 3 ($1,000 and 30 days). Upgrades take effect within about 10 minutes.
- A spend-based limit over a rolling 10-minute window (Tier 1 $10, Tiers 2–3 $200) returns `429 RESOURCE_EXHAUSTED`.
- Priority inference has its own limits, by default 0.3x the standard limit, and also counts toward interactive limits.
- Batch API: 100 concurrent batch requests, 2 GB input file, 20 GB storage, and per-model enqueued-token caps by tier.
- Published limits are not guaranteed; increases go through a request form.

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md)
