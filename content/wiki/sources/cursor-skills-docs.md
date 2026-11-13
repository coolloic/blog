---
title: "Source: Agent Skills (Cursor docs)"
summary: "Cursor's skills support: .cursor/.agents skill folders with Claude/Codex compatibility paths, paths-scoped surfacing, manual-only skills, and migration of rules and commands to skills."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills", "coding"]
---

- **What:** official product documentation
- **Publisher:** Cursor
- **Date:** living document, read 2026-11-14
- **Original:** [Agent Skills](https://cursor.com/docs/context/skills)

## Summary

Cursor reads the open skill format from its own and other vendors' folders and positions skills as the replacement for dynamic rules and custom slash commands.

## Key claims

- Project: `.agents/skills/`, `.cursor/skills/`; user: `~/.agents/skills/`, `~/.cursor/skills/`; also reads `.claude/skills/`, `.codex/skills/` and their home-directory equivalents. Nested folders are scoped to their subdirectory.
- Frontmatter: `name` (must match folder), `description`, `paths` (globs; legacy `globs`), `disable-model-invocation`, `icon`/`color`, `metadata`.
- Invoke with `/` for one message, or as a Custom Mode to keep it active all session.
- `/migrate-to-skills` (Cursor 2.4) converts 'Apply Intelligently' rules into skills and slash commands into skills with `disable-model-invocation: true`; always-apply and glob rules stay rules.
- Only `~/.cursor/skills/` syncs to Cloud Agents; synced skills don't load in Automation runs.

## Feeds

[Agent skills](../concepts/agent-skills.md)
[Agent instruction files](../concepts/agent-instruction-files.md)
