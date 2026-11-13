---
title: "Source: AI Evals: Everything You Need to Know (Husain and Shankar)"
summary: "Hamel Husain and Shreya Shankar's long-form FAQ on evals: error analysis via open and axial coding, agent and multi-step evaluation, synthetic data, CI vs production."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** practitioner FAQ (long blog post), distilled from the authors' AI evals course
- **Authors:** Hamel Husain and Shreya Shankar
- **Date:** 18 September 2026 (modified 21 September 2026; earlier versions published from 2025)
- **Original:** [hamel.dev/blog/posts/evals-faq](https://hamel.dev/blog/posts/evals-faq/)

## Summary

A question-and-answer guide that puts error analysis (reading traces, writing notes, clustering them into a failure taxonomy) at the centre of evaluation work, and derives automated evaluators from the failures found rather than from generic metrics. It has dedicated answers on agents and multi-step pipelines, CI versus production monitoring, eval cadence, and guardrails versus evaluators.

## Key claims

- Error analysis is framed as the most important eval activity. Steps: assemble a dataset of traces, **open coding** (a human writes free-text notes on what went wrong), **axial coding** (group the notes into a failure taxonomy and count each category), then iterate.
- Annotate at least 30 traces personally before leaning on model suggestions; work from a pool of about 100 diverse traces and stop when new traces stop revealing new failure types (**theoretical saturation**).
- A single domain expert (a "benevolent dictator") should own quality judgments in most small and medium organisations.
- Repeat error analysis on 100+ fresh traces each cycle; the cycles the authors have seen run 2 to 4 weeks, with extra re-runs after significant changes and weekly spot reviews of 10-20 traces.
- Synthetic inputs: define dimensions (e.g. issue type, customer mood, prior context), hand-write about 20 tuples, generate tuples then turn each into a natural-language query in a separate prompt. Synthetic data cannot tell you how frequent a failure is in production.
- Prefer binary pass/fail; track gradual progress with several binary sub-checks rather than a Likert scale.
- The authors report spending 60-80% of development time on error analysis and evaluation; a 100% pass rate may mean the evals are too easy.
- Agents: first grade end-to-end task success per task, then run step-level diagnostics (tool choice, parameter extraction, error handling, context retention, efficiency in steps/seconds/tokens, goal checkpoints) on the workflows that fail most.
- Tool calls: check tool name, arguments, result and resulting state as separate checks; verify authorization and preconditions, since a well-formed call can still be the wrong action.
- **Transition failure matrix:** rows are the last successful state, columns the state where the first failure occurred; it shows hotspots (a text-to-SQL example: 12 failures at SQL generation to execution, 2 at tool decision to planning).
- Annotate the **first upstream failure** in a trace; fixing it often removes downstream errors.
- Reduce each failure to the simplest reproducing test; use multi-turn tests only when the failure depends on conversation context; sources include simulated users and "N-1 testing" (replaying real conversation prefixes).
- CI evals: small purpose-built sets (often 100+ examples), mostly deterministic assertions. Production: sample live traces, run reference-free evaluators asynchronously, track confidence intervals. Feed production failures back into CI.
- Eval cadence depends on cost, saturation and business value; cheap checks on every trace, expensive judges on a nightly sample.
- Guardrails run inline, must be fast and deterministic, and target clear high-impact failures; evaluators run after the fact and measure nuanced quality.

## Feeds

[Error analysis](../concepts/error-analysis.md) · [Agent evaluation](../concepts/agent-evaluation.md)
