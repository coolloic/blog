---
title: "Source: Workflow concepts and orchestrations (Microsoft Agent Framework docs)"
summary: "Agent Framework workflow APIs (graph WorkflowBuilder and functional), runtime primitives, and built-in multi-agent orchestrations."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft"]
---

- **What:** official documentation pages: Workflow concepts, Workflow orchestrations
- **Author:** Microsoft
- **Date:** ms.date 2026-10-22 / 2026-02-12 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/](https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/)

## Summary

Workflows define explicit execution paths over executors, edges, events and state. All SDKs support the graph `WorkflowBuilder`; Python also has an experimental functional `@workflow` API. Five built-in orchestrations cover common multi-agent shapes. Orchestrations page: [learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/](https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/).

## Key claims

- Graph workflows connect typed executors with edges and conditions, support fan-out/fan-in, emit events and checkpoint at superstep boundaries.
- Functional workflows use native Python control flow, per-step result caching and `ctx.request_info()` for human input.
- Workflows can be wrapped as agents (`.as_agent()` / `AsAIAgent()`).
- Built-in orchestrations: sequential, concurrent, handoff, group chat, Magentic (manager-led).
- Orchestrations support human-in-the-loop via approval-required tools and request info.

## Feeds

- [AutoGen / Microsoft Agent Framework](../concepts/autogen.md)
