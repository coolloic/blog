---
title: "Source: AutoGen to Microsoft Agent Framework Migration Guide (Microsoft Learn)"
summary: "Side-by-side mapping of AutoGen AgentChat/Core concepts to Microsoft Agent Framework agents and typed data-flow workflows."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft"]
---

- **What:** official migration guide, Microsoft Learn
- **Author:** Microsoft
- **Date:** ms.date 2026-10-23 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)

## Summary

Maps model clients, agents, tools, MCP, agent-as-tool, middleware, custom agents and multi-agent teams from AutoGen to Agent Framework. The central change is from AutoGen's dual model (low-level `autogen-core` plus high-level `Team`) to a single typed, data-flow `Workflow` with request/response pauses and checkpointing.

## Key claims

- AutoGen `AssistantAgent` is single-turn unless `max_tool_iterations` is raised; Agent Framework `Agent` loops on tools by default.
- AutoGen offered embedded and experimental distributed runtimes; Agent Framework focuses on single-process composition, with distribution planned.
- AutoGen GraphFlow is control-flow (broadcast messages, conditional transitions); Agent Framework Workflow is data-flow (typed messages routed along edges to executors).
- Workflow nodes can be agents, functions or sub-workflows.
- AutoGen Teams had no built-in pause for human input or checkpointing; Workflows add request/response and superstep checkpoints.
- RoundRobinGroupChat maps to sequential orchestration; MagenticOneGroupChat maps to `MagenticBuilder`.
- The guide lists Swarm-style handoff and SelectorGroupChat as future patterns, and Anthropic/Ollama clients as planned, which conflicts with other Agent Framework pages listing them as available.

## Feeds

- [AutoGen / Microsoft Agent Framework](../concepts/autogen.md)
