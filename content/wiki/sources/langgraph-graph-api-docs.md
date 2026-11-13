---
title: "Source: LangGraph Graph API, Functional API, streaming and subgraph docs"
summary: "Official LangGraph docs on StateGraph state/reducers, Pregel super-steps, edges, Send and Command, recursion limit, the Functional API, stream modes and subgraphs."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langgraph"]
---

- **What:** official open-source documentation (Python)
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14 (pages reference `langgraph` up to 1.2.x)
- **Original:** [Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api), [Functional API](https://docs.langchain.com/oss/python/langgraph/functional-api), [Streaming](https://docs.langchain.com/oss/python/langgraph/streaming), [Subgraphs](https://docs.langchain.com/oss/python/langgraph/use-subgraphs)

## Summary

LangGraph models an application as nodes and edges over a shared, typed state, executed with a Pregel-style message-passing loop in discrete super-steps. The Functional API offers the same runtime (persistence, interrupts, streaming) for plain Python control flow.

## Key claims

- State is a set of channels, one per schema key; schema may be a TypedDict (preferred for speed), dataclass or Pydantic model. Input/output schemas can be narrowed and private channels used.
- Each key has a reducer (`Annotated[type, fn]`); default is overwrite. `add_messages` appends and updates by message ID; `Overwrite` bypasses a reducer to replace or clear a value.
- Execution follows Google's Pregel: nodes that run in parallel share a super-step; the run ends when no node is active and no messages are in transit; checkpoints are taken at super-step boundaries, never mid-node.
- A node is the checkpoint and retry boundary; after an interrupt or retry it restarts from the top, so side effects must be idempotent.
- `add_conditional_edges` routers return a node name, `END`, a list (fan-out) or `Send` objects. Mixing static edges and dynamic routing on one node can run both paths.
- `Send(node, arg)` implements runtime-sized map-reduce; reducers merge worker outputs. `Command(update, goto, graph=Command.PARENT, resume)` combines update and routing.
- `recursion_limit` caps super-steps (default 10,007 from 1.1.4; 10,000 in 1.0.6 to 1.1.3); exceeding raises `GraphRecursionError`. It is a top-level config key.
- `context_schema` + `runtime.context` inject per-run dependencies outside state. Node-level `CachePolicy` caches by input.
- Functional API: `@entrypoint` + `@task`; task results are checkpointed so resume replays the entrypoint but restores finished tasks; side effects and non-determinism belong in tasks; Graph API is the recommended default for new work.
- Stream modes: `values`, `updates`, `messages` (token chunks + metadata), `custom` (via `get_stream_writer`), `checkpoints`, `tasks`, `debug`. Unified `version="v2"` stream parts need 1.1+; `stream_events(version="v3")` arrived in 1.2.
- Subgraphs are added as a node (shared keys) or invoked inside a node (state transformation). Subgraph checkpointer modes: per-invocation (default), per-thread (`checkpointer=True`), stateless (`False`). Per-thread subgraphs cannot be called in parallel. Interrupts propagate to the root from any depth. `get_state(config, subgraphs=True)` only shows subgraphs LangGraph can discover statically, not ones called inside a tool function.

## Feeds

[LangGraph](../concepts/langgraph.md)
