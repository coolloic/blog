---
title: "Source: Notebook: APIs vs MCP"
summary: "Owner's tutorial contrasting plain APIs with MCP: host/client/server roles, the M×N problem, and when an MCP layer is worth it."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp"]
---

- **What:** interactive tutorial in the owner's public Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [APIs vs MCP](https://coolloic.github.io/Notebook/api-mcp.html)

## Summary

Explains MCP as a standard layer on top of APIs rather than a replacement, with a side-by-side of the same weather tool written as a hand-wired API client and as an MCP server.

## Key claims

- Roles: host (the AI app), client (1:1 connection to a server, inside the host), server (wraps an API, DB or filesystem).
- Function calling defines tools inside one app; MCP moves them into reusable servers usable across hosts.
- Use a plain API when only your own code calls your own service or you need tight control; use MCP when agents should discover many tools at runtime or you publish tools for other people's AI apps.
- Main caution: third-party servers run code and touch data, so trust and auth matter.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)
