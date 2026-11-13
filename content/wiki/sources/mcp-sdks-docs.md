---
title: "Source: MCP SDKs and Python SDK v2"
summary: "The official MCP SDK list with tier ratings, plus the Python SDK v2 'What's new' page (FastMCP renamed MCPServer, 2026-07-28 support, legacy compatibility)."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp"]
---

- **What:** the SDKs page on modelcontextprotocol.io and the Python SDK documentation's "What's new in v2"
- **Author/publisher:** Model Context Protocol project
- **Date:** living documents; read 2026-11-14
- **Original:** [SDKs](https://modelcontextprotocol.io/docs/sdk) · [Python SDK v2: What's new](https://py.sdk.modelcontextprotocol.io/whats-new/) · [python-sdk repo](https://github.com/modelcontextprotocol/python-sdk)

## Summary

Official SDKs are tiered by completeness and maintenance. All support servers with tools/resources/prompts, clients, and local plus remote transports, but each adopts new protocol revisions on its own schedule. The Python SDK's 2.x line implements the stateless 2026-07-28 revision while still serving 2025-era clients from the same app.

## Key claims

- Tier 1 (as of 2026-11-14): TypeScript, Python, C#, Go, Rust, Ruby. Tier 2: Java. Tier 3: Swift, PHP, Kotlin.
- Python v2: `FastMCP` is now `MCPServer` (`from mcp.server import MCPServer`); `@mcp.tool()` on a type-hinted function, docstring as description; `@mcp.resource("greeting://{name}")` for URI templates.
- Python v2 requires Python 3.11+; `uv run mcp dev server.py` opens the MCP Inspector; `mcp run server.py --transport streamable-http` serves over HTTP.
- On 2026-07-28 connections `ctx.elicit()` and sampling raise `NoBackChannelError` (they still work for legacy clients), reflecting the MRTR redesign.
- Without sessions, any replica can answer a modern Streamable HTTP request; 2025-era clients still open sessions and need the same stickiness as v1. MRTR `request_state` uses a per-process key by default, so scaled deployments should pass `RequestStateSecurity(keys=[...])`.
- Tests: `Client(mcp)` negotiates 2026-07-28 by default, so v1 tests relying on elicitation/sampling can fail; `mode="legacy"` keeps push behaviour.
- The 3.11+ requirement and the `mcp run` command come from the repo README; the What's new page covers `mcp dev`/`mcp install`.
- WebSocket transport removed; host/port options move to `run()`; mount the ASGI app to serve under a prefix.
- Client auth validates `iss`, sends `application_type`, refuses to replay credentials against a different AS, and adds an enterprise identity-assertion flow (SEP-990).

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)
