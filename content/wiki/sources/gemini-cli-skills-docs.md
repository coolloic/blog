---
title: "Source: Agent Skills (Gemini CLI docs)"
summary: "Gemini CLI's implementation of Agent Skills: four discovery tiers, model-called activate_skill with a user consent prompt, and /skills and gemini skills management commands."
category: source
lastmod: 2026-11-14
tags: ["agents", "skills", "coding"]
---

- **What:** official product documentation
- **Publisher:** Google (Gemini CLI project)
- **Date:** living document, read 2026-11-14
- **Original:** [Agent Skills](https://geminicli.com/docs/cli/skills/)

## Summary

Shows a different activation mechanism from Claude Code: the model calls a dedicated `activate_skill` tool and the user approves before the body enters context.

## Key claims

- Tiers (low to high precedence): built-in, extension, user (`~/.gemini/skills/` or `~/.agents/skills/`), workspace (`.gemini/skills/` or `.agents/skills/`); `.agents/` wins over `.gemini/` within a tier.
- Startup: name and description of each enabled skill go into the system prompt.
- Activation: the model calls `activate_skill`; a confirmation shows the skill's name, purpose and directory; on approval the body and folder structure are injected and the directory becomes an allowed path.
- Management: `/skills list|link|enable|disable|reload`; `gemini skills install <git url|path>` with `--scope` and `--consent` (skips the security confirmation).

## Feeds

[Agent skills](../concepts/agent-skills.md)
