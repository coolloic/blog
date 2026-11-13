---
title: "Source: Build skills (OpenAI Codex docs)"
summary: "How Codex implements the Agent Skills standard: .agents/skills locations, $skill invocation, a 2%-of-context listing budget, openai.yaml policy, and plugins for distribution."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills", "coding"]
---

- **What:** official product documentation
- **Publisher:** OpenAI
- **Date:** living document, read 2026-11-14
- **Original:** [Build skills (formerly developers.openai.com/codex/skills)](https://learn.chatgpt.com/docs/build-skills)

## Summary

Codex adopted the open skill format and adds an optional `agents/openai.yaml` sidecar for UI and invocation policy, plus explicit budget controls on how much of the window the skill list may use.

## Key claims

- Skill = directory with `SKILL.md` (`name`, `description`) plus optional `scripts/`, `references/`, `assets/`, `agents/openai.yaml`.
- Locations: repo `.agents/skills` (cwd up to repo root), user `$HOME/.agents/skills`, admin `/etc/codex/skills`, system (bundled `skill-creator`, `skill-installer`).
- Invocation: explicit via `$` or `/skills` in CLI/IDE (or `@` in ChatGPT); implicit when the task matches the description.
- Budget: the initial list (names, descriptions, paths) uses at most 2% of the context window, or 8,000 chars if unknown; descriptions are shortened first, then skills omitted with a warning. `skills.max_context_tokens` raises it up to 10,000 tokens.
- `agents/openai.yaml`: `interface` (display metadata), `policy.allow_implicit_invocation` (default true), `dependencies.tools` (e.g. MCP servers).
- Disable with `[[skills.config]]` entries (`enabled = false`) in `~/.codex/config.toml`; bundled skills can be turned off per trusted project.
- Plugins distribute skills, optionally bundled with connectors (MCP servers).

## Feeds

[Agent skills](../concepts/agent-skills.md)
