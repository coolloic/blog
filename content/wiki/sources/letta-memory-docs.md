---
title: "Source: Letta documentation, memory blocks and archival memory"
summary: "Letta's docs on in-context memory blocks (label, description, value, limit, read_only, shared), searchable archival memory and conversation search."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory"]
---

- **What:** official framework documentation (Letta is the company and framework that grew out of MemGPT)
- **Publisher:** Letta
- **Date:** undated (read 2026-11-14)
- **Original:** [Memory overview](https://docs.letta.com/guides/agents/memory) · [Memory blocks](https://docs.letta.com/guides/agents/memory-blocks) · [Archival memory](https://docs.letta.com/guides/agents/archival-memory)

## Summary

Letta organises agent memory as editable **blocks** pinned into the context window, plus an out-of-context **archival** store the agent searches with tools, plus automatic search over past messages. All state (messages, memories, tool calls) is persisted in a database, so evicted messages remain retrievable.

## Key claims

- A block has a `label`, a `description` (what the agent relies on most to decide how to use it), a `value`, a character `limit`, and an optional `read_only` flag.
- Attached blocks are prepended to the prompt in a `<memory_blocks>` section showing description, current/limit character counts and value; they never need retrieval.
- A block can be attached to several agents; one update is visible to all of them (shared memory). Setting `value` replaces the whole block, so concurrent writes are last-write-wins. The docs give no default `limit`.
- Archival memory is semantically searchable, effectively unlimited, taggable, and cannot be pinned in context. Tools: `archival_memory_insert` and `archival_memory_search` (tag filter, pagination).
- Guidance: blocks for always-visible, frequently changing information; archival for documents, logs, reports and history. Archival is curated by the agent; conversation search retrieves what was said automatically.
- Letta's newer docs describe "dreaming": background subagents that review recent conversations and consolidate memory without blocking the active agent. Triggers are off, every N user messages, or on context compaction. Dreaming in Letta Code is distinct from the older, experimental server-side sleep-time agents.

## Feeds

[Agent memory](../concepts/agent-memory.md)
