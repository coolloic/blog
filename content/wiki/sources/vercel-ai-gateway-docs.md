---
title: "Source: Vercel AI Gateway docs (overview, model fallbacks, budgets)"
summary: "Vercel's hosted multi-provider gateway: OpenAI- and Anthropic-compatible endpoints, zero token markup, provider order plus model fallbacks with per-attempt metadata, and stacked soft-cap budgets."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gateways", "cost"]
---

- **What:** official documentation (overview updated 2026-09-14; model fallbacks 2026-10-02; budgets 2026-09-10)
- **Publisher:** Vercel
- **Date:** read 2026-11-14
- **Original:** [Overview](https://vercel.com/docs/ai-gateway), [Model fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks), [Budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets)

## Summary

A hosted gateway at `ai-gateway.vercel.sh`, callable from any cloud via the AI SDK or the OpenAI Chat Completions, OpenAI Responses or Anthropic Messages formats. It centralises credentials, logs, cost tracking, budgets, prompt caching and failover.

## Key claims

- Adds zero markup to provider token prices, including with BYOK. Auth by API key, or OIDC from Vercel deployments.
- `providerOptions.gateway.models` lists fallback models; `order`/`only` set provider preference per model. Each model is tried across its providers before the next model.
- Response metadata `modelAttempts` lists every model and provider attempt with status code, timing and error, so the serving model is auditable.
- `caching: 'auto'` applies provider prompt caching; full-response caching is left to the application.
- Budgets at team, project, API key and user scope stack; any exceeded scope rejects with HTTP 402 `quota_for_entity_exceeded`. Budgets are soft caps checked at request start, so the crossing request completes. BYOK spend is not counted but is still blocked by an exceeded budget. Refresh periods: daily, weekly, monthly, none.

## Feeds

[LLM gateways](../concepts/llm-gateways.md), [Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
