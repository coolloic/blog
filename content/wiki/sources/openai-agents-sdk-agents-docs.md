---
title: "Source: Agents (OpenAI Agents SDK docs)"
summary: "Agent configuration in the OpenAI Agents SDK: instructions, tools, output types, context, tool-use behaviour, hooks and multi-agent patterns."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "openai"]
---

- **What:** official documentation page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/agents/](https://openai.github.io/openai-agents-python/agents/)

## Summary

Documents the `Agent` dataclass: name, instructions (static or dynamic), model and settings, tools, handoffs, `output_type`, hooks, and a local context object. Explains `tool_use_behavior`, `tool_choice` reset, `clone()`, and contrasts the manager (agents-as-tools) and handoff patterns.

## Key claims

- Context is a generic object passed to `Runner.run()` for dependency injection; it is not sent to the LLM.
- `output_type` (Pydantic, dataclass, TypedDict...) switches the agent to structured output.
- `tool_use_behavior`: `run_llm_again` (default), `stop_on_first_tool`, `StopAtTools`, or a custom function.
- `reset_tool_choice` (default true) resets tool choice to auto after a tool call to prevent loops.
- `clone()` is shallow: un-overridden lists stay shared.
- Two multi-agent patterns: a manager calling agents as tools (centralised) and handoffs between peers (decentralised).

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)
