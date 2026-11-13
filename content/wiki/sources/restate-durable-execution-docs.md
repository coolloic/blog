---
title: "Source: Restate docs: durable execution and the human-in-the-loop agent pattern"
summary: "Restate's journal-based durable execution server (single Rust binary, virtual objects, idempotency keys, suspension on FaaS) and its awakeable-based approval pattern for agents."
category: source
lastmod: 2026-11-14
tags: ["agents", "durable-execution", "restate"]
---

- **What:** official product documentation (three pages)
- **Publisher:** Restate
- **Date:** accessed 2026-11-14
- **Original:** [Durable execution](https://docs.restate.dev/concepts/durable_execution), [AI pattern: human-in-the-loop](https://docs.restate.dev/ai/patterns/human-in-the-loop), [Error handling](https://docs.restate.dev/guides/error-handling)

## Summary

Restate is a server that sits in front of your services like a reverse proxy. It journals every step of a handler (service calls, DB updates, timers and their results) and, after a failure, replays the journal to skip completed steps. Services stay stateless: the server ships state and history with each request. For agents, Restate wraps LLM calls and tools in durable `ctx.run` steps and implements approvals with **awakeables**, durable promises a human resolves over HTTP.

## Key claims

- Restate Server is a single Rust binary; clustered deployments commit journal entries by consensus, so a majority of nodes must be available.
- Invocations arrive over HTTP, Kafka or programmatically; if a service stops progressing, the server retries the execution on another instance.
- Virtual Objects have isolated keyed state with a single-writer guarantee; state updates are journaled together with execution steps.
- An idempotency key header deduplicates requests, returning the original result.
- On FaaS (e.g. AWS Lambda) handlers suspend while waiting, so wait time is not billed. Concurrency limits per scope can cap agent spend.
- HITL: `ctx.awakeable()` yields an ID and a promise; the ID is sent to a reviewer inside a durable step; the reviewer resolves it via `POST /restate/awakeables/<id>/resolve`; the invocation suspends until then.
- Timeouts: race the promise against a durable sleep (e.g. 3 hours); Restate persists both the timer and the promise, so after a restart the wait continues with the remaining time. The example falls back to automated evaluation on timeout.
- LLM steps are wrapped with bounded retries (e.g. 3 attempts); the HITL page shows integrations for the Vercel AI SDK (`durableCalls` middleware), OpenAI Agents SDK, Google ADK, Pydantic AI and LangChain.
- Default retry policy: all errors are retried with exponential backoff; with no policy set, retries are unlimited (the page also mentions a bounded default that pauses the invocation, without reconciling the two). Setting max attempts on a `ctx.run` makes it fail with a `TerminalException` once exhausted.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md), [Human-in-the-loop](../concepts/human-in-the-loop.md)
