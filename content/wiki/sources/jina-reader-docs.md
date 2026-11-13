---
title: "Source: Jina Reader (r.jina.ai / s.jina.ai)"
summary: "Jina AI's Reader API that converts any URL into LLM-friendly markdown by URL prefix, plus a search endpoint, control headers, ReaderLM-v2 and token-based pricing."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "search"]
---

- **What:** product and API documentation page
- **Author / publisher:** Jina AI
- **Date:** read 2026-11-14 (living page)
- **Original:** [jina.ai/reader](https://jina.ai/reader/)

## Summary

Prefixing a URL with `r.jina.ai/` returns the page's main content as markdown with navigation, ads and footers stripped; `s.jina.ai` runs a search and returns the top five results with cleaned content.

## Key claims

- Headers control behaviour: `X-Engine` (`direct` plain fetch fastest; default renders JavaScript in a headless browser), `X-Target-Selector` (CSS selectors), `X-With-Generated-Alt` (captions images), `X-No-Cache` or `X-Cache-Tolerance`, `X-Timeout`, `X-Respond-With` for output shape.
- ReaderLM-v2: a 1.54B-parameter model converting HTML to markdown or JSON, selectable per request, with schema or instruction headers for structured extraction.
- PDFs are handled natively, with page targeting.
- Rate limits: no key 20 RPM for Reader and search blocked; free/paid key 500 RPM Reader, 100 RPM search; premium 5,000 / 1,000 RPM.
- Billing is by output tokens; each search request costs a fixed amount starting at 10,000 tokens; failed requests are free; new keys get 10M free tokens.

## Feeds

[Web search APIs](../concepts/web-search-apis.md)
