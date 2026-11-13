---
title: "Source: Gemini API Grounding with Google Search docs"
summary: "Google's guide to the google_search tool in the Gemini API: model-driven queries, url_citation spans, search suggestions and per-query pricing."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "google"]
---

- **What:** official API documentation
- **Author / publisher:** Google
- **Date:** read 2026-11-14 (living page)
- **Original:** [aistudio.google.com/docs/google-search](https://aistudio.google.com/docs/google-search) (formerly ai.google.dev/gemini-api/docs/google-search)

## Summary

Enabling the `google_search` tool lets Gemini decide whether to search, generate its own queries, read results and return an answer with inline citations.

## Key claims

- The response contains a `google_search_call` step (queries run), a `google_search_result` step with `search_suggestions` (HTML to render in the UI, governed by the terms of service), and model text with `url_citation` annotations carrying `url`, `title`, `start_index`, `end_index`.
- Inline citations are built by slicing the text with each annotation's indices.
- Pricing (Gemini 3 and newer): billed per search query executed; 5,000 free per month, then $14 per 1,000 queries; empty queries not billed. Gemini 2.5 and older: billed per prompt. Default paid-tier limit 1,500 requests per day per project.
- Supported across Gemini 2.0 to Gemini 4 models; older models use `google_search_retrieval`.
- Combines with code execution, URL context and Google Maps grounding; Gemini 3+ can mix built-in tools with custom function calling.

## Feeds

[Web search APIs](../concepts/web-search-apis.md)
