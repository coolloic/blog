---
title: "Source: Firecrawl docs (introduction and scrape)"
summary: "Firecrawl's docs for turning websites into LLM-ready markdown or JSON: scrape, crawl, map, search, interact and agent endpoints, caching via maxAge and credit costs."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "search"]
---

- **What:** official documentation (two pages)
- **Author / publisher:** Firecrawl
- **Date:** read 2026-11-14 (living pages)
- **Original:** [Introduction](https://docs.firecrawl.dev/introduction), [Scrape](https://docs.firecrawl.dev/features/scrape)

## Summary

Firecrawl is a hosted (and self-hostable open-source) scraping service aimed at LLM apps. It handles JavaScript rendering, proxies and anti-bot measures and returns clean markdown, HTML, screenshots or schema-shaped JSON.

## Key claims

- Endpoints: Scrape (one URL), Crawl (recursive site), Map (discover URLs), Search (web search returning full page content), Interact (click, type, fill forms on a scraped page), Agent (autonomous data gathering), Parse (local PDF/DOCX/XLSX to markdown).
- Formats: markdown, summary, HTML, raw HTML, links, images, screenshot (URLs expire after 24 h), JSON from a schema or prompt, and others.
- Actions (click, type, wait, screenshot) can run before scraping; Interact is recommended for richer control.
- Caching: `maxAge` defaults to 2 days and can make scrapes up to 5x faster; `maxAge: 0` forces fresh fetches (slower, more failures); `minAge` gives cache-only lookups; change tracking bypasses the cache.
- PDFs and DOCX at URLs are auto-detected and converted to markdown.
- Costs: 1 credit per scrape (cached or not); JSON extraction +4; PDF 1 credit per page; zero data retention +1 per page.

## Feeds

[Web search APIs](../concepts/web-search-apis.md)
