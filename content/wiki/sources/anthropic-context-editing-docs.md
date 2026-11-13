---
title: "Source: Context editing (Claude API docs)"
summary: "Anthropic's beta server-side strategies for clearing old tool results and thinking blocks, with a pre-clear warning that lets the memory tool save state."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "context"]
---

- **What:** official API documentation
- **Publisher:** Anthropic
- **Date:** read 2026-11-14 (beta header `context-management-2025-06-27`)
- **Original:** [platform.claude.com/docs/en/build-with-claude/context-editing](https://platform.claude.com/docs/en/build-with-claude/context-editing)

## Summary

Context editing removes content from the prompt on the server before Claude sees it, while the client keeps the full history. Two strategies exist: clearing old tool results and clearing old thinking blocks. Anthropic now recommends server-side compaction for most long conversations and positions context editing as finer-grained control.

## Key claims

- `clear_tool_uses_20250919` clears the oldest tool results first, leaving a placeholder. Parameters: `trigger` (default 100,000 input tokens), `keep` (default last 3 tool uses), `clear_at_least`, `exclude_tools`, `clear_tool_inputs` (default false).
- `clear_thinking_20251015` keeps the last N thinking turns (default 1, or `"all"`); it must come first in the `edits` array when combined.
- Clearing tool results invalidates the cached prefix; `clear_at_least` exists so each clear frees enough tokens to justify the cache write.
- When context nears the clearing threshold, Claude receives an automatic warning and can copy essential results into memory files first.
- Responses report what was cleared in `context_management.applied_edits`.
- SDK client-side compaction (`compaction_control`) is deprecated in the TypeScript and Ruby SDKs and was removed from the Python SDK in v1.0; with a tool runner, the replacement is the server-side `compact_20260112` edit in `context_management`.

## Feeds

[Agent memory](../concepts/agent-memory.md)
