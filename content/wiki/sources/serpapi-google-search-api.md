---
title: "Source: SerpApi Google Search API docs"
summary: "SerpApi's reference for scraping Google results pages into structured JSON: parameters, localisation, one-hour cache and result blocks."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "search"]
---

- **What:** official API documentation
- **Author / publisher:** SerpApi
- **Date:** read 2026-11-14 (living page)
- **Original:** [serpapi.com/search-api](https://serpapi.com/search-api)

## Summary

SerpApi fetches a real Google results page for a query and location and returns it parsed into JSON blocks, so an agent sees what a Google user would see rather than page content.

## Key claims

- Required: `q` (supports operators like `site:`) and `api_key`; `engine` defaults to `google`, with other Google verticals (news, shopping, local, AI Mode and more) as separate APIs.
- Localisation: `location` (city-level recommended), `gl` country, `hl` language; also `device`, `start` pagination, `async`, `zero_trace`.
- Results are cached for 1 hour when the query and all parameters match; cached searches are free and do not count against quota; `no_cache: true` forces a fresh scrape.
- Output blocks include `organic_results` (position, title, link, snippet), `knowledge_graph`, `local_results`, `related_questions`, `related_searches`; JSON, raw HTML or Markdown output.
- Returns snippets, not full page text; a separate fetch step is needed to read pages.

## Feeds

[Web search APIs](../concepts/web-search-apis.md)
