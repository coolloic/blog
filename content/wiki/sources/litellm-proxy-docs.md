---
title: "Source: LiteLLM proxy (AI Gateway) docs: overview, virtual keys, caching"
summary: "LiteLLM's self-hosted OpenAI-compatible gateway: virtual keys with budgets and rate limits backed by Postgres, spend tracking, and exact or semantic response caches."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "cost"]
---

- **What:** official documentation pages (proxy overview, "Virtual Keys", "Caching")
- **Publisher:** BerriAI (LiteLLM)
- **Date:** living docs, read 2026-11-14
- **Original:** [Proxy overview](https://docs.litellm.ai/docs/simple_proxy), [Virtual keys](https://docs.litellm.ai/docs/proxy/virtual_keys), [Caching](https://docs.litellm.ai/docs/proxy/caching)

## Summary

The LiteLLM proxy is a self-hosted server that exposes one OpenAI-compatible endpoint in front of 100+ providers, adding virtual keys, spend tracking, load balancing, fallbacks, guardrails, logging integrations and an admin UI. Production deployments use Postgres (keys, spend) and Redis (shared state).

## Key claims

- Any OpenAI client works by pointing `base_url` at the proxy; it also fronts MCP tools and A2A agents.
- Virtual keys need Postgres (`DATABASE_URL`) and a master key starting with `sk-`. Keys are minted with `POST /key/generate` and can restrict `models`, set `max_budget` (USD), `budget_duration` (reset period), `rpm_limit`/`tpm_limit`, and belong to a user or team; keys can be rotated with a grace period.
- Spend is computed per request in USD from a model cost map and queried per key, user, team or end user.
- Exact-match caches (`redis`, `s3`, `gcs`, `local`, `disk`) hash the whole request, so any change to the conversation misses. Semantic caches (`redis-semantic`, `valkey-semantic`, `qdrant-semantic`) return the closest match above a similarity threshold.
- The docs warn that semantic caching goes badly wrong on agentic traffic, and that in-memory/disk caches are not shared across workers, so Redis is recommended beyond one worker.
- Cacheable call types include chat completions, embeddings, rerank, Responses and Anthropic-style `/v1/messages`.

## Feeds

[LLM gateways](../concepts/llm-gateways.md)
