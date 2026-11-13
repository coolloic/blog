---
title: "Tools"
summary: "Functions an agent can call to act on the world; their design is interface design for a model."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-13
tags: ["agents", "tools"]
---

**Tools** are functions the harness exposes to the model, each with a name, a description and a parameter schema. They are the only way an [agent loop](agent-loop.md) affects anything outside the model: reading files, running commands, querying data, calling APIs.

## Design principles

- **Tool design is interface design.** The model knows a tool only through its name, description and schema. Vague descriptions produce vague usage. Write them like a docstring for a new colleague.
- **Fewer, sharper tools.** Overlapping tools make the model pick the wrong one some of the time. Consolidate them.
- **Lean output.** Tool results go into the context window, so large outputs crowd out what matters. See [context engineering](context-engineering.md).
- **Risk varies by tool.** Read-only tools can run freely, while writes and outward-facing actions need [guardrails](agent-guardrails.md).

## Related

[Model Context Protocol](model-context-protocol.md), a standard way to expose tools to any agent.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
