---
title: "Source: Building durable AI agents (Vercel knowledge base guide)"
summary: "Vercel guide (Oct 2026) on running an AI SDK WorkflowAgent on the Workflow SDK: step boundaries, approval hooks with deadlines, idempotency keys from step IDs, and deployment pinning."
category: source
lastmod: 2026-11-14
tags: ["agents", "durable-execution", "vercel"]
---

- **What:** vendor engineering guide
- **Author / publisher:** Anshuman Bhardwaj, Vercel
- **Date:** 2026-10-15
- **Original:** [Durable AI agents](https://vercel.com/kb/guide/durable-ai-agents)

## Summary

Shows how `WorkflowAgent` connects the AI SDK agent loop to the Workflow SDK so model calls and tool calls are persisted steps. It then covers the production concerns: where to put step boundaries, how to wait days for a reviewer, how to make retried steps safe, and what happens to in-flight runs when you deploy new code.

## Key claims

- Give model calls and external tools separate step boundaries; wrapping the whole loop in one step only saves progress when the loop ends. Pass identifiers between steps, not live clients.
- Approval pattern: create a hook with a unique token, check for token conflicts, race it against a durable `sleep('7d')`; authenticate and authorize the reviewer server-side before calling `resumeHook()`. No process needs to stay up while waiting.
- A step whose result was not recorded may be retried; derive an `Idempotency-Key` from the step ID in `getStepMetadata()` (stable across retries, different across runs). Cross-run deduplication needs a business key or a DB uniqueness constraint.
- Deployment pinning keeps existing runs on the deployment that started them; fixing a bug in in-flight work means cancelling and restarting runs; databases and external APIs must stay backward compatible.
- Example loop budget: `isStepCount(8)`; step inputs/outputs must be serializable.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md), [Human-in-the-loop](../concepts/human-in-the-loop.md)
