---
title: "Source: Cursor Rules (Cursor docs)"
summary: "Cursor's instruction system: team, project (.cursor/rules .mdc) and user rules with always/intelligent/glob/manual application, plus nested AGENTS.md."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** Cursor
- **Date:** living document, read 2026-11-14
- **Original:** [Rules](https://cursor.com/docs/context/rules)

## Summary

Cursor injects persistent instructions from several rule sources and lets each project rule declare when it applies, trading always-on context cost against reliability.

## Key claims

- Rule sources: Team rules (dashboard, enforceable by admins), Project rules (`.mdc` files in `.cursor/rules`, version-controlled; plain `.md` there is ignored), User rules (global), and AGENTS.md as a metadata-free alternative.
- Application modes via frontmatter (`alwaysApply`, `description`, `globs`): Always, Apply Intelligently (agent decides from the description), Apply to Specific Files (glob), Apply Manually (@-mention).
- Referenced files are read on demand, not inlined.
- Keep rules under 500 lines, focused and composable; add a rule when the agent repeats a mistake.
- Nested AGENTS.md files combine with parents; more specific wins. Precedence across sources: Team → Project → User, earlier wins on conflict.

## Feeds

[Coding agents](../concepts/coding-agents.md)
