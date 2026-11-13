---
title: "Source: Perplexity API docs (Search API, Agent API models and effort levels)"
summary: "Perplexity's developer docs as of late 2026: the raw Search API priced per request, the Sonar grounded model, and Agent API effort presets that bundle a model, step budget and web tools."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "search"]
---

- **What:** official API documentation (three pages)
- **Author / publisher:** Perplexity
- **Date:** read 2026-11-14 (living pages)
- **Original:** [Pricing](https://docs.perplexity.ai/docs/getting-started/pricing.md), [Agent API models](https://docs.perplexity.ai/docs/agent-api/models.md), [Effort levels](https://docs.perplexity.ai/docs/agent-api/effort.md)

## Summary

Perplexity offers three layers: a Search API returning ranked results, a grounded answer model (`perplexity/sonar`), and an Agent API that runs third-party frontier models with Perplexity's web tools under named effort presets.

## Key claims

- Search API: `POST /search`, no model parameter, returns ranked results; $5 per 1,000 requests, or $1 per 1,000 with `search_type: "fast"`; up to five queries in one request bill as one unit.
- `perplexity/sonar` (grounded search model): $0.25 input / $2.50 output per million tokens (2026-11). The current model page lists no other Sonar variants (the older sonar-pro, sonar-reasoning-pro and sonar-deep-research names do not appear).
- Agent API effort presets: `fast` (1 step, `web_search`), `low` (5 steps, adds `fetch_url`), `medium` (15 steps), `high` (40 steps), `xhigh` (300 steps, adds sandbox and finance search, Claude Opus 5.5 by default), `ultra` (broad coverage). Presets can be pinned by version or frozen into a request.
- The `effort` preset is separate from the model's own `reasoning.effort`.

## Feeds

[Web search APIs](../concepts/web-search-apis.md), [Deep research agents](../concepts/deep-research-agents.md)
