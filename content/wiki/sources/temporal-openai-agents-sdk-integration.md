---
title: "Source: Temporal OpenAI Agents SDK integration (Python docs)"
summary: "Temporal's plugin that runs OpenAI Agents SDK agents as Workflows with each model call as an Activity, plus activity-backed tools, MCP, HITL via signals, and its limitations."
category: source
lastmod: 2026-11-14
tags: ["agents", "durable-execution", "temporal", "openai"]
---

- **What:** official integration guide (Python)
- **Publisher:** Temporal Technologies
- **Date:** accessed 2026-11-14 (integration first announced with OpenAI in July 2025; the docs give version numbers, not dates)
- **Original:** [OpenAI Agents SDK integration](https://docs.temporal.io/develop/python/integrations/openai-agents)

## Summary

With `OpenAIAgentsPlugin` on both the Temporal client and worker, ordinary `Runner.run` code runs inside a Temporal Workflow: the agent loop, tool selection and handoffs execute as deterministic Workflow code and every model call becomes an Activity. A crashed worker therefore resumes the agent without repeating completed model calls. The page documents how tools, MCP servers, conversation history, approvals, streaming and tracing map onto Temporal primitives, and what is not supported.

## Key claims

- Package `temporalio-openai-agents` (Python 3.10+, Temporal Python SDK 1.33.0+). Version 1.0.0 moved it out of the core SDK (`temporalio.contrib.openai_agents` became `temporalio.openai_agents`); 1.1.0 is the minimum for OpenTelemetry.
- `ModelActivityParameters` configures the model Activity; `start_to_close_timeout` defaults to 60 s; retry policy, heartbeat and other timeouts are configurable.
- `activity_as_tool()` runs I/O tools as Activities (and they must also be registered on the Worker); plain `@function_tool` tools run inside the Workflow and must be deterministic with no I/O.
- Hosted tools run at the provider during the model Activity; each MCP operation is an Activity, but Temporal's durability does not extend to the MCP server itself.
- Keep conversation history in Workflow state; `SQLiteSession` is unsupported; use Continue-As-New for long chats.
- Approvals: a hosted MCP tool's `on_approval_request` callback runs in Workflow context, so it must be deterministic, and can wait on a Signal or Update carrying the human decision.
- Unsupported: `LocalShellTool`, `ComputerTool`; streaming is experimental and incompatible with local activities. Tool results are stored in Workflow history unless a payload codec is used.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md), [Human-in-the-loop](../concepts/human-in-the-loop.md)
