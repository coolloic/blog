---
title: "Source: DeepEval docs: Answer Relevancy and Contextual Recall metrics"
summary: "DeepEval's documentation of how AnswerRelevancyMetric and ContextualRecallMetric are computed, their parameters, eval modes and caveats."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "deepeval"]
---

- **What:** library documentation (two metric pages)
- **Publisher:** Confident AI (DeepEval, Apache-2.0)
- **Date:** accessed 2026-11-14
- **Original:** [Answer Relevancy](https://deepeval.com/docs/metrics-answer-relevancy), [Contextual Recall](https://deepeval.com/docs/metrics-contextual-recall)

## Summary

Both metrics follow DeepEval's usual pattern: an LLM judge extracts statements, classifies each one, and the score is a ratio. Answer Relevancy grades the generator without a reference; Contextual Recall grades the retriever against a reference answer.

## Key claims

- Answer Relevancy: the judge extracts statements from `actual_output`, labels each relevant or irrelevant to `input`; score = relevant / total. Needs only `input` and `actual_output`.
- In `hybrid` mode the small "Jev" System One model makes the per-statement yes/no calls (above 0.65 relevant, below 0.35 irrelevant), with LLM fallback on failure; in `system_one` mode Jev scores the whole metric from a weighted mean of three questions and reports `metric.confidence`, with no LLM call.
- The docs warn that Answer Relevancy is not a factuality check, ignores retrieval context, and penalises preamble, caveats and tangents even when the core answer is right; scores from different eval modes should not be compared.
- Contextual Recall = statements in `expected_output` attributable to `retrieval_context` / total statements; it uses the reference answer because it grades the retriever. Required fields: `input`, `actual_output`, `expected_output`, `retrieval_context`. In `hybrid` mode the expected output is split into sentences in code and Jev answers a yes/no attributability question per sentence, with P(yes) of 0.5 or higher counting as attributable (a different cut-off from Answer Relevancy's 0.65/0.35).
- Shared parameters: `threshold` (default 0.5, `None` for score-only), `model` (OpenAI name or custom `DeepEvalBaseLLM`), `include_reason`, `strict_mode` (binary, threshold 1), `async_mode` (Python only), `verbose_mode`, `evaluation_template` (override prompts), `flaky`, `system_one_model`, `eval_mode`.
- Python exposes ten optional parameters and TypeScript seven (TypeScript lacks `async_mode`, among others).

## Feeds

[RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)
