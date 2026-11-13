---
title: "Source: A2A and MCP (A2A project docs)"
summary: "A2A documentation page positioning A2A (agent-to-agent, stateful collaboration) as complementary to MCP (agent-to-tool), with an auto-repair-shop example."
category: source
lastmod: 2026-11-14
tags: ["protocols", "a2a", "mcp"]
---

- **What:** topic page in the official A2A documentation
- **Author/publisher:** A2A project
- **Date:** living document; read 2026-11-14
- **Original:** [A2A and MCP](https://a2a-protocol.org/latest/topics/a2a-and-mcp/)

## Summary

The page draws the line between tools (structured inputs/outputs, typically stateless) and agents (reason, plan, hold multi-turn state). MCP deepens one agent's reach to tools; A2A connects agents across teams and organizations. Its worked example: a customer talks to a shop-manager agent over A2A, which delegates to a mechanic agent over A2A; the mechanic uses MCP for scanners and manuals and A2A again to order parts from a supplier agent.

## Key claims

- MCP is "vertical" (agent to tools); A2A is "horizontal" (agent to agent).
- Recommended architecture: use both; agents talk over A2A, each reaches its own tools over MCP.
- An A2A agent can expose well-defined, stateless skills as MCP-style tools, but A2A's distinctive value is stateful collaboration rather than a single call.

## Feeds

- [Agent2Agent (A2A) protocol](../concepts/agent2agent-protocol.md)
