---
title: "Source: Agent concepts and Agent Pipeline Architecture (Microsoft Agent Framework docs)"
summary: "How an Agent Framework agent run flows through agent middleware, context/history providers, the function-invocation loop, chat middleware and the raw chat client, in .NET, Python and Go."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft"]
---

- **What:** official documentation pages: "Agent concepts" and "Agent Pipeline Architecture", Microsoft Learn
- **Author:** Microsoft (eavanvalkenburg)
- **Date:** ms.date 2026-09-24 (concepts) and 2026-10-22 (pipeline), read 2026-11-14
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/concepts/agents/agent-pipeline](https://learn.microsoft.com/en-us/agent-framework/concepts/agents/agent-pipeline) and [https://learn.microsoft.com/en-us/agent-framework/concepts/agents/](https://learn.microsoft.com/en-us/agent-framework/concepts/agents/)

## Summary

An agent combines an abstraction, a model or remote-agent connection, instructions, tools, middleware, context providers and session state behind one run interface. Chat-client agents build a layered pipeline: agent middleware wraps everything, a context layer loads history and injects context, and a chat-client layer runs the tool loop and talks to the model. Remote agents (A2A, Copilot Studio, GitHub Copilot) skip the chat-client layer but still accept agent middleware.

## Key claims

- .NET: any `Microsoft.Extensions.AI.IChatClient` can back a `ChatClientAgent`; all agents share the `AIAgent` abstraction. Python: `Agent` accepts any client implementing `SupportsChatGetResponse`; direct types `FoundryAgent`, `A2AAgent`, `GitHubCopilotAgent`, `ClaudeAgent` connect to managed or remote runtimes.
- .NET pipeline: agent middleware via `.AsBuilder().Use(...)`; a single `ChatHistoryProvider` plus a list of `AIContextProviders`; `IChatClient` decorators. `ChatClientAgent` wraps the client with function calling by default (`UseProvidedChatClientAsIs = true` disables this).
- Python pipeline: `AgentMiddlewareLayer` + `AgentTelemetryLayer` -> `RawAgent` (runs `context_providers`, including `InMemoryHistoryProvider`) -> ChatClient: `FunctionInvocation` loop (function middleware per tool call) -> chat middleware per model call -> `RawChatClient`.
- Context providers can add chat or function middleware for one invocation via `SessionContext.extend_middleware()`; after the response, providers are notified to store new messages.
- Telemetry layers emit OpenTelemetry spans, events and metrics and do nothing when unconfigured.
- Optional Agent Hooks install one middleware bundle across agent, chat and function layers and gate streaming/persistence until a verdict permits it.
- Python agents should be used with `async with agent` (or `open()`/`close()`) when MCP tools or clients hold async resources.
- Go (preview) applies custom middleware, history provider, context providers, provider middleware (tool auto-call, structured output), then provider.

## Feeds

- [Microsoft Agent Framework](../concepts/microsoft-agent-framework.md)
