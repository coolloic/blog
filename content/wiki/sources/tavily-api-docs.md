---
title: "Source: Tavily API docs (Search endpoint and credits)"
summary: "Tavily's reference for its LLM-oriented search API: search depths, chunked results, raw content, domain/time filters and credit pricing for search, extract, map, crawl and research."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "search"]
---

- **What:** official API documentation (two pages)
- **Author / publisher:** Tavily
- **Date:** read 2026-11-14 (living pages)
- **Original:** [Search endpoint](https://docs.tavily.com/documentation/api-reference/endpoint/search), [API credits](https://docs.tavily.com/documentation/api-credits)

## Summary

Tavily is a search API designed to feed LLMs: one call returns ranked results with pre-extracted, query-relevant content chunks, optionally full page text and an LLM-written answer.

## Key claims

- `POST https://api.tavily.com/search` with a bearer key.
- `search_depth`: `ultra-fast`, `fast`, `basic` (default), `advanced`; `advanced` costs 2 credits, the rest 1.
- `chunks_per_source` 1-3 (default 3); `max_results` 0-20 (default 10); `topic` general/news/finance; `time_range` day/week/month/year; `include_domains` up to 300; `include_answer` (basic/advanced); `include_raw_content` (markdown/text).
- `auto_parameters` lets Tavily choose settings from query intent and may upgrade to `advanced` (2 credits).
- Each result has a relevance `score`, a `content` snippet built from chunks, plus optional `raw_content`, `published_date`, images.
- Other endpoints: Extract (1 credit per 5 URLs basic, 2 advanced), Map (1 credit per 10 pages), Crawl (map + extract), Research (`mini` 4-110 credits, `pro` 15-250 credits per request).
- Pricing: 1,000 free credits per month; pay-as-you-go $0.008 per credit; plans $0.0075-$0.005 per credit. Failed extractions are not charged.

## Feeds

[Web search APIs](../concepts/web-search-apis.md)
