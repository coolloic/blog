---
title: "Source: LangGraph persistence, checkpointers and interrupts docs"
summary: "Official LangGraph docs on threads, checkpoints, StateSnapshot, time travel and forking, durability modes, serializers and encryption, stores, and interrupt()/Command(resume) semantics."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langgraph"]
---

- **What:** official open-source documentation (Python)
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14
- **Original:** [Persistence](https://docs.langchain.com/oss/python/langgraph/persistence), [Checkpointers](https://docs.langchain.com/oss/python/langgraph/checkpointers), [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)

## Summary

LangGraph has two persistence systems: checkpointers (thread-scoped snapshots of graph state at every super-step) and stores (cross-thread key-value memory). Checkpoints power multi-turn memory, human-in-the-loop, time travel and fault tolerance. `interrupt()` pauses a node durably; `Command(resume=...)` resumes it by re-running that node.

## Key claims

- `thread_id` in `configurable` is the checkpointer's primary key and is required. Postgres limits it to under 255 characters.
- `StateSnapshot` fields: `values`, `next`, `config` (`thread_id`, `checkpoint_ns`, `checkpoint_id`), `metadata` (`source`, `writes`, `step`), `created_at`, `parent_config`, `tasks`.
- A `START -> A -> B -> END` graph produces four checkpoints. Pending writes record finished nodes in a super-step so a sibling failure does not re-run them.
- `get_state` / `get_state_history`; replay by invoking with an old `checkpoint_id` re-executes everything after it, including LLM calls; `update_state(..., as_node=...)` writes a new checkpoint (forks), passing through reducers.
- Invocation idioms on an existing thread: new input; `invoke(None)` to retry; `Command(resume=...)` to answer an interrupt.
- Durability modes: `exit` (persist only at end; fastest; nothing recoverable after mid-run crash), `async` (persist while next step runs), `sync` (persist before next step; safest, slowest).
- Default serializer `JsonPlusSerializer` (ormsgpack/JSON); `pickle_fallback=True` for exotic types; `EncryptedSerializer` (AES via `LANGGRAPH_AES_KEY`).
- Savers: `InMemorySaver`, `SqliteSaver` (dev), `PostgresSaver` (production), MongoDB, Cosmos DB; interface methods `put`, `put_writes`, `get_tuple`, `list` (+ async). Checkpoints accumulate and should be pruned.
- `interrupt(value)` needs a checkpointer and a stable `thread_id`; value must be JSON-serialisable; surfaced as `__interrupt__` in `invoke` output. On resume the whole node restarts from its first line.
- Pitfalls: never wrap `interrupt()` in a bare `try/except`; multiple interrupts in a node match resume values by order, so keep them deterministic; code before an interrupt must be idempotent; don't loop `while True` around `interrupt()` in one node. Parallel interrupts are resumed with a dict of interrupt IDs. `interrupt_before` / `interrupt_after` are for debugging, not HITL.

## Feeds

[LangGraph](../concepts/langgraph.md)
