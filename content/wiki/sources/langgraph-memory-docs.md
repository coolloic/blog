---
title: "Source: LangGraph memory documentation"
summary: "LangGraph's concept and how-to docs on thread-scoped short-term memory (checkpointers) and cross-thread long-term memory (namespaced stores), memory types, and history trimming and summarisation."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "frameworks"]
---

- **What:** official framework documentation
- **Publisher:** LangChain
- **Date:** undated (read 2026-11-14)
- **Original:** [Memory overview](https://docs.langchain.com/oss/python/langgraph/memory) · [Add and manage memory](https://docs.langchain.com/oss/python/langgraph/add-memory)

## Summary

LangGraph separates short-term memory (the graph state of one thread, persisted by a checkpointer) from long-term memory (JSON documents in a store, organised by namespace and key, shared across threads). The concept page maps long-term memory onto semantic, episodic and procedural types and compares writing memories in the hot path with writing them in the background.

## Key claims

- Checkpointers: `InMemorySaver` for development; Postgres, Redis, MongoDB and Oracle savers for production. Threads are selected with `{"configurable": {"thread_id": ...}}`; `delete_thread` removes one.
- Stores: `put(namespace, key, value)`, `get`, and `search(namespace, query=..., filter=..., limit=...)`; semantic search is enabled with an `index` config (embedding function and `dims`). `InMemoryStore` is for development only.
- Semantic memory can be a single **profile** document (regenerated or patched each update, error-prone as it grows) or a **collection** of small documents (better recall, harder updates and deletes, search matters more).
- Episodic memory is usually implemented as few-shot examples of past actions; procedural memory as an agent rewriting its own instructions held in the store.
- Hot-path writes are immediately available but add latency and split the agent's attention; background writes avoid that but need a trigger and frequency.
- Short-term management: `trim_messages` (strategy, `max_tokens`, `start_on`, `end_on`) trims model input without changing state; `RemoveMessage` and `REMOVE_ALL_MESSAGES` delete from state; LangMem's `SummarizationNode` keeps a running summary once a token threshold is passed.
- Long histories can exceed the window, and even when they fit they distract the model and add latency and cost.

## Feeds

[Agent memory](../concepts/agent-memory.md)
