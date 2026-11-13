---
title: "Source: Claude web fetch tool docs"
summary: "Anthropic's reference for the server-side web_fetch tool: URL validation against exfiltration, content limits, caching, citations and dynamic filtering."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "anthropic"]
---

- **What:** official API documentation
- **Author / publisher:** Anthropic
- **Date:** read 2026-11-14 (living page)
- **Original:** [platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool)

## Summary

A server tool that retrieves the full text of a web page or PDF so Claude can read it. It pairs with web search: search finds candidate URLs, fetch reads the chosen ones.

## Key claims

- Versions (as of 2026-11): `web_fetch_20250910` (basic), `20260209` (dynamic filtering), `20260309` (adds `use_cache` cache bypass), `20260318` (adds `response_inclusion`).
- Exfiltration guard: Claude may only fetch URLs that already appeared in user messages, client tool results or earlier search/fetch results, never URLs it invents; URLs that look like they contain credentials are refused. `url_sources` narrows the allowed sources further. The docs still warn of residual risk when untrusted input meets sensitive data.
- Does not render JavaScript; for such pages the docs point to a browser-use tool.
- `max_content_tokens` truncates long content; PDFs come back as base64 documents. Rough sizes: average page ~2.5k tokens, large doc page ~25k, research PDF ~125k.
- Results are cached by default and may be stale; `use_cache: false` forces a fresh fetch at the cost of latency.
- Citations are optional (off by default) and use character locations in the fetched document.
- No per-fetch fee; only tokens are billed.
- Error codes include `url_not_in_prior_context`, `url_not_allowed` (including robots.txt and private addresses), `url_not_accessible`, `unsupported_content_type`, `content_too_large`.

## Feeds

[Web search APIs](../concepts/web-search-apis.md), [Deep research agents](../concepts/deep-research-agents.md)
