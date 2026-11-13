---
title: "Source: Notebook: WebMCP & A2A"
summary: "Owner's tutorial placing MCP (agent to tools), WebMCP (agent to web page) and A2A (agent to agent) as complementary layers."
category: source
lastmod: 2026-11-14
tags: ["protocols", "a2a", "mcp"]
---

- **What:** interactive tutorial in the owner's public Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [WebMCP & A2A](https://coolloic.github.io/Notebook/webmcp-a2a.html)

## Summary

Frames the agent protocol stack by direction: MCP connects an agent down to tools, WebMCP lets a website register tools for an in-browser agent instead of being scraped, and A2A connects agents sideways. Includes an illustrative Agent Card and a comparison table.

## Key claims

- MCP is vertical (agent → tools); A2A is horizontal (agent → agent); one agent can be an MCP host and an A2A peer at once.
- A2A agents advertise skills and endpoint in a JSON Agent Card; clients fetch the card to discover them.
- A2A limits: young ecosystem, opaque agents are harder to reason about than typed tool calls, multi-agent setups add latency and failure modes.
- WebMCP is an early web-standards proposal; its security and permission model is unsettled.
- Practical stance: build capabilities as APIs, wrap them in MCP, and add A2A or WebMCP only where cross-agent delegation or in-browser tools are specifically needed.

Note: the tutorial's sample card uses the pre-0.3 `/.well-known/agent.json` path and the pre-1.0 single `url` field; current cards use `agent-card.json` (since 0.3) and `supportedInterfaces` (since 1.0).

## Feeds

- [Agent2Agent (A2A) protocol](../concepts/agent2agent-protocol.md)
- [MCP in practice](../concepts/mcp-in-practice.md)
