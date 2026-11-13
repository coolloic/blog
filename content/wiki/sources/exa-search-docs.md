---
title: "Source: Exa search API docs"
summary: "Exa's reference for its own-index, embeddings-based web search API: search types and latency, content options (highlights, text, summary), filters and freshness control."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "search"]
---

- **What:** official API documentation (two pages)
- **Author / publisher:** Exa
- **Date:** read 2026-11-14 (living pages)
- **Original:** [Search reference](https://docs.exa.ai/reference/search), [How Exa search works](https://docs.exa.ai/reference/how-exa-search-works), [Pricing](https://exa.ai/pricing)

## Summary

Exa runs its own web index and returns ranked results plus page content in one request, with modes from a ~300 ms cached lookup to multi-step "deep" research.

## Key claims

- `type`: `auto` (default, ~1 s), `lite` (~300 ms, $4 per 1,000 requests, cached content only, never fetches live), `deep-lite` (~4 s, light synthesis), `deep` (4-15 s, multi-step search with synthesis). Legacy `fast`, `instant`, `deep-reasoning` are superseded.
- The query is natural language; docs advise describing subject, source type and period.
- `numResults` 1-100 (default 10), no pagination; `category` (company, news, publication, financial report, people, personal site); `includeDomains` / `excludeDomains` up to 1,200 with path prefixes and wildcards; published-date bounds.
- Content: `highlights` (query-relevant excerpts, the recommended default), `text` (full clean body, cap with `maxCharacters`), `summary` (LLM per result, extra cost), `outputSchema` for a synthesized answer with grounding and confidence.
- Freshness: `maxAgeHours` (replaces deprecated `livecrawl`): positive N uses cache younger than N hours, `0` forces content fetched within 60 seconds, `-1` cache only. It controls content age, not publication date.
- Pricing (exa.ai/pricing, 2026-11), per 1,000 requests with up to 10 results: `lite` $4, `auto` $7, `deep-lite` $12, `deep` $12; each extra result $1 per 1,000; `/contents` $1 per 1,000 pages per content type; AI page summaries $1 per 1,000 pages.
- Responses include an estimated `costDollars` breakdown; a `neural` cost line suggests embedding-based retrieval (the docs do not detail the index).

## Feeds

[Web search APIs](../concepts/web-search-apis.md)
