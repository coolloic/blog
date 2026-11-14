---
title: "Source: Lifecycle hooks reference (OpenAI Agents SDK, Python)"
summary: "API reference for RunHooks and AgentHooks in the OpenAI Agents SDK: observational callbacks for agent, LLM, tool and handoff events that return None."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "observability"]
---

- **What:** official API reference page (Python SDK)
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/ref/lifecycle/](https://openai.github.io/openai-agents-python/ref/lifecycle/)

## Summary

The SDK has two lifecycle hook classes. `RunHooks` receives callbacks for every agent in a run; `AgentHooks` is attached to one agent. Every method is async and returns `None`, and the reference documents no mechanism for a hook to change or cancel what happens. Control in this SDK lives in guardrails instead.

## Key claims

- `RunHooks` methods: `on_agent_start`, `on_agent_end`, `on_llm_start`, `on_llm_end`, `on_tool_start`, `on_tool_end`, `on_handoff(from_agent, to_agent)`.
- `AgentHooks` methods: `on_start`, `on_end`, `on_llm_start`, `on_llm_end`, `on_tool_start`, `on_tool_end`, `on_handoff(agent, source)`.
- `on_llm_start` receives the system prompt and input items; `on_tool_end` receives the tool result; `on_agent_end` receives the output.
- All methods return `None`; descriptions are observational ("called before/after"), with no documented return value for blocking or rewriting.

## Feeds

- [Agent hooks and middleware](../concepts/agent-hooks-and-middleware.md)
