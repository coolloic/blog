---
title: "Source: Introduction to the Deep Research API (OpenAI Cookbook)"
summary: "OpenAI cookbook recipe for the o3/o4-mini deep research models: background mode, tools, output items and the clarify-then-rewrite prompt pattern."
category: source
lastmod: 2026-11-14
tags: ["agents", "research", "openai"]
---

- **What:** cookbook notebook (now marked archived)
- **Author / publisher:** OpenAI
- **Date:** published mid-2025 (models dated 2025-06-26); read 2026-11-14
- **Original:** [developers.openai.com/cookbook/examples/deep_research_api/introduction_to_deep_research_api](https://developers.openai.com/cookbook/examples/deep_research_api/introduction_to_deep_research_api)

## Summary

Shows how to call OpenAI's deep research models through the Responses API and how to structure the surrounding pipeline.

## Key claims

- Models: `o3-deep-research-2025-06-26` for depth and quality, `o4-mini-deep-research-2025-06-26` for lower latency.
- Requires `web_search_preview` as a data source; `code_interpreter` is optional for analysis and charts; an MCP tool can expose private documents.
- Run with `background: true` because research takes minutes.
- Output items: `reasoning` summaries, `web_search_call`, `code_interpreter_call`, `mcp_call`, and a final message whose annotations give title, URL and character span.
- The API does not ask clarifying questions, so the recipe puts a light model first: one step asks the user a few scoping questions, another rewrites the answers into detailed research instructions.
- The MCP example sets approvals to never and tells the model not to re-fetch documents it already has.

## Feeds

[Deep research agents](../concepts/deep-research-agents.md)
