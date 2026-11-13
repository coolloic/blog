---
title: "Source: LiteLLM Router docs (routing, retries, fallbacks, cooldowns)"
summary: "LiteLLM's reference for load-balancing strategies, per-error retry policies, fallback chains and deployment cooldowns in its Router and proxy."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "routing"]
---

- **What:** official documentation pages ("Router - Load Balancing" and "Proxy - Fallbacks, Retries")
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living docs, read 2026-11-14 (mentions behaviour as of v1.85.0)
- **Original:** [docs.litellm.ai/docs/routing](https://docs.litellm.ai/docs/routing) and [docs.litellm.ai/docs/proxy/reliability](https://docs.litellm.ai/docs/proxy/reliability)

## Summary

The LiteLLM Router groups several "deployments" (the same model on different keys, regions or providers) under one model name, picks one per request with a configurable strategy, retries failures, puts failing deployments in cooldown, and falls back to other model groups. The same settings drive the LiteLLM proxy.

## Key claims

- Strategies (`routing_strategy`): `simple-shuffle` (default, recommended; weighted random by `weight` or by rpm/tpm), `usage-based-routing-v2` (lowest current-minute TPM among deployments under their limits; Redis-backed; the docs warn that usage-based routing "adds significant latency due to Redis operations" and do not recommend it for production; the legacy v1 `usage-based-routing` also exists), `latency-based-routing` (lowest recent latency, with `ttl` and `lowest_latency_buffer`), `least-busy` (fewest in-flight calls), `cost-based-routing` (cheapest per the model cost map), or a custom strategy. Routing groups can apply different strategies to different models; an `order` field sets tiers tried lowest-first.
- Retries: `num_retries` set by header, body, deployment or global settings. Rate-limit errors back off exponentially; other errors retry immediately. `retry_policy` sets counts per exception class (auth, timeout, rate limit, content policy, bad request, etc.). For calls through the router, LiteLLM pins the provider client's `max_retries` to 0 so there is one retry loop.
- Fallback types: `fallbacks` (generic errors such as rate limits), `context_window_fallbacks` (needs `enable_pre_call_checks` to filter by context size), `content_policy_fallbacks`, `default_fallbacks`; `disable_fallbacks` per request or key. `max_fallbacks` defaults to 5.
- Cooldowns: `cooldown_time` default 5 s. Without `allowed_fails`, a 429 cools a deployment down immediately, as does over 50% failures in the current minute; 401/404/408 also trigger cooldown. `allowed_fails_policy` sets per-error thresholds.
- Per-deployment `rpm`/`tpm` (and daily `rpd`/`tpd`) limits; requests over `max_parallel_requests` get an immediate 429, nothing is queued, and the cap is per process.
- Redis is recommended in production so cooldowns, usage counters and session-affinity pins are shared across proxy instances; otherwise each instance keeps its own state.
- `optional_pre_call_checks: session_affinity` pins a session to one deployment (`deployment_affinity_ttl_seconds` default 3600 s, an idle timeout refreshed by each request).
- Setting any `allowed_fails` value switches cooldown to failure counting, so a 429 then counts toward the limit instead of cooling down immediately. A `max_parallel_requests` 429 does not count toward cooldown.

## Feeds

[LLM gateways](../concepts/llm-gateways.md), [Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
