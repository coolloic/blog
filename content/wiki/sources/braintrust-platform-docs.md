---
title: "Source: Braintrust platform docs: experiments, scorers, datasets, online scoring, architecture, pricing"
summary: "Braintrust's documentation on comparing experiments, scorer types, versioned datasets, online scoring rules, the control/data-plane split with Brainstore, deployment options, Loop, and plan pricing."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "braintrust"]
---

- **What:** official product documentation and pricing page
- **Publisher:** Braintrust
- **Date:** accessed 2026-11-14
- **Original:** [Run evals in code](https://docs.braintrust.dev/evaluate/run-in-code.md), [Write scorers](https://docs.braintrust.dev/evaluate/write-scorers.md), [Compare experiments](https://docs.braintrust.dev/evaluate/compare-experiments.md), [Datasets](https://docs.braintrust.dev/annotate/datasets/index.md), [Score online](https://docs.braintrust.dev/evaluate/score-online.md), [Architecture](https://docs.braintrust.dev/admin/deployment/architecture.md), [Deployment options](https://docs.braintrust.dev/admin/deployment/index.md), [Loop](https://docs.braintrust.dev/loop/index.md), [Pricing](https://www.braintrust.dev/pricing)

## Summary

Braintrust treats every eval run as an immutable experiment, compares experiments row by row against a baseline, and reuses the same scorers on production logs through sampled online-scoring rules. Data lives in a data plane built on object storage and its own Brainstore database.

## Key claims

- `Eval()` takes `data` (inline or `init_dataset`), `task`, `scores`, `metadata`, an experiment name, `trial_count` (repeat each case and average), `max_concurrency` (unset by default; set it to avoid 429s) and `parameters` (editable in the playground). `bt eval <file>` runs files, `--watch` reruns on change; TypeScript is transpiled, `.env` files auto-load.
- An experiment is an immutable snapshot; playground runs overwrite, experiments persist. Experiments can be created from code, the UI, or CI on every PR.
- Comparison matches rows by `input` by default (custom comparison key such as `input.user_query`, set in project settings, if inputs contain timestamps or IDs); shows per-score deltas, regression/improvement counts, an overall comparison grade (improvement/regression/tradeoff/tie) that also weighs latency, cost, errors and load, and a character-level diff view (4,096 chars per field). Default baseline when none is set: most recent experiment on the same git branch (requires git metadata).
- Scorers return 0-1 and receive `input`, `output`, `expected`, `metadata`, `trace`. Types: autoevals, LLM-as-judge, custom code; classifiers return labels instead of numbers. Span scorers vs trace scorers (whole trace, for agents). Scorers can be inline, pushed from code, or built in the UI.
- Datasets: records of `input` (required), `expected`, `metadata`, `tags`; every change is versioned so experiments can pin a version; built from uploads, SDK, production logs, user feedback, traces or Loop.
- Online scoring: project-level rules with scorers, scope (span, trace after 30 s idle, or group up to 64 traces by a key like session ID), filters (SQL; no `!=`, filters see only data present at `span.end()`), and a sampling rate (docs suggest 1-10% for high volume, 50-100% for low volume/critical). Runs asynchronously, so no added app latency; retries transient failures up to 5 times; no backfill unless you "rewind" a rule, and traces logged while a rule is paused are never scored; per-rule estimated 24h LLM cost shown.
- Architecture: Braintrust-run control plane (UI, auth, metadata) vs data plane (logs, traces, datasets, prompts) whose components are an API service, Postgres (metadata), Redis, object storage (source of truth) and Brainstore (writer, reader and fast-reader nodes over a WAL on object storage). The browser talks to the data plane directly via CORS.
- Deployment: SaaS on all plans; BYOC (data plane in your cloud, operated by Braintrust) on Enterprise; the pricing page lists on-prem or hosted for Enterprise.
- Loop is an in-product agent that investigates logs/experiments and creates prompts, scorers, datasets, dashboards and automations (with approval), and can open GitHub PRs; it bills against model credits.
- Pricing (2026-11-14): Starter $0 (1 GB processed data, 10K scores, 14-day retention, $10 model credits); Pro $249/month (5 GB, 50K scores, 30-day retention, extended retention $0.50/GB/month, $100 model credits); overage $4/GB and $2.50 per 1K scores on Starter, $3/GB and $1.50 per 1K scores on Pro; unlimited users; Enterprise custom (on-prem/hosted, RBAC, BAA, SLA).

## Feeds

[Braintrust](../concepts/braintrust.md)
