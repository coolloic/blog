---
title: "Source: Memory tool (Claude API docs)"
summary: "Anthropic's reference for the client-side memory tool: a /memories file directory Claude can view, create, edit, rename and delete across sessions."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "tools"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** read 2026-11-14 (tool version `memory_20250818`, status stable)
- **Original:** [platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)

## Summary

The memory tool gives Claude a directory of files under `/memories` that persists between conversations. It is client-side: Claude emits `tool_use` requests and the application executes them against storage it controls (disk, database, per-user prefix). The docs specify six commands, their reference return strings, the system-prompt instruction the API injects, security duties, and how memory pairs with context editing and compaction.

## Key claims

- Configuration is a single tools entry, `{"type": "memory_20250818", "name": "memory"}`; no beta header or input schema is needed. Available on Claude 4 and later models and on Bedrock, Google Cloud and Foundry.
- Commands: `view` (directory listing two levels deep, or file with line numbers and optional `view_range`), `create`, `str_replace` (must match uniquely), `insert` (after line N, 0 = top), `delete` (recursive for directories), `rename` (must not overwrite).
- The API auto-adds a system instruction telling Claude to view its memory directory first, record progress as it goes, and assume its context may be reset at any moment.
- Text views of files longer than 16,000 characters are truncated, so expect ranged follow-up views.
- SDK helpers: `BetaAbstractMemoryTool` (Python, C#), `betaMemoryTool` (TypeScript), `BetaMemoryToolHandler` (Java); `BetaLocalFilesystemMemoryTool` ships for Python and TypeScript.
- Security is the application's job: validate every path stays under `/memories` (canonicalise, reject `../` and URL-encoded variants), cap file sizes, expire stale files, strip sensitive data before writing.
- With context editing, Claude gets a warning before tool results are cleared so it can save what matters to memory first. With compaction, memory holds what must survive summarisation.
- Recommended multi-session pattern: an initializer session writes a progress log and feature checklist; later sessions read them first and update them before ending.
- Zero-data-retention and HIPAA eligible because storage is client-side; ZDR eligibility excludes Anthropic's "Covered Models".

## Feeds

[Agent memory](../concepts/agent-memory.md)
