---
title: "Source: OpenRouter Auto Router docs"
summary: "Describes openrouter/auto, a hosted per-request model router that rates the request with a fast decision model and picks a model and reasoning effort within a cost tier."
category: source
lastmod: 2026-11-14
tags: ["platforms", "routing"]
---

- **What:** official documentation ("Model Routing" / Auto Router)
- **Publisher:** OpenRouter
- **Date:** living docs, read 2026-11-14
- **Original:** [openrouter.ai/docs/features/model-routing](https://openrouter.ai/docs/features/model-routing)

## Summary

`openrouter/auto` is a general-purpose router exposed as a model slug. It filters the candidate pool by policy, rates the request with a fast decision model, and chooses a model and reasoning effort using live prices, cache status and benchmark data.

## Key claims

- Pool narrowing first: guardrails, zero data retention, capabilities, provider restrictions, BYOK keys, allow/deny lists.
- A fast decision model rates eleven aspects of the request (task type, difficulty, need for vision, etc.) in one call.
- The policy weighs that rating against live prices, prompt-cache status and benchmark performance within the caller's cost tier; then normal provider routing applies.
- Within a session it switches models only when the gain beats the cost of rebuilding the prompt cache, and may change reasoning effort instead.
- No extra fee: the caller pays the selected model's rate; `provider.max_price` still applies. Variants: `openrouter/auto-code` (coding agents) and `openrouter/auto-beta`.

## Feeds

[Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
