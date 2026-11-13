---
title: "Source: Why we built ADK 2.0 (Google Developers Blog)"
summary: "Google's rationale for ADK 2.0: move orchestration out of the LLM into deterministic graph and dynamic workflows."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "google"]
---

- **What:** vendor engineering blog post
- **Author:** Swapnil Agarwal, Alan Blount, Frank Guan (Google)
- **Date:** 2026-07-01
- **Original:** [https://developers.googleblog.com/en/why-we-built-adk-20/](https://developers.googleblog.com/en/why-we-built-adk-20/)

## Summary

Argues that production agents loop, skip business logic or fail opaquely when the model handles routing, scheduling and error handling. ADK 2.0 adds a workflow runtime: deterministic graphs, code-driven dynamic workflows, and collaborative agents that each see only the context they need. An illustrative refund example compares a vanilla agent with a workflow.

## Key claims

- Model-focused fixes (guardrails, skills, prompting) only go so far for orchestration reliability.
- Graph workflows route with code, not the LLM, which limits context bloat and narrows prompt-injection impact (no edge exists for unauthorised actions).
- Dynamic workflows use native Python control flow and asyncio for retries and branching.
- In the post's illustrative benchmark (gemini-3.5-flash, mock APIs): 5,152 vs 2,265 tokens and 7.2 s vs 5.7 s for agent vs workflow.

## Feeds

- [Google ADK](../concepts/google-adk.md)
