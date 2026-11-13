---
title: "Source: LangSmith evaluation concepts and SDK docs"
summary: "Official LangSmith docs on datasets, examples, splits, versions, experiments, evaluator types, offline vs online evaluation, and the evaluate() SDK call."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langsmith", "evaluation"]
---

- **What:** official product documentation
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14
- **Original:** [Evaluation concepts](https://docs.langchain.com/langsmith/evaluation-concepts), [Evaluate an LLM application](https://docs.langchain.com/langsmith/evaluate-llm-application)

## Summary

LangSmith evaluation runs a target function over a versioned dataset, scores each output with evaluators, and stores the results as an experiment that can be compared side by side with others. The same evaluators can also run online against production traces.

## Key claims

- An example is `inputs` + optional reference outputs (seen only by evaluators) + optional metadata. Splits group examples; datasets version automatically on change and versions can be tagged and pinned in CI.
- An experiment is one application version evaluated on one dataset, capturing outputs, scores and traces per example.
- Evaluator types: code (deterministic), LLM-as-judge (reference-free or reference-based), human (annotation queues, single-run or pairwise), pairwise comparison, and a decision-model judge with typed questions.
- Evaluators return feedback: `key`, `score` or `value`, optional `comment`.
- Offline runs on datasets with references (benchmarking, regression testing, backtesting); online runs on production runs without references, so only reference-free evaluators apply.
- SDK: `Client.create_dataset`, `create_examples` (`langsmith>=0.3.13`), `client.evaluate(target, data=..., evaluators=[...], experiment_prefix=..., max_concurrency=..., metadata=...)`; `aevaluate` for large async jobs. Python evaluators can take `inputs`, `outputs`, `reference_outputs` and return a bool.
- `openevals` is LangChain's open-source package of prebuilt evaluators.

## Feeds

[LangSmith](../concepts/langsmith.md)
