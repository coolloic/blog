---
title: "Source: Notebook experiment 25: Memory Agent"
summary: "Runnable scaffold showing thread-scoped short-term memory: a LangGraph ReAct agent with a MemorySaver checkpointer recalls an earlier turn on the same thread_id."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/25-memory-agent](https://github.com/coolloic/Notebook/tree/main/experiments/25-memory-agent)

## Summary

A LangGraph `create_react_agent` on a Claude model with an in-memory `MemorySaver` checkpointer. Two invocations share `thread_id` "user-1": the first states a hobby, the second asks for it and the agent answers from the persisted thread.

## Key claims

- Short-term memory here is the message thread, persisted per `thread_id` by a checkpointer; reusing the id restores history.
- Long-term memory would need a separate cross-session store keyed by user, which this experiment does not implement.
- Suited to multi-turn assistants where earlier context must carry forward.

## Feeds

[Agent memory](../concepts/agent-memory.md)
