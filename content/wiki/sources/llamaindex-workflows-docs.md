---
title: "Source: LlamaIndex Workflows documentation"
summary: "Docs for LlamaIndex Workflows: event-driven async steps, Context state store, human-in-the-loop events, and snapshot/restore for durable runs."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents"]
---

- **What:** the Workflows section of the LlamaIndex / LlamaAgents docs: Introduction, Managing State, Human in the Loop, Durable Workflows
- **Publisher:** LlamaIndex (run-llama)
- **Date:** living docs, read 2026-11-14 (the standalone `llama-index-workflows` package lives in the run-llama/workflows-py repo; its latest release was `llama-index-workflows` 2.26.1 on 2026-10-21, and the repo's latest `llama-agents` release was v0.12.8 on 2026-10-23)
- **Original:** [developers.llamaindex.ai/python/llamaagents/workflows](https://developers.llamaindex.ai/python/llamaagents/workflows/)

## Summary

A Workflow is a class of `@step` methods. Each step accepts one event type and returns another; the returned event's type decides which step runs next. `StartEvent` and `StopEvent` are built in; events are Pydantic models. Branches are `if` statements returning different event types, loops are steps that emit an event an earlier step handles, and fan-out is a step returning `list[Event]` paired with a collecting step. The docs position this against earlier DAG-based pipelines, where loops and optional parameters had to be encoded in edges. Workflows are async-first and ship inside `llama-index-core` (as `llama_index.core.workflow`) or standalone (`pip install llama-index-workflows`).

## Key claims

- Step input/output types are inferred from type annotations by the `@step` decorator; before a run, the workflow validates the event graph (start/stop events exist, produced events have consumers, consumed events have producers), and `workflow.validate()` runs the check directly.
- `run()` returns an awaitable `WorkflowHandler`; keep it to stream events while running. Workflows accept a `timeout` (seconds).
- Each run has a `Context` with a state store (`ctx.store.get/set`); `edit_state()` gives an atomic read-modify-write lock for concurrent steps. State can be a typed Pydantic model (all fields need defaults). Heavy clients belong in "resources", not state, because state must be serializable.
- Reusing the same `Context` across `.run()` calls carries state between runs.
- Human-in-the-loop: a step returns `InputRequiredEvent`; another consumes `HumanResponseEvent`; the caller streams events and sends the reply back. In web apps, snapshot the context, cancel the handler, and restore when the answer arrives.
- `ctx.wait_for_event()` is an alternative, but it replays all code before the wait each time, so that code must be idempotent; the docs recommend the separate-steps pattern instead.
- Workflows are ephemeral by default. Durability is manual: serialize the context (e.g. on `StepStateChanged` internal events) and rebuild it with `Context.from_dict()`; pending events are re-dispatched and a step that was mid-execution reruns from the top. Resume is at-least-once, so step side effects must be safe to repeat. There is no built-in checkpointer, and a crash loses work since the last snapshot; the optional DBOS runtime plugin instead journals step transitions to a database so a crashed workflow can resume without a hand-written checkpoint loop.

## Feeds

[LlamaIndex](../concepts/llamaindex.md)
