---
title: "Source: Inngest docs: how functions are executed, step.waitForEvent and usage limits"
summary: "Inngest's step-memoization execution model (checkpointing vs standard orchestration), event-based waits for approvals, and its published limits on steps, state and run length."
category: source
lastmod: 2026-11-14
tags: ["agents", "durable-execution", "inngest"]
---

- **What:** official product documentation (four pages)
- **Publisher:** Inngest
- **Date:** accessed 2026-11-14
- **Original:** [How functions are executed](https://www.inngest.com/docs/learn/how-functions-are-executed), [step.waitForEvent](https://www.inngest.com/docs/reference/functions/step-wait-for-event), [Usage limits](https://www.inngest.com/docs/usage-limits/inngest), [Retries](https://www.inngest.com/docs/features/inngest-functions/error-retries/retries)

## Summary

An Inngest function is triggered by an event and split into named steps. Each successful step's result is saved; on a retry or later request the SDK re-invokes the handler, returns saved results for completed steps (memoization keyed by a hash of the step ID), and runs only the next or failed step. Waits (`sleep`, `waitForEvent`) pause the run without consuming compute, which makes event-driven approvals cheap.

## Key claims

- TypeScript SDK v4 defaults to "checkpointing" (steps run back to back in one handler invocation, results saved as they go); it falls back to standard orchestration (one HTTP request per step) on retries and parallel steps. Python always uses standard orchestration.
- Default retries: four after the initial attempt, counted per step (each `step.run()` has its own counter, so a failing step does not re-run completed ones).
- Code outside `step.run()` can run again on every replay; put DB/API calls inside steps.
- A step can succeed externally (e.g. a refund) before its result is saved and then be retried, so side-effecting steps should be idempotent.
- `step.waitForEvent(id, {event, timeout, match | if})` resolves to the matching event or `null` on timeout; `match` (dot-path equality) and `if` (CEL) are mutually exclusive. A losing `waitForEvent` in a parallel race is not cancelled and keeps the run "Running" until its timeout.
- Limits (accessed 2026-11-14): 1,000 steps per function; 32 MiB run state; 4 MiB per step output; sleeps up to 1 year; max run length 30 days (Free), 90 (Pro), 366 (Business); event payload 256 KiB (Free) / 3 MiB (paid); step timeout up to 2 hours subject to the host.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md), [Human-in-the-loop](../concepts/human-in-the-loop.md)
