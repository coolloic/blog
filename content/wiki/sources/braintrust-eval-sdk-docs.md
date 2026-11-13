---
title: "Source: Braintrust docs: Eval SDK quickstart"
summary: "Braintrust's Eval() abstraction of data, task and scores, producing comparable experiments."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** official product documentation
- **Publisher:** Braintrust
- **Date:** accessed 2026-11-14
- **Original:** [docs.braintrust.dev/start/eval-sdk](https://docs.braintrust.dev/start/eval-sdk)

## Summary

Braintrust is a hosted eval and observability platform. Its SDK defines an eval as three parts: `data` (inputs and expected outputs), `task` (the function under test) and `scores` (scorer functions). Each run is stored as an experiment that can be compared with earlier ones.

## Key claims

- Scorers come from the open-source `autoevals` library (e.g. `ExactMatch`), custom code, or LLM-as-judge.
- `bt eval <file>` runs an eval and links to the stored experiment.
- Experiments record inputs, outputs, scores and metadata and are compared side by side (e.g. before and after a prompt change).
- Datasets can be uploaded (e.g. CSV mapped to input/expected) and versioned; evals can run in CI to catch regressions.

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md)
