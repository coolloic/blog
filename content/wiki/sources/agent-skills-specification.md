---
title: "Source: Agent Skills specification (agentskills.io)"
summary: "The open format spec for Agent Skills: SKILL.md frontmatter fields and constraints, optional scripts/references/assets folders, progressive-disclosure budgets and a validator."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills"]
---

- **What:** open format specification
- **Publisher:** Agent Skills project (agentskills.io), originated by Anthropic
- **Date:** living spec, read 2026-11-14
- **Original:** [Agent Skills specification](https://agentskills.io/specification)

## Summary

Defines the portable, vendor-neutral format that Claude, Codex, Gemini CLI, Cursor and others now read. It is deliberately minimal: a directory, one Markdown file with YAML frontmatter, and conventions rather than rules for everything else.

## Key claims

- Required: `name` (1-64 chars, lowercase a-z, 0-9 and hyphens, no leading/trailing or doubled hyphens, must equal the parent directory name) and `description` (1-1024 chars, should state what the skill does and when to use it, with matching keywords).
- Optional: `license`, `compatibility` (max 500 chars; environment requirements such as packages or network), `metadata` (string-to-string map), and experimental `allowed-tools` (space-separated pre-approved tools, e.g. `Bash(git:*) Read`); support varies by agent.
- Body has no format restrictions; recommended contents are step-by-step instructions, input/output examples and edge cases. The whole body is loaded on activation.
- Conventional folders: `scripts/` (self-contained executables with helpful errors), `references/` (focused docs loaded on demand), `assets/` (templates, images, data).
- Disclosure budget: metadata about 100 tokens per skill at startup; instructions recommended under 5,000 tokens; resources loaded only when required. Keep `SKILL.md` under 500 lines.
- File references should use relative paths and stay one level deep from `SKILL.md`.
- Validation: `skills-ref validate ./my-skill` checks frontmatter and naming.

## Feeds

[Agent skills](../concepts/agent-skills.md)
