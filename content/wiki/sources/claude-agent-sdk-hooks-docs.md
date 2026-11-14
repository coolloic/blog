---
title: "Source: Intercept and control agent behavior with hooks (Claude Agent SDK docs)"
summary: "In-process hook callbacks for the Claude Agent SDK: event list by language, HookMatcher registration, output fields, decision precedence, async outputs, onFailure fail-closed mode and per-event timeout behaviour."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "guardrails"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/hooks](https://code.claude.com/docs/en/agent-sdk/hooks)

## Summary

The Agent SDK exposes the same hook system as Claude Code, but lets an application register hooks as callback functions in its own process instead of shell commands. The page covers which events each SDK supports, how matchers filter callbacks, what a callback can return, how several hooks combine, and what happens when a callback fails or times out.

## Key claims

- Hooks come from two places: callbacks passed in `options.hooks`, plus shell command hooks from settings files when the matching `settingSources` / `setting_sources` entry is enabled (it is by default).
- Registration: event name → list of matchers; each matcher (`HookMatcher` in Python) has an optional `matcher` pattern, a required `hooks` list of callbacks, an optional `timeout` in seconds and an optional `onFailure` (`on_failure`).
- Matchers test only the tool name (or the event's own filter field), never arguments; an exact list like `Write|Edit` or a regex like `^mcp__`. A `Write|Edit` matcher does not catch a Bash command that writes the same file.
- Python supports a subset of events (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `UserPromptSubmit`, `Stop`, `SubagentStart/Stop`, `PreCompact`, `PermissionRequest`, `Notification`); TypeScript adds many more, including `SessionStart/End`, `PostToolBatch`, `PostCompact`, `PreModelSwitch`, `PermissionDenied`, `TaskCompleted`, `Elicitation` and `FileChanged`.
- Callback arguments: event input (shared `session_id`, `cwd`, `hook_event_name`; `agent_id`/`agent_type` inside subagents), a tool-use ID that correlates pre and post events, and a context (an `AbortSignal` in TypeScript; reserved in Python).
- Outputs: top-level `systemMessage` (shown to the user, not the model) and `continue`; `hookSpecificOutput` with `permissionDecision` (`allow`, `deny`, `ask`, `defer`), `permissionDecisionReason` and `updatedInput` on `PreToolUse`, and `additionalContext` or `updatedToolOutput` on `PostToolUse`. `{}` means allow unchanged.
- `updatedInput` without a decision still flows through normal permission evaluation; with `defer` it is ignored. `defer` ends the turn with `stop_reason` `tool_deferred` for later resumption.
- Matching hooks run in parallel; with conflicting decisions, deny beats defer, which beats ask, which beats allow. Hooks should not depend on each other's ordering.
- Async output (`async: true`) lets the agent continue immediately; it cannot block, modify or add context.
- A callback that throws or returns invalid output (or nothing) fails open by default; `onFailure: "block"` makes it fail closed (TypeScript SDK v0.3.317+, Python SDK v0.2.177+). `Stop`, `SubagentStop`, `TaskCompleted` and `TeammateIdle` ignore it.
- Default timeout is 600 s for most events (30 s for `UserPromptSubmit` and model-switch events, 10 s for `MessageDisplay`, a 1.5 s shutdown budget for `SessionEnd`). A timed-out `PreToolUse` callback blocks the tool call; a timed-out `Stop` callback counts as no decision.
- Pitfalls: hooks may not fire when the run hits `max_turns`; a `UserPromptSubmit` hook that spawns subagents can loop recursively.

## Feeds

- [Agent hooks and middleware](../concepts/agent-hooks-and-middleware.md)
