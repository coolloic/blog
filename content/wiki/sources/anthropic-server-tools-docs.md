---
title: "Source: Server tools (Claude docs)"
summary: "Anthropic's shared mechanics for server-executed tools: server_tool_use blocks, the server-side loop and pause_turn, mixing server and client tools, allowed_callers and domain filtering."
category: source
lastmod: 2026-11-14
tags: ["platforms", "anthropic", "tools"]
---

- **What:** official documentation page
- **Publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [Server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools)

## Summary

Explains how tools that Anthropic executes (web search, web fetch, code execution, tool search) appear in a Messages response and how to continue turns that pause or mix in your own tools.

## Key claims

- `server_tool_use` blocks need no `tool_result` from you; the result block follows in the same turn, paired by `tool_use_id`.
- Server tools run in a server-side loop; a long turn can return `stop_reason: "pause_turn"`. Continue by resending the assistant content unchanged with the same tools (and the container ID for code execution); a turn can pause repeatedly, so cap continuations.
- If Claude calls a server tool and a client tool in one parallel group, the API returns `stop_reason: "tool_use"` without running the server tool; send a user message containing only `tool_result` blocks and the server tool runs at the start of the next request.
- Adding text after the tool results ends the turn and causes a 400 for the unresolved server call.
- `allowed_callers` chooses direct calls, calls from code execution, or both; dynamic-filtering versions are not ZDR-eligible unless set to `["direct"]`.
- Domain filters: no scheme, subdomains included, path wildcards only, allow and block lists mutually exclusive, request lists must be a subset of org-level lists; beware Unicode homographs.
- In batches the loop has a higher per-turn iteration limit.

## Feeds

[Anthropic Messages API](../concepts/anthropic-messages-api.md)
