---
title: "Source: Anthropic API rate limits docs"
summary: "Anthropic's rate-limit reference: token-bucket RPM/ITPM/OTPM limits per tier, cache-aware ITPM, ramp limits, spend caps, and the 429 / retry-after / anthropic-ratelimit-* header contract."
category: source
lastmod: 2026-11-14
tags: ["platforms", "rate-limits"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** living docs, read 2026-11-14
- **Original:** [platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits)

## Summary

Explains how Claude API limits are enforced and signalled, which is the contract any gateway retry or fallback policy has to respect.

## Key claims

- Limits are per organisation and per model class: requests per minute, input tokens per minute (ITPM) and output tokens per minute (OTPM), enforced with a token bucket that refills continuously; short bursts can trip a per-minute limit.
- Exceeding a limit returns 429 naming the limit; when a `retry-after` header is present, wait that many seconds.
- Cache-aware ITPM: tokens read from the prompt cache do not count toward ITPM (e.g. 2M ITPM at 80% cache hit rate allows about 10M total input tokens/min).
- Ramp limits: a sharp usage increase can 429 below the rate limit (`error_code: ramp_limit_exceeded`); wait at least the `retry-after` seconds, then ramp up by at most one step per minute. Cache reads do not count toward ramp limits, and the Message Batches API is exempt.
- Monthly spend caps per tier also return 429 `rate_limit_error` but with no `retry-after` and `error_code: enforced_spend_limit_reached`; retrying does not help. A lower spend limit that the organisation sets itself returns HTTP 400 `invalid_request_error` instead of 429.
- OTPM counts only output tokens actually generated, evaluated in real time; `max_tokens` does not factor into OTPM, so a high `max_tokens` has no rate-limit downside.
- Fast mode (`speed: "fast"`, on Fable 5.2, Mythos 5.2, Opus 5.5 and some older Opus models) has dedicated rate limits and its own ramp limits, separate from standard usage.
- Headers `anthropic-ratelimit-{requests,tokens,input-tokens,output-tokens}-{limit,remaining,reset}` expose remaining capacity.

## Feeds

[Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md), [Rate limits and retries](../concepts/rate-limits-and-retries.md)
