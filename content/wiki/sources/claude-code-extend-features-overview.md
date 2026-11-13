---
title: "Source: Extend Claude Code (Claude Code docs)"
summary: "Anthropic's map of Claude Code extension points (CLAUDE.md, rules, skills, MCP, subagents, hooks, plugins) with when-to-use guidance and per-feature context cost."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Extend Claude Code](https://code.claude.com/docs/en/features-overview)

## Summary

A decision guide: each extension plugs into a different part of the agent loop and carries a different, explicit context cost. It also gives the order in which teams typically adopt them.

## Key claims

- CLAUDE.md: loaded every session, costs tokens on every request; for 'always do X' rules. Keep under 200 lines.
- `.claude/rules/`: every session or only when files matching `paths` are opened.
- Skills: descriptions every request, full content on use; `disable-model-invocation: true` removes even the description.
- MCP: tool names at start, full schemas deferred (tool search on by default).
- Subagents: isolated context; hooks: zero context unless they return output.
- Layering: CLAUDE.md files are additive; skills and subagents override by name; MCP servers override by name (local > project > user); hooks merge and all fire.
- Hook vs skill: a hook fires deterministically on an event; a skill is interpreted by the model. A 'never edit .env' line in CLAUDE.md is a request; a `PreToolUse` hook is enforcement.
- MCP vs skill: MCP supplies connections and tools; a skill supplies knowledge of how to use them (e.g. schema and query patterns).
- Adoption triggers: a convention corrected twice → CLAUDE.md; same prompt typed repeatedly → user-invocable skill; a playbook pasted a third time → skill; data copied from a system the agent can't see → MCP; must happen every time → hook; second repo needs the setup → plugin.

## Feeds

[Agent skills](../concepts/agent-skills.md)
[Agent instruction files](../concepts/agent-instruction-files.md)
