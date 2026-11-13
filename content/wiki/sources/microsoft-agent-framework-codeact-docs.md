---
title: "Source: CodeAct (Microsoft Agent Framework docs)"
summary: "Agent Framework's CodeAct capability: an execute_code tool backed by Hyperlight, Monty or local executors that collapses many tool calls into one sandboxed program."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft", "code-execution"]
---

- **What:** official documentation page, Microsoft Learn
- **Author:** Microsoft (eavanvalkenburg)
- **Date:** ms.date 2026-10-07 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/agents/code-act](https://learn.microsoft.com/en-us/agent-framework/agents/code-act)

## Summary

CodeAct gives the model one `execute_code` tool so it can express a multi-tool plan as a short program run in a sandbox, instead of one model turn per tool call. It ships as backend-specific connector packages (context providers) rather than a core type, and comes with explicit security and approval caveats.

## Key claims

- Motivation: orchestration overhead (one model turn per tool call) often dominates latency and token use; CodeAct runs the plan once in a sandbox.
- A connector adds `execute_code`, injects runtime guidance, optionally exposes host tools via `call_tool(...)`, and enforces capability limits (filesystem mounts, outbound-domain allow lists).
- Backends: Hyperlight (Python and .NET; `HyperlightCodeActProvider`), Monty (Python-only restricted interpreter), Local CodeAct (.NET-only subprocess needing external isolation). The .NET Hyperlight package is preview.
- Approval applies to the whole `execute_code` call, not to individual operations inside it.
- Tools reached through `call_tool(...)` run in the host process and bypass per-function middleware; FIDES information-flow controls are not supported with CodeAct.
- Stay with direct tool calling for one or two calls, or when each side effect must be individually visible and approved.

## Feeds

- [Microsoft Agent Framework](../concepts/microsoft-agent-framework.md)
- [smolagents](../concepts/smolagents.md)
