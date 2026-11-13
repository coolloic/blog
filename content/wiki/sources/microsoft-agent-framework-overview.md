---
title: "Source: Microsoft Agent Framework overview (Microsoft Learn)"
summary: "Overview of Microsoft Agent Framework, the successor to AutoGen and Semantic Kernel: agents, harness agent, workflows and integrations."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft"]
---

- **What:** official documentation page, Microsoft Learn
- **Author:** Microsoft
- **Date:** ms.date 2026-10-23 (read 2026-11-14)
- **Original:** [https://learn.microsoft.com/en-us/agent-framework/overview/](https://learn.microsoft.com/en-us/agent-framework/overview/)

## Summary

Agent Framework is built by the AutoGen and Semantic Kernel teams as the next generation of both. It has four areas: agents, an opinionated harness agent for long tasks, workflows (functional and graph-based), and integrations. It supports .NET, Python and Go (preview).

## Key claims

- Combines AutoGen's simple agent abstractions with Semantic Kernel's enterprise features (sessions, type safety, middleware, telemetry) and adds graph workflows.
- Harness agent: planning/todos, context compaction, file access and memory, tool approval, observability.
- Model providers include Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI and Ollama.
- Go SDK is in public preview and requires Go 1.26+.
- Use an agent for open-ended tasks; a workflow when steps are well-defined or several agents must coordinate.
- If a plain function can do the task, write the function instead of using an agent.

## Feeds

- [AutoGen / Microsoft Agent Framework](../concepts/autogen.md)
