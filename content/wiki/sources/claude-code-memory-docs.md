---
title: "Source: How Claude remembers your project (Claude Code memory docs)"
summary: "Reference for CLAUDE.md locations, load order, imports, path-scoped rules, managed policy files, auto memory and AGENTS.md interop in Claude Code."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "memory"]
---

- **What:** official product documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [How Claude remembers your project](https://code.claude.com/docs/en/memory)

## Summary

Explains the two cross-session memory mechanisms in Claude Code: human-written CLAUDE.md files and agent-written auto memory. Both are loaded as context, not enforced configuration. Covers where files live, the order they load, how imports and rules work, and when an AGENTS.md is read instead.

## Key claims

- Scopes: managed policy file (e.g. `/Library/Application Support/ClaudeCode/CLAUDE.md` on macOS, `/etc/claude-code/CLAUDE.md` on Linux), project (`./CLAUDE.md` or `./.claude/CLAUDE.md`), user (`~/.claude/CLAUDE.md`), and personal-project `CLAUDE.local.md` (gitignored).
- Files in ancestor directories load at launch; files in subdirectories load lazily when the agent reads or edits a file there.
- Discovered files are concatenated, not overridden; ordering is root-down, so instructions nearer the working directory are read last. Contradictions may be resolved arbitrarily.
- `@path` imports expand other files into context; relative paths resolve from the importing file; recursion is capped at four hops. Imports outside the working directory require a one-time approval (protection against files others commit).
- `.claude/rules/*.md` with a `paths:` frontmatter glob load only when matching files are touched.
- Size guidance: under 200 lines per CLAUDE.md; longer files reduce adherence.
- Auto memory: the agent's own notes per repository; the first 200 lines or 25KB of MEMORY.md load each session.
- Managed settings are for enforcement (`permissions.deny`, `sandbox.enabled`); a managed CLAUDE.md is for behavioural guidance and cannot be excluded by users via `claudeMdExcludes`.
- AGENTS.md interop (Claude Code v2.1.277+): with no `CLAUDE.md`/`CLAUDE.local.md` in the working directory or above, Claude Code reads AGENTS.md; when one exists, only CLAUDE.md loads unless it imports AGENTS.md. The **Project instructions** setting (`claude-md-or-agents-md` default, `claude-md-and-agents-md`, `managed-only`) changes this.

## Feeds

[Coding agents](../concepts/coding-agents.md)
