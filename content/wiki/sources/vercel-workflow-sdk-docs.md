---
title: "Source: Workflow SDK docs: workflows, steps, hooks and webhooks (Vercel)"
summary: "Docs for Vercel's Workflow SDK: \"use workflow\" / \"use step\" directives, event-log replay, default step retries, and hooks/webhooks for human-in-the-loop suspension."
category: source
lastmod: 2026-11-14
tags: ["agents", "durable-execution", "vercel"]
---

- **What:** official open-source SDK documentation
- **Publisher:** Vercel (workflow-sdk.dev, formerly useworkflow.dev)
- **Date:** accessed 2026-11-14
- **Original:** [Workflows and steps](https://workflow-sdk.dev/docs/foundations/workflows-and-steps), [Hooks and webhooks](https://workflow-sdk.dev/docs/foundations/hooks)

## Summary

A `"use workflow"` function orchestrates `"use step"` functions using normal TypeScript control flow. Workflow functions run in a restricted sandbox and are replayed from an event log, so they must be deterministic; steps have full Node.js access, retry automatically and persist their results. Workflows suspend at no compute cost on steps, `sleep()`, hooks or webhooks, which is the basis for long approval waits.

## Key claims

- Step results go to an event log; the workflow function re-runs several times and the log fast-forwards it. `Math.random` and `Date` return fixed, replay-stable values inside workflows, so secrets and unguessable tokens must be generated in a step.
- Outside a workflow `"use step"` is a no-op: no retries, no observability.
- Steps get up to 3 retry attempts by default, then the error propagates to the workflow.
- Arguments pass by value; a step mutating its input is invisible to the workflow, so return new data.
- `createHook()` suspends until `resumeHook(token, payload)` is called from external code; custom tokens (e.g. `approval:${documentId}`) route decisions to a run; `defineHook({schema})` validates payloads; hooks are async-iterable for multiple events; race a hook against `sleep()` for a deadline.
- `createWebhook()` exposes a URL that resumes the workflow with the serialized HTTP request (default response 202).
- Security: a token identifies a hook but does not authenticate the caller; the app must authorize the approver (e.g. compare an `approverId` in hook metadata to the signed-in user) and verify webhook signatures.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md), [Human-in-the-loop](../concepts/human-in-the-loop.md)
