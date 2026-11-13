---
title: "Source: OpenAI Agents SDK documentation (overview)"
summary: "Overview of the OpenAI Agents SDK: a lightweight Python framework with agents, handoffs/agents-as-tools and guardrails as core primitives."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "openai"]
---

- **What:** official documentation site, landing page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/](https://openai.github.io/openai-agents-python/)

## Summary

Describes the Agents SDK as a small-abstraction Python package and the production successor to Swarm. Its core primitives are agents, delegation (handoffs or agents as tools) and guardrails, plus function tools, sessions, tracing, MCP, human-in-the-loop, sandbox, realtime and voice agents. It explains when to use the SDK rather than the Responses API directly.

## Key claims

- Design goals: few primitives that are quick to learn, good defaults, and customisable behaviour.
- Agents run a built-in loop that continues until the task is complete.
- For OpenAI models the SDK uses the Responses API by default.
- Use the Responses API directly to own the loop and state; use the SDK when the runtime should manage turns, tools, guardrails, handoffs or sessions.
- Function tools get automatic schemas and Pydantic validation.
- Session backends include SQLAlchemy, SQLite variants, encrypted, Redis, MongoDB and Dapr.
- Realtime agents use `gpt-realtime-2.1` (as of 2026-11); sandbox agents run in isolated workspaces (Docker, Unix local).

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)
