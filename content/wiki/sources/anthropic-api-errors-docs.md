---
title: "Source: Anthropic — Claude API errors"
summary: "Anthropic's error reference: HTTP codes (429 rate_limit_error, 500, 504 timeout_error, 529 overloaded_error), SDK auto-retry defaults, request IDs, and the long-request guidance (stream or batch beyond ~10 minutes)."
category: source
lastmod: 2026-11-14
tags: ["platforms", "rate-limits", "reliability"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** living docs, read 2026-11-14
- **Original:** [platform.claude.com/docs/en/api/errors](https://platform.claude.com/docs/en/api/errors)

## Summary

The contract a client needs to classify Claude API failures as retryable or not, and the guidance for requests that run long enough to hit network idle timeouts.

## Key claims

- 429 `rate_limit_error` covers three different things: a rate limit, a usage tier's monthly spend cap (no `retry-after`; keeps failing until access resumes), and ramp limits on sharp traffic increases.
- A spend limit the organisation sets itself returns 400, not 429 (except limits on the Claude Code workspace, which can return 429).
- 402 `billing_error` signals a billing or payment problem; 409 `conflict_error` a conflict with a resource's current state (resolve, then retry).
- 500 `api_error`: retry with exponential backoff, contact support with the request ID if it persists.
- 504 `timeout_error`: request timed out while processing; `timeout_error` can also arrive with other codes (e.g. 500 when the server time limit is reached before the response starts). Use streaming for long requests.
- 529 `overloaded_error`: the API is temporarily overloaded across all users (distinct from your own rate limit).
- The official SDKs retry connection errors, 429s and 5xx automatically with exponential backoff, twice by default, honouring `retry-after`; `max_retries` configures it.
- With streaming, an error can arrive mid-stream after a 200 response, so normal status-code handling does not catch it.
- Every response carries a `request-id` header (also `request_id` in error bodies) for support tickets.
- Long requests: prefer streaming or the Message Batches API, especially beyond 10 minutes; idle connections may be dropped by networks. The SDK refuses non-streaming requests expected to exceed a 10-minute timeout and sets TCP keep-alive.
- Request size limits: Messages API 128 MB, Batch API 256 MB, Files API 500 MB (413 `request_too_large`).

## Feeds

[Rate limits and retries](../concepts/rate-limits-and-retries.md)
