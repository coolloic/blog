---
title: "Source: Playwright MCP README"
summary: "Microsoft's Playwright MCP server: browser automation for LLMs via accessibility-tree snapshots rather than screenshots, with opt-in vision mode and security caveats."
category: source
lastmod: 2026-11-14
tags: ["models", "computer-use", "browser", "mcp"]
---

- **What:** open-source project README
- **Author/publisher:** Microsoft
- **Date:** living document (2026); read 2026-11-14
- **Original:** [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)

## Summary

An MCP server exposing Playwright browser control as tools. The model acts on structured accessibility snapshots, so no vision model is required and actions target elements deterministically.

## Key claims

- Accessibility tree instead of pixels avoids the ambiguity of screenshot-based approaches.
- Core tools: navigate, snapshot, click, type, fill form, select option, evaluate, wait, tabs, console and network inspection; opt-in capability groups (storage, network mocking, PDF, devtools, testing).
- `--caps=vision` adds coordinate-based mouse tools for elements the snapshot doesn't expose.
- For coding agents, Playwright CLI with skills may use fewer tokens; MCP suits persistent browser state and iterative exploration.
- Not a security boundary: `browser_run_code_unsafe` is RCE-equivalent, and origin allow/block lists don't cover redirects.

## Feeds

[Computer-use agents](../concepts/computer-use-agents.md)
