---
title: "Source: Hooks (Gemini CLI docs)"
summary: "Gemini CLI lifecycle hooks (BeforeAgent, BeforeModel, BeforeToolSelection, BeforeTool, etc.) configured in settings.json, with exit-2 blocking and fingerprint-based trust."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "guardrails"]
---

- **What:** official product documentation
- **Publisher:** Google (Gemini CLI project)
- **Date:** living document, read 2026-11-14
- **Original:** [Hooks](https://geminicli.com/docs/hooks/)

## Summary

Gemini CLI's hooks use different event names from Claude Code/Codex but the same exit-code idea, and add model-level and tool-selection hooks.

## Key claims

- Events: `SessionStart/End`, `BeforeAgent`, `AfterAgent`, `BeforeModel`, `AfterModel`, `BeforeToolSelection` (filter tools offered), `BeforeTool`, `AfterTool`, `PreCompress`, `Notification`.
- Defined in `settings.json`; layers merge with precedence project > user > system > extensions. Only `command` hooks; default timeout 60,000 ms.
- Exit 0 → stdout must be exactly one JSON object (extra text fails parsing and defaults to allow); exit 2 → block with stderr reason; other → warning, action proceeds.
- `CLAUDE_PROJECT_DIR` is exported as a compatibility alias.
- Project hooks are fingerprinted; a changed name or command (e.g. after `git pull`) is treated as untrusted and the user is warned.

## Feeds

[Agent skills](../concepts/agent-skills.md)
