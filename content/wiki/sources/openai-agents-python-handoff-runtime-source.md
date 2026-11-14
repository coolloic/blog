---
title: "Source: OpenAI Agents SDK handoff runtime (turn_resolution.py)"
summary: "openai-agents-python source showing how the Runner resolves handoff tool calls: first handoff wins, extras get an ignore message, server-managed conversations disable filters."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "openai"]
---

- **What:** open-source code, `src/agents/run_internal/turn_resolution.py` in openai-agents-python
- **Author:** OpenAI
- **Date:** `main` branch read 2026-11-14
- **Original:** [turn_resolution.py](https://github.com/openai/openai-agents-python/blob/main/src/agents/run_internal/turn_resolution.py)

## Summary

The module turns a model response into the next step of the run. Its `execute_handoffs` function handles handoff tool calls: it picks one, records a handoff span, applies history filters or nesting and makes the target agent current.

## Key claims

- If the model emits more than one handoff call in a turn, only the first is executed; each extra call receives the tool output "Multiple handoffs detected, ignoring this one."
- A tool call counts as a handoff only when its bare name matches a registered handoff tool name; namespaced calls never resolve to a handoff.
- Each handoff is wrapped in a `handoff_span` for tracing.
- With server-managed conversations, a handoff `input_filter` raises an error, and `nest_handoff_history` is disabled with a warning, continuing with delta-only input.

## Feeds

- [Agent handoffs](../concepts/agent-handoffs.md) · [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)
