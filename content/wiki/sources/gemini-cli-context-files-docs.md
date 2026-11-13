---
title: "Source: GEMINI.md context files (Gemini CLI docs)"
summary: "How Gemini CLI loads hierarchical GEMINI.md files (global, workspace ancestors, just-in-time), supports @imports, and can be pointed at AGENTS.md."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** Google (Gemini CLI project)
- **Date:** living document, read 2026-11-14
- **Original:** [Provide context with GEMINI.md files](https://geminicli.com/docs/cli/gemini-md/)

## Summary

Gemini CLI's equivalent of CLAUDE.md/AGENTS.md. Note a 2026-06-18 banner: Gemini CLI was replaced by Antigravity CLI for unpaid and Google One users.

## Key claims

- All found files are concatenated and sent with every prompt.
- Order: global `~/.gemini/GEMINI.md`; then workspace directories and their parents; then just-in-time loading when a tool touches a directory (scanning it and its ancestors up to a trusted root).
- `/memory show` prints the concatenated context; `/memory reload` rescans.
- `@file.md` imports split large files (relative or absolute paths).
- `context.fileName` in settings accepts a name or list, e.g. `["AGENTS.md", "GEMINI.md"]`, so one file can serve several agents.
- No size limits are stated; `.geminiignore` excludes files from context.

## Feeds

[Agent instruction files](../concepts/agent-instruction-files.md)
