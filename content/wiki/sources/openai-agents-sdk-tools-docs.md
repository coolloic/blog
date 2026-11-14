---
title: "Source: Tools, agents as tools (OpenAI Agents SDK docs)"
summary: "The OpenAI Agents SDK tools page, read for its agents-as-tools section: Agent.as_tool() options, nested input, state isolation and output extraction."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent"]
---

- **What:** official documentation page (section "Agents as tools")
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/tools/](https://openai.github.io/openai-agents-python/tools/)

## Summary

The tools page describes function, hosted and MCP tools, and how to expose a whole agent as a tool so a central agent can orchestrate specialists without handing off the conversation. The orchestrator calls the agent-tool, gets its output back and stays in control.

## Key claims

- `Agent.as_tool()` takes `tool_name` and `tool_description`, plus run options (`max_turns`, `run_config`, `hooks`, `session`, `previous_response_id`, `conversation_id`, `needs_approval`) and `is_enabled`.
- By default the nested agent receives one string field, `input`. With `parameters` (a Pydantic model or dataclass), the structured payload becomes the nested input; `include_input_schema=True` adds the JSON Schema and `input_builder` customises the conversion.
- The nested run does not inherit the parent run's conversation state; sharing history requires passing the same `session` explicitly.
- `custom_output_extractor` receives the nested `RunResult` and decides what goes back to the orchestrator.
- `needs_approval` follows the same pause/resume flow as function tools; `on_stream` streams the nested agent's events.

## Feeds

- [Agent handoffs](../concepts/agent-handoffs.md) · [OpenAI Agents SDK](../concepts/openai-agents-sdk.md) · [Subagents](../concepts/subagents.md)
