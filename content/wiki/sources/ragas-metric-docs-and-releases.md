---
title: "Source: Ragas docs: context precision, context recall, faithfulness, and release notes"
summary: "Per-metric Ragas documentation (formulas, collections vs legacy API, non-LLM and ID-based variants) plus the 0.3-0.4 release history."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "ragas"]
---

- **What:** library documentation pages and GitHub/PyPI release notes
- **Publisher:** Ragas (Exploding Gradients), Apache-2.0
- **Date:** metric pages last updated 2025-12-09; latest stable release v0.4.3 (2026-01-13), pre-release v0.4.4rc1 listed on PyPI 2026-11-13; accessed 2026-11-14
- **Original:** [Context Precision](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/), [Context Recall](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/), [Faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/), [Releases](https://github.com/explodinggradients/ragas/releases), [PyPI](https://pypi.org/project/ragas/)

## Summary

How the core Ragas RAG metrics are actually computed, which classes implement them in the current "collections" API, and how the library changed between v0.3.5 and v0.4.3.

## Key claims

- Context Precision@K = sum over ranks of (Precision@k x v_k) divided by the number of relevant chunks in the top K, where v_k is a 0/1 relevance verdict per retrieved chunk. It is rank-sensitive: in the docs' example, an irrelevant chunk at rank 1 drops the score to about 0.5, while at rank 2 it changes little.
- `ContextPrecision(llm=...)` judges each chunk against the `reference` answer; `ContextUtilization` is the reference-free variant that judges against the generated `response`.
- Non-LLM variants: `NonLLMContextPrecisionWithReference` compares retrieved chunks to reference contexts by string similarity (rapidfuzz/Levenshtein); `IDBasedContextPrecision` / `IDBasedContextRecall` compare chunk IDs only.
- Context Recall (`ContextRecall`): split the `reference` into claims; score = claims supported by retrieved context / total reference claims. Requires `user_input`, `retrieved_contexts`, `reference`.
- Faithfulness (`Faithfulness`): split the `response` into claims, check each is inferable from `retrieved_contexts`; score = supported / total. `FaithfulnesswithHHEM` swaps the verifier for Vectara's HHEM-2.1-Open T5 classifier (`device`, `batch_size=10`).
- Metrics are called with `await scorer.ascore(...)` or `scorer.score(...)` and return a result with `.value`; LLMs come from `llm_factory("model", client=...)`.
- The legacy `SingleTurnSample` / `single_turn_ascore` API is deprecated in 0.4 and slated for removal in 1.0.
- v0.3.9 (2025-11) migrated Faithfulness, ContextPrecision etc. to collections, removed `ground_truths` and AnswerSimilarity, and restructured docs around an "experiments-first" approach.
- v0.4.0 (2025-12-03): `BasePrompt` architecture, `instructor.from_provider` with Instructor and LiteLLM adapters, handling of reasoning-model temperature/top_p constraints, migration guide.
- v0.4.1-0.4.3: agent metrics (ToolCallAccuracy, ToolCallF1, TopicAdherence, AgentGoalAccuracy) moved to collections; metric/embedding caching; a `DSPyOptimizer` (MIPROv2) for optimizing metric prompts.
- v0.3.5 added telemetry; v0.3.7 added a guide on aligning LLM-as-judge metrics.

## Feeds

[RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)
