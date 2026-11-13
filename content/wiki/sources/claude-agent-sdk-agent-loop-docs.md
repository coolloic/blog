---
title: "Source: How the agent loop works (Claude Agent SDK docs)"
summary: "Claude Agent SDK documentation of turns, message types, tool execution, budgets, effort, context accumulation, compaction and result subtypes."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "anthropic"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/agent-loop](https://code.claude.com/docs/en/agent-sdk/agent-loop)

## Summary

Explains what happens inside a `query()` call: Claude evaluates the prompt, requests tools, the SDK executes them and feeds results back, until a response contains no tool calls. It documents the streamed message types, built-in tools, permission modes, the `max_turns` and `max_budget_usd` caps, the `effort` option, how the context window fills up and how automatic compaction works, and the `ResultMessage` subtypes used to detect how a run ended.

## Key claims

- Both SDKs bundle a native Claude Code binary, so most installs need no separate Claude Code install.
- A turn is one model output plus execution of its tool calls; the loop ends on a response with no tool calls.
- Message types: `SystemMessage` (init, compact_boundary, ...), `AssistantMessage` (one per content block), `UserMessage` (tool results), optional `StreamEvent`, and a final `ResultMessage` with cost, usage and session ID.
- Built-in tools include Read, Edit, Write, Glob, Grep, Bash, WebSearch, WebFetch, ToolSearch, Agent, Skill, AskUserQuestion and task-tracking tools.
- Read-only tools (and custom tools marked `readOnlyHint`) can run in parallel; state-changing tools run sequentially.
- `max_turns` and `max_budget_usd` default to no limit; hitting them yields `error_max_turns` or `error_max_budget_usd`. The budget can be overshot by up to one response plus running subagents.
- `effort` ranges low/medium/high/xhigh/max and trades reasoning depth for tokens and latency.
- Context accumulates across turns; stable prefixes (system prompt, tools, CLAUDE.md) are prompt-cached; MCP tool schemas are deferred by tool search by default.
- Automatic compaction summarises older history near the limit; persistent rules belong in CLAUDE.md, which is re-injected every request.
- A single-shot `query()` raises after yielding an error result; check `ResultMessage.subtype` before reading `result`.

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)
