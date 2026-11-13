---
title: "Source: OpenAI — Rate limits guide"
summary: "OpenAI's rate-limit guide: RPM/RPD/TPM/TPD/IPM per org and project, usage tiers (Free/Build/Launch/Grow), x-ratelimit-* headers, max_tokens reservation, ramp guidance and retry rules."
category: source
lastmod: 2026-11-14
tags: ["platforms", "rate-limits"]
---

- **What:** official API documentation
- **Publisher:** OpenAI
- **Date:** living docs, read 2026-11-14
- **Original:** [developers.openai.com/api/docs/guides/rate-limits](https://developers.openai.com/api/docs/guides/rate-limits)

## Summary

Explains the five rate-limit dimensions, how tiers are earned, how usage is counted, and how clients should react to 429/503.

## Key claims

- Dimensions: RPM, RPD, TPM, TPD and IPM (images); whichever is hit first throttles. Limits apply per organisation and project, vary by model, and some models share one pool. Long-context requests can have a separate limit.
- Tiers (late 2026): Free, Build ($5 purchased), Launch ($100), Grow ($500), with monthly usage limits $100 / $500 / $5,000 / $200,000; upgrades are automatic. Example Grow limits: 15,000 RPM / 40M TPM for the Astra/Sol/Terra family.
- Counted usage is the greater of `max_tokens` and a character-based token estimate, so an oversized `max_tokens` reserves capacity you never use.
- Headers: `Retry-After` on temporary 429/503; `x-ratelimit-{limit,remaining,reset}-{requests,tokens}` plus project-scoped token variants.
- Error variants: 429 for a temporary limit, 429 `slow_down` for rapid traffic increases, 503 `server_is_overloaded` for overload.
- Failed requests count toward per-minute limits, so immediate resends do not help. Wait at least `Retry-After` plus jitter; otherwise exponential backoff with jitter; cap attempts and total retry time.
- SDKs retry eligible 429 and 503 responses automatically, subject to their retry settings (the guide gives no default count); if you retry yourself, disable SDK retries to avoid multiplying requests. Never retry quota or billing errors.
- Ramp guidance: past roughly 1M input TPM, grow by no more than 50% per 15 minutes.
- The Batch API has its own queue limit (enqueued input tokens per model) and does not use synchronous RPM/TPM; a hard spend limit also returns 429.

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md)
