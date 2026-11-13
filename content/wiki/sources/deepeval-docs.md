---
title: "Source: DeepEval docs (G-Eval, DAG, faithfulness, contextual precision, evaluation flow) and Confident AI pricing"
summary: "Confident AI's DeepEval documentation on how its metrics and test runs work, plus the hosted Confident AI plans."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "deepeval"]
---

- **What:** library documentation, PyPI page and vendor pricing page
- **Publisher:** Confident AI (DeepEval is Apache-2.0)
- **Date:** DeepEval 4.3.4 released 2026-11-11; accessed 2026-11-14
- **Original:** [G-Eval](https://deepeval.com/docs/metrics-llm-evals), [DAG](https://deepeval.com/docs/metrics-dag), [Faithfulness](https://deepeval.com/docs/metrics-faithfulness), [Contextual Precision](https://deepeval.com/docs/metrics-contextual-precision), [Evaluation intro](https://deepeval.com/docs/evaluation-introduction), [PyPI](https://pypi.org/project/deepeval/), [Confident AI pricing](https://www.confident-ai.com/pricing)

## Summary

DeepEval is a pytest-style evaluation framework with 40+ LLM-judged metrics; Confident AI is the optional hosted platform for test-run history, tracing and online evals.

## Key claims

- Test cases: `LLMTestCase` (`input`, `actual_output`, `expected_output`, `retrieval_context`) and `ConversationalTestCase`; `Golden`s hold inputs before the app runs; `Synthesizer` generates goldens from documents; `ConversationSimulator` plays a user for multi-turn tests.
- Runs: `evaluate(test_cases, metrics)` for notebooks/scripts; `assert_test()` inside pytest tests executed with `deepeval test run` for CI; `@observe` tracing attaches metrics to inner components (component-level evals).
- Every metric returns a 0-1 score plus reason; `threshold` (default 0.5) sets pass/fail, `strict_mode` forces binary 0/1, `threshold=None` is score-only, `flaky=True` failures do not block.
- GEval: `name`, `criteria` or `evaluation_steps` (not both), `evaluation_params`, optional `rubric` (non-overlapping 0-10 bands). If steps are omitted they are generated from criteria by CoT; when the provider exposes logprobs the score is a probability-weighted sum per the G-Eval paper, otherwise the raw integer.
- GEval caveats in the docs: non-deterministic; criteria-only runs regenerate steps and vary more, so pin `evaluation_steps`; including irrelevant fields degrades scoring; the score range description is inconsistent across the page.
- DAGMetric: a decision graph of TaskNode, BinaryJudgementNode, NonBinaryJudgementNode and verdicts with fixed scores; the LLM still makes each node decision, but structure and score mapping are explicit. Recommended for rule-like rubrics; GEval can be a leaf.
- Faithfulness: extract claims from `actual_output`, judge each against `retrieval_context`; a claim counts as truthful if it does not contradict the context. Options: `truths_extraction_limit`, `penalize_ambiguous_claims`.
- Eval modes `llm`, `hybrid`, `system_one`: a small "System One" model (Jev) makes per-claim yes/no calls (P(yes) > 0.65 truthful, < 0.35 contradictory) or scores the whole metric; system_one scores are not comparable to LLM-mode scores.
- Contextual Precision is reference-based (needs `expected_output`) and rank-weighted like Ragas's; high recall with low precision means right chunks, poor ranking.
- Confident AI plans (2026-11): Free (2 seats, 5 test runs/week, 1 GB-month spans), Starter $200/month, Team $2,000/month (SSO, SOC 2), Enterprise custom with dedicated on-prem deployment; overage $1 per GB-month.

## Feeds

[RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)
