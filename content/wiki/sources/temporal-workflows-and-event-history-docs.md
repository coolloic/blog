---
title: "Source: Temporal docs: Workflow definitions, Event History, Activities and retry policies"
summary: "Official Temporal docs on deterministic Workflow replay against an append-only Event History, history limits, Continue-As-New, Activities, idempotency and default retry policies."
category: source
lastmod: 2026-11-14
tags: ["agents", "durable-execution", "temporal"]
---

- **What:** official product documentation (several pages read together)
- **Publisher:** Temporal Technologies
- **Date:** accessed 2026-11-14
- **Original:** [Workflow definition](https://docs.temporal.io/workflow-definition), [Events and Event History](https://docs.temporal.io/workflow-execution/event), [Activities](https://docs.temporal.io/activities), [Retry policies](https://docs.temporal.io/encyclopedia/retry-policies), [Temporal Cloud limits](https://docs.temporal.io/cloud/limits)

## Summary

Temporal splits an application into **Workflows** (deterministic orchestration code) and **Activities** (ordinary functions that do I/O). The Temporal Service persists every Workflow's progress as an append-only **Event History**. After a crash a Worker re-runs the Workflow code and matches each Command it emits against the recorded Events, so completed Activities are not executed again. Because of this, Workflow code must be deterministic and versioned with care. Activities retry automatically and should be idempotent.

## Key claims

- Event History is append-only, durably stored by the service, and doubles as an audit log.
- Replay: re-executed Workflow code emits Commands that are compared position-by-position with recorded Events; a mismatch fails the execution with a non-determinism error.
- Workflow code must not read the local clock, random numbers, or do network/DB/LLM I/O directly; use SDK replay-safe APIs and put external interaction in Activities.
- Adding, removing or reordering Command-producing calls (Activities, timers, child workflows, signals to external workflows, completion) without versioning is unsafe; changing arguments or timer durations is generally safe.
- Recommended versioning: Worker Versioning (pin executions to code revisions); alternative: patching (`Patched` / `GetVersion`).
- History limits: warning at 10,240 Events (Cloud limits page: or 10 MB); termination above 51,200 Events, 2,000 Updates or 10,000 Signals. The Cloud limits page adds a 50 MB history size cap and at most 10 in-flight Updates. No time limit on a Workflow's lifetime; use **Continue-As-New** to start a fresh execution and stay under the limits.
- Activities may be non-deterministic; Temporal recommends making them idempotent so retries cause no duplicate side effects. Each retry starts fresh unless the Activity heartbeats progress details, which are passed to the next attempt.
- Default Activity retry policy: initial interval 1 s, backoff coefficient 2.0, maximum interval 100 × initial (100 s), unlimited attempts, no non-retryable errors. Workflows do not retry by default.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md)
