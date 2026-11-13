---
title: "Source: Running agents (OpenAI Agents SDK docs)"
summary: "The OpenAI Agents SDK Runner loop, max_turns, RunConfig, conversation-state options, error handlers, exceptions and resumable RunState."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "openai"]
---

- **What:** official documentation page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/running_agents/](https://openai.github.io/openai-agents-python/running_agents/)

## Summary

Describes `Runner.run`, `run_sync` and `run_streamed`, the loop (final output, handoff or tool calls), `max_turns`, the `RunConfig` overrides, four ways to carry conversation state, error handlers and the exception hierarchy, plus pausing for tool approval and resuming with `RunState`.

## Key claims

- Loop: call the current agent; final output ends the run, a handoff switches agent, tool calls are executed and the loop repeats.
- Exceeding `max_turns` raises `MaxTurnsExceeded`; an `error_handlers` entry can return a fallback instead.
- Conversation state options: `to_input_list()` (app-managed), sessions, `conversation_id` (Conversations API) or `previous_response_id` (Responses API).
- Sessions cannot be combined with server-managed conversation IDs in one run.
- `call_model_input_filter` can trim history or inject instructions right before each model call.
- Exceptions include `ModelBehaviorError`, `ToolTimeoutError`, `UserError` and guardrail tripwires, all under `AgentsException`.
- Runs can pause for tool approval and resume from a serialisable `RunState`.

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)
