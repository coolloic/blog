---
title: "Source: Notebook: Concurrency design"
summary: "The owner's tutorial on concurrency trade-offs (security, idempotency, latency, capacity), safe retries with idempotency keys, and a queue-plus-workers reference architecture for agents."
category: source
lastmod: 2026-11-14
tags: ["agents", "concurrency", "notebook"]
---

- **What:** tutorial page in the owner's public Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [concurrency-design](https://coolloic.github.io/Notebook/concurrency-design.html)

## Summary

Frames concurrency as a balance between security, idempotency, latency and infrastructure capacity, then covers sizing (Little's Law), retries, failure isolation and an agent-specific reference architecture: gateway (rate limits, concurrency caps, idempotency) feeding a durable queue that feeds isolated agent workers with scoped tools.

## Key claims

- Retry only idempotent operations on transient errors (timeouts, 503, 429), with exponential backoff, jitter, capped attempts and a deadline; wrap flaky dependencies in a circuit breaker to avoid retry storms.
- An idempotency key that the server deduplicates on is what stops a retried "create payment" from charging twice.
- Three architecture options trade performance against isolation and durability: in-process async with limits, bounded queue plus worker pool, and a distributed durable queue with isolated workers.
- For agents: run long, variable-length work on async queue workers rather than request threads, durable so runs survive restarts; give each run an idempotency key so duplicate triggers do not spawn two expensive runs; cap parallel sub-agents and set token/spend budgets.

## Feeds

[Durable agent execution](../concepts/durable-agent-execution.md)
