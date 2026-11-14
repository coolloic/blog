---
title: "Model Context Protocol (MCP)"
summary: "Open standard for exposing tools, resources and prompts to any compatible agent."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-14
tags: ["agents", "mcp", "tools"]
---

The **Model Context Protocol (MCP)** is an open standard for connecting agents to external capabilities. A service runs an **MCP server** that exposes [tools](tools.md), resources and prompts once, and any MCP-compatible agent (the client) can use them.

## Why it matters

- **Before MCP**, every agent framework had its own [tool format](function-calling.md), so each integration was rebuilt for each framework.
- **With MCP**, an integration is built once and reused everywhere. The source compares this to USB for hardware: standardise the plug and the ecosystem grows on its own.
- **In practice**, connecting an agent to an issue tracker, documentation or a database is often configuration rather than custom code.

## Related

[Tools](tools.md) · [Agent guardrails](agent-guardrails.md): content returned by MCP servers is data, not instructions (see [prompt injection](prompt-injection.md)).

## Going deeper

- [MCP in practice](mcp-in-practice.md): the wire protocol, the stateless 2026-07-28 revision, transports, registries, SDKs and security failure modes.
- [Agent2Agent protocol](agent2agent-protocol.md): the counterpart standard for agent-to-agent delegation.
- [Agent authentication and authorization](agent-authentication-and-authorization.md): OAuth for remote MCP servers and keeping credentials out of tool parameters.
- [Agent skills](agent-skills.md): MCP supplies the connection, a skill teaches how to use it.
- [Claude Agent SDK](claude-agent-sdk.md): custom tools served as in-process MCP servers, with deferred schema loading.
- [Code execution sandboxes](code-execution-sandboxes.md): calling MCP tools from code to cut context usage.
- [LLM security risks](llm-security-risks.md): tool poisoning and other threats that MCP widens.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
