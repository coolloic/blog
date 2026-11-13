---
title: "Source: Subagents in the SDK (Claude Agent SDK docs)"
summary: "Defining, invoking, resuming and capping subagents in the Claude Agent SDK via AgentDefinition and the Agent tool."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/subagents](https://code.claude.com/docs/en/agent-sdk/subagents)

## Summary

Subagents are separate agent instances the main agent spawns through the `Agent` tool. They can be defined programmatically (`agents` option), as markdown files in `.claude/agents/`, or used via the built-in general-purpose agent. The page covers `AgentDefinition` fields, what context a subagent inherits, background vs blocking execution, forks, resumption, and the depth, concurrency and spend caps.

## Key claims

- Benefits: context isolation, parallelism, specialised instructions and tool restrictions.
- `AgentDefinition` fields include description, prompt, tools, disallowedTools, model, skills, mcpServers, maxTurns, effort, background and permissionMode.
- A non-fork subagent starts fresh: it sees its own prompt, the Agent tool's prompt string, project CLAUDE.md and its tools, not the parent's history.
- Only the subagent's final message returns to the parent; harness-tag imitation in that message is neutralised before the parent reads it.
- By default a spawned subagent runs in the background and reports in a later turn unless Claude needs to wait.
- Defaults: nesting depth 3 (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`), 20 concurrent subagents (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`), no spend cap unless `max_budget_usd` is set.
- Opus 5 delegates more readily than earlier models, so the caps matter most there.
- Spawned subagents run in the background by default (`async_launched`); Claude blocks only when it needs the report. A fork (`subagent_type: "fork"`) copies the parent conversation instead of starting fresh.
- For dozens to hundreds of agents, a `Workflow` tool moves orchestration into a script outside the conversation (TS SDK v0.3.149+).

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)
