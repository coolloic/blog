---
title: "Source: Idempotent requests (Stripe API reference)"
summary: "Stripe's reference design for idempotency keys: client-generated keys, saved first response, parameter-mismatch errors, 24-hour pruning, and which requests need keys."
category: source
lastmod: 2026-11-14
tags: ["agents", "idempotency", "apis"]
---

- **What:** API reference page
- **Publisher:** Stripe
- **Date:** accessed 2026-11-14
- **Original:** [Idempotent requests](https://docs.stripe.com/api/idempotent_requests)

## Summary

The canonical industry pattern for making a side-effecting API call safe to retry. The client attaches a unique key; the server stores the outcome of the first execution under that key and returns it for repeats, so a retried create or update does not happen twice.

## Key claims

- Keys are client-generated (V4 UUIDs suggested), up to 255 characters, and should not contain sensitive data.
- API v1 saves the status code and body of the first request once endpoint execution begins; retries return that saved response, including `500` errors. API v2 instead drives failed or partial work to completion on retry.
- Keys can be pruned after at least 24 hours; a reused key after pruning creates a new request.
- Reusing a key with different parameters is an error.
- Requests that fail validation or conflict with a concurrent request using the same key are not saved and can be retried.
- All v1 `POST` requests accept keys; `GET` and `DELETE` are idempotent by definition.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md)
