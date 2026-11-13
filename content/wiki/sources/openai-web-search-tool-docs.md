---
title: "Source: Web search tool (OpenAI guide)"
summary: "OpenAI's hosted web search tool for the Responses API: tool variants, domain filters, location, context size, citations, sources and limits."
category: source
lastmod: 2026-11-14
tags: ["platforms", "openai", "tools"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Web search](https://developers.openai.com/api/docs/guides/tools-web-search)

## Summary

Covers how to let a model search the web from the Responses API, which parameters control it, and what the output and citations look like.

## Key claims

- Tool types: `web_search` (current), `web_search_preview` (legacy, lacks filters and live-access control), and the `gpt-5-search-api` model for Chat Completions, which always searches.
- `filters.allowed_domains` / `blocked_domains`: up to 100 each, no scheme, subdomains included; Responses `web_search` only.
- `user_location` (approximate country/city/region/timezone), `search_context_size` (`low`/`medium` default/`high`), `external_web_access` (default true; false = cache-only), `return_token_budget` (`default`/`unlimited`, GPT-5+ reasoning models).
- Output: a `web_search_call` item (actions `search`, `open_page`, `find_in_page`) plus a `message` whose annotations hold `url_citation` (url, title, start/end index). UIs must show inline citations as clickable links.
- `include: ["web_search_call.action.sources"]` returns every consulted URL, which is usually more than the cited ones.
- The search context window is capped at 128K tokens regardless of the model's window.
- With `tool_choice: "auto"` search is optional; force it with `required` or a named tool.
- Rate limits follow the underlying model's tier; each search action carries a tool-call cost.

## Feeds

[OpenAI Responses API](../concepts/openai-responses-api.md)
