---
title: "Source: Langfuse evaluation, experiments and CI/CD documentation"
summary: "Langfuse docs on scores, datasets, run_experiment, managed LLM-as-judge evaluators and the experiment GitHub Action that gates PRs on regressions."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "langfuse"]
---

- **What:** official product documentation (several pages)
- **Publisher:** Langfuse
- **Date:** accessed 2026-11-14; the CI/CD feature was announced 2026-05-25 (Launch Week 5)
- **Original:** [Evaluation overview](https://langfuse.com/docs/evaluation/overview), [Scores](https://langfuse.com/docs/evaluation/scores/overview), [Experiments via SDK](https://langfuse.com/docs/evaluation/experiments/experiments-via-sdk), [LLM-as-a-Judge](https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge), [Experiments in CI/CD](https://langfuse.com/docs/evaluation/experiments/experiments-ci-cd)

## Summary

Langfuse evaluation has two modes: online (scoring live production observations) and offline (running the app over a dataset as an experiment before shipping). Everything produces scores. An SDK experiment runner executes a task over local data or a hosted dataset with item- and run-level evaluators, and a GitHub Action turns a failing threshold into a failed PR check with a results comment.

## Key claims

- Score data types: NUMERIC (float), CATEGORICAL (string from a set), BOOLEAN (0/1), TEXT (1-500 chars; not usable in experiments, LLM-as-judge or analytics). Scores attach to traces, observations, sessions or dataset runs.
- Score sources: LLM-as-judge, code evaluators, manual UI scoring (needs a score config), annotation queues, API/SDK (user feedback, guardrails).
- `run_experiment(name, run_name, description, data, task, evaluators, run_evaluators, max_concurrency, metadata)`; `dataset.run_experiment(...)` for hosted datasets. Each task execution creates a trace; per-item failures are isolated.
- Item evaluators receive `input`, `output`, `expected_output`, `metadata` and return `Evaluation(name, value, comment)`; run-level evaluators receive all item results and compute aggregates (e.g. average accuracy), attached to the dataset run.
- Datasets are versioned; fetching returns the latest unless a version timestamp is passed. autoevals scorers plug in via `create_evaluator_from_autoevals`.
- Managed LLM-as-judge: recommended target is observations (one score per matching observation); trace-level evaluators are deprecated and stop producing results on Langfuse Cloud after the v4 cutover on 16 November 2026. Rules filter by observation and trace fields, with a sampling rate; an "Is Root Observation" filter targets an app's overall input/output. An observation evaluator sees only the matched observation, not children.
- Judge setup: prompt, model (project default or dedicated, via LLM Connections), score type, variable mapping (`{{input}}`, `{{output}}`, `{{ground_truth}}`), test run; saving fails if the model lacks structured output support.
- Each judge run is itself traced in a `langfuse-llm-as-a-judge` environment; retries: initial attempt plus up to four within 120 minutes; non-retryable errors like `insufficient_quota` can pause the evaluator. No RPM limit, so volume is controlled by filters and sampling. Self-hosted default worker concurrency is 5.
- Cost estimate per judged item: about $0.01-$0.10 (vendor FAQ); judges should be calibrated against human labels.
- CI: `langfuse/experiment-action` runs experiment scripts on `pull_request`; a script raises `RegressionError(result, metric, value, threshold)` to fail the job. Inputs include `experiment_path`, `dataset_name`, `dataset_version` (ISO timestamp pin), `should_fail_on_regression` (default true), `should_fail_on_script_error` (default true), `should_comment_on_pr` (default true). Outputs `result_json` and `failed`. Needs `pull-requests: write` for comments.
- The PR comment shows status per script, run-level scores, links to the job and the Langfuse comparison view, and per-item outputs and scores.
- Gating advice: an aggregate threshold can hide a newly failing critical case; prefer a reviewed baseline where no approved passing case may regress, keep aggregate thresholds as an extra check; missing cases, duplicate IDs, task failures and missing evaluator results must fail the gate; never auto-generate the baseline from the candidate. The Action is optional: the same gate runs in pytest or Vitest.

## Feeds

[Langfuse](../concepts/langfuse.md) · [Prompt management](../concepts/prompt-management.md) · [promptfoo](../concepts/promptfoo.md)
