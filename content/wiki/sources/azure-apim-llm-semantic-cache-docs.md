---
title: "Source: Azure API Management llm-semantic-cache-lookup policy reference"
summary: "Microsoft's gateway policy for semantic response caching: a distance-style score threshold (start near 0.05), vary-by partitioning, system-message stripping, max-message-count, and an explicit warning about wrong or unsafe hits."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "gateways"]
---

- **What:** official policy reference
- **Publisher:** Microsoft Learn (Azure API Management)
- **Date:** page updated 2026-08-18
- **Original:** [llm-semantic-cache-lookup policy](https://learn.microsoft.com/en-us/azure/api-management/llm-semantic-cache-lookup-policy)

## Summary

API Management (APIM) can cache LLM responses at the gateway. An inbound `llm-semantic-cache-lookup` policy embeds the prompt through a configured embeddings backend and searches an external Redis-compatible cache; an outbound `llm-semantic-cache-store` policy writes the response with a `duration` in seconds.

## Key claims

- Works with OpenAI Chat Completions/Responses, Anthropic Messages (v2 tiers) and Vertex AI shaped APIs; all APIM tiers.
- `score-threshold` runs 0.0-1.0 and **lower means stricter** (it behaves like a distance). Guidance: start low, around 0.05; values above 0.2 may produce mismatches; use lower values for sensitive cases.
- `ignore-system-messages` (default `false`, recommended `true`) drops system messages before similarity is computed. `max-message-count` skips caching once a conversation exceeds a given number of messages.
- `vary-by` expressions partition the cache, e.g. by subscription ID; Microsoft recommends partitioning by user or group to control cross-user access.
- The docs warn that similarity-based hits can be incorrect, outdated or unsafe, and advise safeguards; they also recommend a rate-limit policy right after lookup so the backend survives a cache outage.
- Security note: a policy author can point `embeddings-backend-id` at any backend, without a linked-access check.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
