---
title: "Source: Kong AI Gateway docs and AI Proxy Advanced plugin"
summary: "Kong's AI gateway (2.x entity model, formerly AI Proxy plugins): load-balancing algorithms incl. semantic and lowest-latency, failover criteria, circuit breaking, semantic cache, prompt guards and PII sanitising."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "routing"]
---

- **What:** official documentation (AI Gateway overview; AI Proxy Advanced plugin reference)
- **Publisher:** Kong Inc.
- **Date:** living docs, read 2026-11-14
- **Original:** [AI Gateway](https://developer.konghq.com/ai-gateway/), [AI Proxy Advanced](https://developer.konghq.com/plugins/ai-proxy-advanced/)

## Summary

Kong AI Gateway extends the Kong API gateway to LLM, MCP and A2A traffic. Version 2.x replaces the plugin-centric AI Proxy / AI Proxy Advanced with entities (AI Model Provider, AI Model). Policies include semantic caching, token- and cost-aware rate limiting, prompt guards and PII redaction.

## Key claims

- Balancer algorithms: round-robin (weighted), consistent-hashing (sticky by header), least-connections, lowest-latency (EWMA; fastest target gets roughly 90-99% of traffic, others a small probe share), lowest-usage (tokens or cost), semantic (prompt-to-model similarity using a Redis or pgvector vector store), priority (tiered failover).
- Client errors never trigger failover; others must be opted in via `config.balancer.failover_criteria` (e.g. `http_429`, `http_502`), plus `non_idempotent` to fail over POSTs.
- Cross-format fallback between providers since v3.10; circuit breaker via `max_fails`/`fail_timeout` since v3.13.
- Other plugins: AI Semantic Cache, AI Rate Limiting Advanced (spend limits and tier quotas), AI Prompt Guard (keyword/topic), AI Semantic Prompt Guard (natural-language jailbreak detection), AI Sanitizer (PII redaction).

## Feeds

[LLM gateways](../concepts/llm-gateways.md), [Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
