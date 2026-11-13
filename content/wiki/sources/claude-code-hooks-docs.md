---
title: "Source: Hooks reference (Claude Code docs)"
summary: "Claude Code's deterministic lifecycle handlers: ~30 events, five handler types, matcher syntax, exit-code and JSON decision semantics, timeouts and trust controls."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "guardrails"]
---

- **What:** official product documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [Hooks reference](https://code.claude.com/docs/en/hooks)

## Summary

Hooks are the enforcement layer of Claude Code: handlers the harness runs at lifecycle events regardless of what the model decides, able to block, rewrite, or add context.

## Key claims

- Events include `SessionStart/End`, `UserPromptSubmit`, `Stop`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `SubagentStart/Stop`, `PreCompact/PostCompact`, `InstructionsLoaded`, `FileChanged` and more.
- Handler types: `command` (stdin JSON), `http` (POST), `mcp_tool`, `prompt` (single-turn model judgement), `agent` (experimental subagent with read tools).
- Config nests event → matcher group → handlers; matcher is an exact name/list (`Edit|Write`) or a regex; `if` uses permission-rule syntax and is best-effort.
- Default timeouts: 600 s for command/http/mcp_tool, 30 s for prompt, 60 s for agent; shorter on some events (30 s on `UserPromptSubmit`, a shared 1.5 s budget for `SessionEnd`).
- Exit 0 = success (stdout parsed as JSON if it is one object); exit 2 = block, stderr fed to the model; any other exit is a non-blocking error, so exit 1 does not enforce policy.
- `PreToolUse` JSON can return `permissionDecision` allow/deny/ask/defer, `updatedInput` and `additionalContext`; `Stop` can return `decision: block` to send the agent back to work. `additionalContext` strings are capped at 10,000 chars.
- Failures fail open by default; `onFailure: "block"` (v2.1.295+) makes command/http hooks fail closed, except that it has no effect on `Stop`, `SubagentStop`, `TaskCompleted`, `TeammateIdle` or async hooks.
- Locations: user, project, local and managed settings, plugin `hooks/hooks.json`, and skill or subagent frontmatter; all matching hooks merge and fire.
- Security: hooks run arbitrary commands with user privileges; review project and plugin hooks; managed settings can restrict hooks to managed-only.

## Feeds

[Agent skills](../concepts/agent-skills.md)
[Agent instruction files](../concepts/agent-instruction-files.md)
