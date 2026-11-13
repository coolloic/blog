---
title: "Source: Custom commands (Gemini CLI docs)"
summary: "Gemini CLI's TOML slash commands: file locations, namespacing, {{args}}, confirmed !{shell} injection and @{file} injection."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** Google (Gemini CLI project)
- **Date:** living document, read 2026-11-14
- **Original:** [Custom commands](https://geminicli.com/docs/cli/custom-commands/)

## Summary

Gemini CLI keeps user-triggered prompt templates as a separate TOML format rather than merging them into skills.

## Key claims

- Locations: user `~/.gemini/commands/`, project `.gemini/commands/`; project wins on name collision.
- Subdirectories namespace commands: `git/commit.toml` → `/git:commit`.
- Fields: `prompt` (required), `description` (optional).
- `{{args}}` is replaced raw outside shell blocks and shell-escaped inside `!{...}`; without it, arguments are appended.
- `!{cmd}` runs a shell command after showing it and asking for confirmation; `@{path}` injects file or directory contents (respecting ignore files). Order: `@{}` then `!{}` then `{{args}}`.

## Feeds

[Agent skills](../concepts/agent-skills.md)
