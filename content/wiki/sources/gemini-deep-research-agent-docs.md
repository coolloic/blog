---
title: "Source: Gemini Deep Research agent docs"
summary: "Google's guide to the Deep Research agent in the Interactions API: agent IDs, background execution, streaming, collaborative planning and tools."
category: source
lastmod: 2026-11-14
tags: ["agents", "research", "google"]
---

- **What:** official API documentation
- **Author / publisher:** Google
- **Date:** read 2026-11-14 (living page)
- **Original:** [aistudio.google.com/docs/deep-research](https://aistudio.google.com/docs/deep-research) (formerly ai.google.dev/gemini-api/docs/deep-research)

## Summary

Gemini Deep Research is exposed as a managed agent, not a model: you create an interaction, it plans, searches, reads and iterates for minutes, and returns a cited report.

## Key claims

- Agent IDs (as of 2026-11): `deep-research-preview-04-2026` (tuned for speed and streaming to a UI) and `deep-research-max-preview-04-2026` (tuned for maximum comprehensiveness). Preview status.
- Only available through the Interactions API (`client.interactions.create(agent=..., input=...)`), not `generate_content`; follow-ups use `previous_interaction_id`.
- `background=True` is required; poll `interactions.get(id)` until `completed` or `failed`.
- Streaming: `stream=True` plus `thinking_summaries: "auto"` yields `thought`, `text` and `image` deltas; streams can drop (600-second timeout) and resume with `last_event_id`.
- Default tools: `google_search`, `url_context`, `code_execution`; optional `file_search` over your document stores and `mcp_server` (with headers and `allowed_tools`).
- `collaborative_planning: true` returns a proposed plan for the user to refine before research starts.
- Optional charts (`visualization: "auto"`), image and PDF inputs, and report structure steered by the prompt.

## Feeds

[Deep research agents](../concepts/deep-research-agents.md)
