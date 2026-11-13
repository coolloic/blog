---
title: "Source: Mastra docs: Workflows overview"
summary: "Mastra workflows: createStep/createWorkflow with typed schemas, shared state, nested workflows, run statuses, suspend/resume, and crash recovery via storage leases."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript", "workflows"]
---

- **What:** official documentation page
- **Author:** Mastra
- **Date:** read 2026-11-14
- **Original:** [https://mastra.ai/docs/workflows/overview](https://mastra.ai/docs/workflows/overview)

## Summary

Workflows are typed, explicit step graphs: steps are defined with `createStep`, composed with `createWorkflow` and chaining methods, and finalised with `.commit()`. Runs can stream events, suspend for input and be resumed, and are recovered after a crash from persisted state.

## Key claims

- `createStep({ id, inputSchema, outputSchema, execute, stateSchema? })`; schemas accept Standard JSON Schema (Zod, Valibot, ArkType).
- `execute` receives `inputData`, `state`/`setState`, `mastra`, `writer`, `requestContext`, `runId`, `workflowId`.
- Steps can call registered agents and tools; a workflow can itself be a step (`.then(childWorkflow)`); `cloneWorkflow` copies one.
- Run with `createRun()` then `start({ inputData })` or `stream(...)`; `resumeStream(...)` resumes a suspended run or reattaches to a stream.
- Result `status` is one of `success`, `failed`, `suspended`, `tripwire`, `paused`.
- Shared `state` persists across suspend/resume without threading through every schema.
- Recovery: `run.restart()`, `restartAllActiveWorkflowRuns()` on server boot; runs hold a storage lease; restarted steps may run again, so side-effecting steps must be idempotent (keys from `runId`, `workflowId`, step `id`).
- `recovery.workflowConcurrency` defaults to 5 and `recovery.workflowGraceMs` to 2 s.

## Feeds

- [Mastra](../concepts/mastra.md)
