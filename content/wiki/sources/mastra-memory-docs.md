---
title: "Source: Mastra docs: Memory overview"
summary: "Mastra memory: message history, working memory, semantic recall and Observational Memory, scoped by resource and thread, backed by a storage adapter."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript", "memory"]
---

- **What:** official documentation page
- **Author:** Mastra
- **Date:** read 2026-11-14
- **Original:** [https://mastra.ai/docs/memory/overview](https://mastra.ai/docs/memory/overview)

## Summary

Mastra's `Memory` combines four mechanisms behind one object attached to an agent, scoped by a `resource` (user/entity) and a `thread` (conversation). It requires a storage provider, and optionally a vector store and embedder for retrieval.

## Key claims

- Message history: last N messages (`lastMessages`).
- Working memory: persistent structured data about user/task, injected as a system message (or a state signal).
- Semantic recall: vector-retrieved past messages; same-thread hits are interleaved by timestamp, cross-thread hits go into a system message.
- Observational Memory (`observationalMemory: true`): background agents compress older messages into observations and reflections; only unobserved messages remain verbatim; an optional `recall` tool (`retrieval: true`).
- Default scopes: working memory and semantic recall are resource-scoped (shared across a user's threads); Observational Memory is thread-scoped.
- A thread's owner `resourceId` cannot change; reusing a thread ID across owners causes errors.
- Subagents get a fresh thread per delegation and resource `{parentResourceId}-{agentName}`.
- Observational Memory silently turns off on unsupported storage adapters; its mutex is per process, so multi-process deployments need a shared PubSub with leases; with async buffering call `await memory.settled()` before shutdown.

## Feeds

- [Mastra](../concepts/mastra.md)
