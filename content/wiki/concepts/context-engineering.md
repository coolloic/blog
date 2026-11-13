---
title: "Context engineering"
summary: "Deciding what goes into an agent's finite context window, and when."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
lastmod: 2026-11-13
tags: ["agents", "context"]
---

**Context engineering** is the practice of controlling what is in an agent's context window at each step: system prompt, tool definitions, conversation history and tool results. The window is finite, and models use information less well as it fills with noise. Managing context is arguably the most important skill in building agents.

## Techniques

- **Load on demand.** Give the agent search and read [tools](tools.md) rather than pre-loading documents. This is how coding agents work in codebases far larger than their window.
- **Keep tool output lean.** Summarise, paginate and truncate. A 50,000-line log dump wastes context.
- **Compact long sessions.** Near the limit, replace the history with a summary that keeps decisions and open threads.
- **Write things down.** Notes in files (plans, progress logs, to-do lists) let an agent recover its state after a reset or compaction.
- **Delegate.** [Subagents](subagents.md) do context-heavy work in a fresh window and return only a summary.

## Related

[Agent loop](agent-loop.md)

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
