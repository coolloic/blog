---
title: "Source: SWE-bench evaluation harness documentation"
summary: "Official guide to the Docker-based SWE-bench harness that applies model patches and runs FAIL_TO_PASS and PASS_TO_PASS tests."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "coding"]
---

- **What:** official benchmark documentation, plus the grading definitions in the SWE-bench paper's appendix
- **Publisher:** SWE-bench maintainers (Princeton / Stanford)
- **Date:** accessed 2026-11-14
- **Original:** [Evaluation guide](https://www.swebench.com/SWE-bench/guides/evaluation/) · [paper appendix (HTML)](https://arxiv.org/html/2310.06770v3)

## Summary

The harness turns a coding-agent benchmark into a reproducible, outcome-only check: each prediction is a patch, applied inside a per-instance Docker container, then graded by running the repository's tests.

## Key claims

- Predictions are JSONL with `instance_id`, `model_name_or_path`, `model_patch` (a diff string).
- Run with `python -m swebench.harness.run_evaluation --dataset_name ... --predictions_path ... --max_workers N --run_id ID`; `--cache_level` (none, base, env, instance) trades disk for rebuild time; `--instance_ids` evaluates a subset.
- Results are cached by `run_id` and `instance_id`: re-running with a changed patch under the same `run_id` silently reuses the old result.
- Per-instance outputs: `report.json`, `test_output.txt`, `run_instance.log`, `eval.sh`, `patch.diff`. Instances with no `report.json` errored (patch failed to apply, container failed, timeout).
- Cloud execution via Modal (`--modal true`) or `sb-cli` submission.
- From the paper: an instance is resolved only if the patch applies and all **FAIL_TO_PASS** tests (fail before the reference fix, pass after) and **PASS_TO_PASS** tests (pass before and after; median 51 per instance) pass. A patch that fails to apply scores 0.
- Task construction ran tests before and after the PR's fix, kept only candidates with at least one fail-to-pass test and no installation or runtime errors; about 90,000 PRs were filtered to 2,294 task instances.

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
