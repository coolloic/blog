---
title: "Source: Claude web search tool docs"
summary: "Anthropic's reference for the server-side web_search tool: versions, dynamic filtering, domain and location controls, citations, errors and pricing."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools", "anthropic"]
---

- **What:** official API documentation
- **Author / publisher:** Anthropic
- **Date:** read 2026-11-14 (living page)
- **Original:** [platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool)

## Summary

Web search is a server tool: Claude decides when to search, the API runs the queries and inserts results, possibly several times in one request, and the final answer carries citations. Newer versions let Claude filter results with code before they enter its context.

## Key claims

- Versions (as of 2026-11): `web_search_20250305` (basic), `web_search_20260209` (adds dynamic filtering), `web_search_20260318` (adds `response_inclusion`).
- Dynamic filtering: Claude writes and runs code (via code execution, provisioned automatically) that filters results so only relevant content reaches the context window; `allowed_callers` defaults to code execution on 20260209+; set `["direct"]` to call search directly. Requires Claude 4.6+ models. Not ZDR/HIPAA eligible. Google-managed Vertex and Azure-hosted Foundry deployments offer only `web_search_20250305`.
- Parameters: `max_uses` (cap per turn; failed searches count; single facts typically 1-3 searches, multi-entity research 10+), `allowed_domains` or `blocked_domains` (not both), `user_location` (approximate city/region/country/timezone).
- Results carry `url`, `title`, `page_age` and `encrypted_content`, which must be passed back unchanged in multi-turn conversations.
- Citations are always on: each `web_search_result_location` has `url`, `title`, `encrypted_index` and up to 150 characters of `cited_text`; those citation fields do not count as tokens.
- Errors return HTTP 200 with a `web_search_tool_result_error` (`too_many_requests`, `invalid_tool_input`, `max_uses_exceeded`, `query_too_long`, `request_too_large`, `unavailable`). Long turns may stop with `pause_turn` and must be resumed by sending the message back.
- Pricing: $10 per 1,000 searches plus tokens; results count as input tokens in the turn and in later turns. Failed searches are not billed.
- When displaying outputs to end users, citations to the original source must be shown.
- Platforms (re-checked 2026-11-14): all versions on the Claude API, Claude Platform on AWS, Anthropic-managed Google Cloud and Anthropic-hosted Microsoft Foundry; Google-managed Vertex and Azure-hosted Foundry get only the basic `web_search_20250305`. Amazon Bedrock is not listed.

## Feeds

[Web search APIs](../concepts/web-search-apis.md), [Deep research agents](../concepts/deep-research-agents.md)
