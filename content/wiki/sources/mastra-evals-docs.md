---
title: "Source: Mastra docs: Evals (scorers) overview"
summary: "Mastra scorers attached to agents and workflow steps with deterministic trace sampling, stored scores, runEvals, datasets and experiments, and Studio review."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "typescript", "evaluation"]
---

- **What:** official documentation page
- **Author:** Mastra
- **Date:** read 2026-11-14
- **Original:** [https://mastra.ai/docs/evals/overview](https://mastra.ai/docs/evals/overview)

## Summary

Scorers are automated evaluators returning (usually 0-1) scores. They run live on sampled production traffic of agents or workflow steps, offline through `runEvals()`, or against versioned datasets in experiments, with results stored and browsable in Studio.

## Key claims

- Package `@mastra/evals`; prebuilt scorers such as `createAnswerRelevancyScorer` and `createToxicityScorer`; deterministic quick checks in `@mastra/evals/checks` (e.g. `checks.calledTool()`).
- Attach with `scorers: { name: { scorer, sampling: { type: 'ratio', rate } } }` on an agent or on `createStep`.
- Sampling is deterministic per trace ID (falls back to run ID); a `filter` predicate gates eligibility before sampling.
- Scores persist to a `mastra_scorers` table only if storage is configured and the scorer is registered on the `Mastra` instance; otherwise a warning and no persistence.
- Datasets hold versioned test cases; experiments run an agent/workflow over a dataset and keep results for comparison.
- Scoring historical traces requires observability to be configured.

## Feeds

- [Mastra](../concepts/mastra.md)
