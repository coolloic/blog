---
title: "Source: Configure permissions (Claude Agent SDK docs)"
summary: "The six-step permission evaluation order of the Claude Agent SDK, allow/deny rules, and the six permission modes."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "security"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/permissions](https://code.claude.com/docs/en/agent-sdk/permissions)

## Summary

Details how a tool call is approved or blocked: hooks, then deny rules, ask rules, the permission mode, allow rules and finally the application's `canUseTool` callback. It explains the semantics of `allowed_tools` and `disallowed_tools`, path rules, and each permission mode, with several warnings about combinations that silently bypass checks.

## Key claims

- Evaluation order: hooks, deny rules, ask rules, permission mode, allow rules, `canUseTool` callback.
- Deny rules apply even in `bypassPermissions` mode and even when a hook returned allow.
- `allowed_tools` pre-approves listed tools but does not hide others; unlisted tools fall through to the mode and callback.
- A bare name in `disallowed_tools` removes the tool from the request; a scoped rule like `Bash(rm *)` denies matching calls only.
- Auto-approved calls never reach `canUseTool`; use a `PreToolUse` hook to inspect them.
- `allowed_tools` does not constrain `bypassPermissions`: unlisted tools are approved too.
- Modes: `default`, `dontAsk` (deny instead of prompting), `acceptEdits`, `bypassPermissions`, `plan`, and `auto` (a classifier model reviews actions).
- Subagents inherit plan, acceptEdits, auto or bypassPermissions from the main session; a subagent's own `bypassPermissions` value is never applied.
- Recommended locked-down headless setup: an explicit `allowedTools` list plus `dontAsk` mode.

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)
