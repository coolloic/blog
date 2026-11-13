---
title: "Source: Anthropic Browser Use Tool Docs"
summary: "Claude API documentation for the browser use toolset: 31 member tools mixing accessibility-tree refs and coordinates, tab state reporting, and a hardening checklist."
category: source
lastmod: 2026-11-14
tags: ["models", "computer-use", "anthropic", "browser"]
---

- **What:** official API documentation (Browser use tool)
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [Browser use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool)

## Summary

`browser_toolset_20260801` is a client toolset for driving a browser your application runs. Unlike computer use, it sees page structure (accessibility tree, element refs, forms, tabs) as well as screenshots.

## Key claims

- 31 members (27 on by default): navigation and capture, pointer actions, keyboard/timing, page reading (`read_page`, `find`, `get_page_text`), forms, tabs; `file_upload`, `read_console`, `read_network`, `javascript_exec` are off by default.
- Targets are either viewport coordinates or `ref` handles from `read_page`/`find`. Refs go stale when the DOM changes and the API cannot detect it; your executor must return errors. Prefer refs; fall back to coordinates for canvas, video, virtualized lists, cross-origin iframes.
- A tree read often costs fewer tokens than a screenshot. `read_page` output is capped at 50,000 characters.
- Executor reports tab inventory in a `browser_state` block (max 100 tabs).
- Same batch contract as computer use: in order, stop at first failure, answer every call.
- Use computer use for whole-desktop tasks; browser use for web-confined tasks; web fetch/search when no interaction is needed. Both toolsets can be declared together.
- Hardening: dedicated container with fresh profile and no credentials; network-layer domain allowlist re-checked after redirects; block private IP ranges; treat page content as untrusted; only http(s) in `navigate`; keep `javascript_exec` and `file_upload` off; human confirmation for purchases, account changes, messages, accepting terms.
- `javascript_exec` runs with the page's full privileges including cookies.

## Feeds

[Computer-use agents](../concepts/computer-use-agents.md)
