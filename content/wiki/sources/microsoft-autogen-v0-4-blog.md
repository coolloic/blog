---
title: "Source: AutoGen v0.4: Reimagining the foundation of agentic AI (Microsoft Research)"
summary: "Microsoft Research post on the AutoGen v0.4 redesign: async event-driven core, layered APIs, observability and AutoGen Studio."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "microsoft"]
---

- **What:** research blog post
- **Author:** Microsoft Research AutoGen team (24 contributors)
- **Date:** 2025-01-14
- **Original:** [https://www.microsoft.com/en-us/research/blog/autogen-v0-4-reimagining-the-foundation-of-agentic-ai-for-scale-extensibility-and-robustness/](https://www.microsoft.com/en-us/research/blog/autogen-v0-4-reimagining-the-foundation-of-agentic-ai-for-scale-extensibility-and-robustness/)

## Summary

v0.4 is a ground-up redesign prompted by v0.2 users' complaints about architecture constraints, an unwieldy API and weak debugging. It introduces an asynchronous event-driven architecture with three layers (Core, AgentChat, Extensions), cross-language interop, OpenTelemetry support, a rebuilt AutoGen Studio, and Magentic-One.

## Key claims

- Agents communicate through asynchronous messages supporting event-driven and request/response interaction.
- Layers: Core (event-driven primitives), AgentChat (high-level task API, easiest migration from v0.2), Extensions (model clients, code executors).
- Built-in tracing and OpenTelemetry support.
- AutoGen Studio was rebuilt on AgentChat with live streams, mid-run pause and a drag-and-drop team builder.
- Magentic-One is a generalist multi-agent system for open-ended web and file tasks.

## Feeds

- [AutoGen / Microsoft Agent Framework](../concepts/autogen.md)
