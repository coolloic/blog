---
title: "Source: Work with sessions (Claude Agent SDK docs)"
summary: "How the Claude Agent SDK persists conversations as local JSONL transcripts and how continue, resume and fork work."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "memory"]
---

- **What:** official documentation page, Claude Code docs (Agent SDK section)
- **Author:** Anthropic
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://code.claude.com/docs/en/agent-sdk/sessions](https://code.claude.com/docs/en/agent-sdk/sessions)

## Summary

A session is the accumulated conversation (prompt, tool calls, results, responses), written to disk automatically. The page explains when to use `ClaudeSDKClient` (Python) or `continue: true` (TypeScript) for multi-turn chat, how to capture a session ID and `resume` it, how `fork_session` branches history, and the options for resuming across hosts.

## Key claims

- Sessions persist the conversation, not the filesystem; file checkpointing is a separate feature.
- Continue picks the most recent session in the directory; resume takes a specific ID; fork copies history into a new session ID.
- Transcripts live under `~/.claude/projects/<encoded-cwd>/*.jsonl` and are local to the machine.
- Across hosts: attach a `SessionStore` adapter, move the JSONL file, or skip resume and pass application state into a fresh session.
- The experimental TypeScript V2 session API was removed in TS SDK 0.3.142.
- Forked sessions share the working directory, so file edits made in a fork are real.

## Feeds

- [Claude Agent SDK](../concepts/claude-agent-sdk.md)
