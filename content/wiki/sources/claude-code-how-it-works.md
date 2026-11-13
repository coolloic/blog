---
title: "Source: How Claude Code works (Anthropic docs)"
summary: "Architecture overview of Claude Code: the gather-act-verify loop, built-in tool categories, execution environments, sessions, compaction, checkpoints and permission modes."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding"]
---

- **What:** official product documentation
- **Publisher:** Anthropic
- **Date:** living document, read 2026-11-14
- **Original:** [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works)

## Summary

Describes Claude Code as an agentic harness: the layer around a Claude model that supplies tools and manages the context the model sees. The loop blends three phases (gather context, take action, verify) and the user can interrupt at any point.

## Key claims

- Built-in tools fall into five categories: file operations, search (glob/regex), execution (shell, tests, git), web (search/fetch), and code intelligence (diagnostics, go-to-definition via plugins). Extra tools spawn subagents and ask the user questions.
- Extensions sit on top of the loop: skills (loaded on demand), MCP servers (tool definitions deferred and loaded via tool search), hooks, subagents.
- Execution environments: local machine (default), cloud (Anthropic-managed or self-hosted VMs), and Remote Control (local execution, browser UI). The loop is identical across terminal, IDE, desktop, web, Slack and CI.
- Sessions are saved as JSONL under `~/.claude/projects/`; each new session starts with a fresh context; resume appends, fork copies history to a new ID. Git worktrees enable parallel sessions.
- When context nears the limit the conversation is compacted into a summary; early detailed instructions may be lost, so persistent rules belong in CLAUDE.md. A "Compact Instructions" section steers what survives. Auto-compaction stops with an error if one huge output refills context immediately (thrashing).
- Checkpoints snapshot files before edits; remote side effects (databases, deploys) can't be checkpointed.
- Permission modes cycled with Shift+Tab: Auto (classifier; default for interactive sessions from v2.1.283), Manual, Accept edits, Plan (read-only exploration and proposal).

## Feeds

[Coding agents](../concepts/coding-agents.md)
