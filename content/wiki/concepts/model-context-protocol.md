---
title: "Model Context Protocol (MCP)"
summary: "Open standard for exposing tools, resources and prompts to any compatible agent."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-13
tags: ["agents", "mcp", "tools"]
---

The **Model Context Protocol (MCP)** is an open standard for connecting agents to external capabilities. A service runs an **MCP server** that exposes [tools](tools.md), resources and prompts once, and any MCP-compatible agent (the client) can use them.

## Why it matters

- **Before MCP**, every agent framework had its own tool format, so each integration was rebuilt for each framework.
- **With MCP**, an integration is built once and reused everywhere. The source compares this to USB for hardware: standardise the plug and the ecosystem grows on its own.
- **In practice**, connecting an agent to an issue tracker, documentation or a database is often configuration rather than custom code.

## Related

[Tools](tools.md) · [Agent guardrails](agent-guardrails.md): content returned by MCP servers is data, not instructions.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
