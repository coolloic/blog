---
title: "Source: Give Claude custom tools (Claude Agent SDK docs)"
summary: "How to define custom tools for the Claude Agent SDK as in-process MCP servers, with annotations, permissions and error handling."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "tools"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/custom-tools](https://code.claude.com/docs/en/agent-sdk/custom-tools)

## Summary

Custom tools are defined with `@tool` (Python) or `tool()` (TypeScript, Zod schema), wrapped in an in-process MCP server via `create_sdk_mcp_server`, and registered through `mcp_servers`. The page covers naming (`mcp__server__tool`), MCP tool annotations, tool availability vs permission, error results, and returning images, resources and structured content.

## Key claims

- A tool is a name, description, input schema and async handler returning MCP-style `content` blocks.
- The in-process server runs inside your application, not as a separate process.
- Tool search is on by default and defers SDK MCP tool schemas until needed.
- `readOnlyHint` lets a tool run in parallel with other read-only calls; annotations are metadata, not enforcement.
- The `tools` option controls availability (what is in context); `allowedTools` controls permission (what is auto-approved).
- Handler exceptions do not stop the loop: they become error results Claude can react to; returning `isError` lets you compose the message.
- Python in-process tools forward only `content` and `is_error`; structured content needs a standalone MCP server.

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)
