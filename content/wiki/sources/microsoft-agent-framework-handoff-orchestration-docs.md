---
title: "Source: Handoff orchestration (Microsoft Agent Framework docs)"
summary: "Agent Framework's mesh-topology handoff orchestration: handoff rules, context broadcast, interactive vs autonomous mode, and a stated handoff vs agent-as-tools contrast."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent", "microsoft"]
---

- **What:** official documentation page (C# and Python)
- **Author:** Microsoft
- **Date:** ms.date 2026-10-15 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff](https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff)

## Summary

Handoff orchestration connects agents in a mesh with no central orchestrator; each agent decides, by calling an injected handoff tool, whether to pass the conversation on. The page contrasts this with agent-as-tools on control flow, task ownership and context, and explains how agents with separate sessions are kept in sync.

## Key claims

- Contrast: in a handoff the receiver takes full ownership and has the conversation so far; with agent-as-tools the primary agent keeps responsibility, gets control back and passes tool agents only what they need.
- `HandoffBuilder` (Python) / `AgentWorkflowBuilder.CreateHandoffBuilderWith` (C#) register handoff tools automatically; `add_handoff` / `WithHandoffs` restrict who may hand off to whom. By default all agents can hand off to each other.
- Agents do not share one session. Each broadcasts user and agent messages to all participants; tool content, including handoff calls and results, is filtered out before forwarding. Python keeps text only for non-user messages.
- Handoff is interactive by default: an agent that answers without handing off triggers a request for user input. Experimental autonomous mode replies with a continuation prompt instead, up to 50 turns per agent by default.
- Python handoff tool names derive from the target agent ID, sanitised and capped at 64 characters. When checkpointing, agent IDs and names must stay stable across rebuilds.
- Approval-required tools pause the workflow; checkpoint storage lets approvals arrive much later.

## Feeds

- [Agent handoffs](../concepts/agent-handoffs.md) · [Microsoft Agent Framework](../concepts/microsoft-agent-framework.md)
