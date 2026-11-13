---
title: "Source: Semantic Kernel to Microsoft Agent Framework Migration Guide (Microsoft Learn)"
summary: "Official mapping from Semantic Kernel agents (Kernel, plugins, threads, invoke) to Agent Framework (AIAgent/Agent, direct tools, sessions, run) in .NET and Python."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft"]
---

- **What:** official migration guide, Microsoft Learn
- **Author:** Microsoft (westey-m)
- **Date:** ms.date 2026-04-01, updated 2026-08-25 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/)

## Summary

Walks through each Semantic Kernel (SK) agent concept and its Agent Framework replacement, separately for C# and Python. The core simplification is removing the mandatory `Kernel` object: agents are created directly from a chat client, tools are passed as plain functions, and the agent (not the caller) creates the conversation session.

## Key claims

- .NET namespaces move to `Microsoft.Agents.AI`; message and content types come from `Microsoft.Extensions.AI`.
- SK agents always needed a `Kernel`; Agent Framework agents are built with `chatClient.AsAIAgent(...)` (.NET) or `Agent(client=...)` / `client.as_agent(...)` (Python).
- SK's per-service agent classes (`ChatCompletionAgent`, `OpenAIAssistantAgent`, `AzureAIAgent`) collapse into `ChatClientAgent` in .NET, which works over any `IChatClient`; Python has `Agent` plus `CopilotStudioAgent` and `A2AAgent`, all deriving from `BaseAgent` and the `SupportsAgentRun` protocol.
- Callers no longer construct provider-specific thread types; `agent.create_session()` / `CreateSessionAsync()` returns an `AgentSession`, and `get_session(service_session_id=...)` resumes a service-managed conversation.
- There is no session-deletion API because not every provider hosts history; callers track and delete hosted history through the provider SDK.
- Tools: no `[KernelFunction]` / `@kernel_function` plugin wrapper needed; plain functions (docstring becomes description, `Annotated` for parameter descriptions) or the `@tool` decorator; `AIFunctionFactory.Create` in .NET.
- `KernelFunction.as_agent_framework_tool()` (needs semantic-kernel 1.38+) lets SK functions and SK vector-store search functions be reused during gradual migration.
- `invoke` / `InvokeAsync` become `run` / `RunAsync`, returning a single `AgentResponse` (all messages incl. tool calls in `.messages`); streaming is `run(..., stream=True)` / `RunStreamingAsync` yielding `AgentResponseUpdate`.
- Python options are TypedDict-based (`default_options` at creation, `options` per call), with provider-specific typed dicts; `tools` and `instructions` stay as keyword arguments.
- Python packaging: `agent-framework-core` plus per-provider packages (`agent-framework-openai`, `-foundry`, `-mem0`, `-copilotstudio`); the `agent-framework` meta-package installs the common set.
- Go support for this guide is listed as coming soon.

## Feeds

- [Microsoft Agent Framework](../concepts/microsoft-agent-framework.md)
