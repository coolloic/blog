---
title: "Source: Letta documentation, MemFS, memory and dreaming, platform overview"
summary: "Letta's current docs: git-backed MemFS memory as Markdown files, dreaming subagents, cloud memory size limits, and the product line (Letta Code, Agent SDK, App Server, Cloud)."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory"]
---

- **What:** official framework documentation
- **Publisher:** Letta
- **Date:** undated (read 2026-11-14)
- **Original:** [Overview](https://docs.letta.com/overview) · [MemFS](https://docs.letta.com/letta-code/memfs) · [Memory & dreaming](https://docs.letta.com/letta-code/memory)

## Summary

By late 2026 Letta's docs centre on Letta Code and MemFS rather than the original server with memory blocks. Memory is a git repository of Markdown files owned by the agent; files at the root are loaded into the system prompt each turn, deeper directories load on demand. Background "dreaming" subagents consolidate memory.

## Key claims

- Product surfaces: Letta Code (open-source harness: CLI, web app, GitHub Action), Letta Agent SDK (embedding stateful agents in apps), Letta App Server (self-hostable runtime with channel integrations such as Slack, Telegram, Discord), Letta Cloud (managed), Letta Desktop. Docker self-hosting appears only under deprecated reference pages.
- MemFS: each memory is a Markdown file with YAML frontmatter (`name`, `description`); a memory's label maps to its path (label `persona` becomes `persona.md`). Root files are in-context every turn; directories with their own `MEMORY.md` index stay out of context until needed. Older agents used a `system/` directory for the in-context set.
- Every memory edit is a git commit; cloud agents push to a hosted repository, local-only agents keep the repo on the machine and the user must back it up. Agent-owned skills live under `$MEMORY_DIR/skills`.
- No semantic or vector index by default: agents use file-search and read tools. The optional MemFS Search mod adds keyword search; semantic and hybrid modes need QMD indexing over `$MEMORY_DIR`. Conversation-history search is separate (Letta Cloud: full-text, vector and hybrid; local backends: full-text only).
- Dreaming and memory-doctor subagents work in git worktrees so they update memory concurrently without blocking the main agent. Dreaming triggers after a set number of completed agent steps or on context compaction; an optional review pass costs extra tokens and does not ask for approval.
- Commands: `/init` bootstraps project memory, `/remember` teaches explicitly, `/memory` reviews, `/doctor` audits placement, duplication and system-prompt token usage, `/sleeptime` configures dreaming.
- Cloud memory limits per repository (from the Memory & dreaming page): 5 MiB (Free), 50 MiB (Pro), counted on the latest snapshot of each branch or tag, not history; applies separately to each repository, including shared memory. Bulky data should live outside memory with summaries and links inside.

## Feeds

[Letta](../concepts/letta.md)
