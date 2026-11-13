---
title: "Source: Hooks (OpenAI Codex docs)"
summary: "Codex lifecycle hooks: events, hooks.json/config.toml locations, exit-2 blocking, JSON decisions, hash-based trust and managed hooks."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "guardrails"]
---

- **What:** official product documentation
- **Publisher:** OpenAI
- **Date:** living document, read 2026-11-14
- **Original:** [Hooks](https://learn.chatgpt.com/docs/hooks)

## Summary

Codex's hook system closely mirrors Claude Code's event names and exit-code conventions, with an added trust step tied to each hook's hash.

## Key claims

- Events: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `UserPromptSubmit`, `SubagentStart/Stop`, `Stop`, `PreModelRequest`, `PostModelRequest`, `Interrupt`, `SessionStart/End`.
- Config: `~/.codex/hooks.json` or `[hooks]` in `config.toml`; repo `.codex/` (only if trusted); plugin `hooks/hooks.json`; managed `requirements.toml`. All matching hooks run.
- Exit 2 with a stderr reason is documented for `PreToolUse` and `UserPromptSubmit` (blocks), `PostToolUse` (replaces the tool result with the feedback; does not undo the command) and `Stop`/`SubagentStop` (Codex continues with the reason); otherwise JSON on stdout; plain text becomes developer context on `SessionStart`/`UserPromptSubmit`.
- `PreToolUse` can deny, add context or rewrite input; for `Stop`, `decision: block` makes Codex continue with the reason as a new prompt; `PostToolUse` cannot undo a command.
- Enabled by default; disable with `[features] hooks = false`.
- Non-managed hooks must be reviewed and trusted; trust is bound to the hook's hash, so edits require re-review (`/hooks`). Project `.codex/` hooks load only if that layer is trusted; managed hooks are trusted by policy; `--dangerously-bypass-hook-trust` skips trust for one-off automation.

## Feeds

[Agent skills](../concepts/agent-skills.md)
