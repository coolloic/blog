---
title: "Source: Notebook: Build MCP From Scratch"
summary: "Owner's tutorial building an MCP server (FastMCP tools, resource, prompt) and a client that discovers and calls tools, with Inspector and Claude Desktop wiring."
category: source
lastmod: 2026-11-14
tags: ["protocols", "mcp"]
---

- **What:** interactive tutorial in the owner's public Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [Build MCP from scratch](https://coolloic.github.io/Notebook/mcp-build.html)

## Summary

Builds both halves of MCP in Python: a weather server with one tool, one resource and one prompt using the v1 `FastMCP` API, and a client that launches it over stdio, initializes, lists tools and calls one. Shows testing with the Inspector and registering the server in `claude_desktop_config.json`.

## Key claims

- Direct integration of M apps with N tools needs up to M×N adapters; a shared protocol makes it M+N.
- Three primitives and who controls them: tools (model), resources (app), prompts (user).
- Build a server when you own a capability to expose; build a client/task when you have a goal to accomplish with tools; often both.
- stdio for local servers, HTTP for remote/shared servers with authentication.
- A server is usually a thin adapter over an existing API.

Note: the tutorial's code uses the v1 Python API (`mcp.server.fastmcp.FastMCP`, `session.initialize()`); Python SDK v2 renames it `MCPServer` and the 2026-07-28 protocol drops the initialize handshake.

## Feeds

- [MCP in practice](../concepts/mcp-in-practice.md)
