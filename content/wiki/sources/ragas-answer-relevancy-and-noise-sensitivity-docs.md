---
title: "Source: Ragas docs: Answer Relevancy and Noise Sensitivity metrics"
summary: "Ragas documentation of the embedding-based Answer Relevancy metric and the Noise Sensitivity error-rate metric."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "ragas"]
---

- **What:** library documentation (two metric pages)
- **Publisher:** Ragas (Exploding Gradients), Apache-2.0
- **Date:** pages last updated 2025-12-09; accessed 2026-11-14
- **Original:** [Answer Relevancy](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/answer_relevance/), [Noise Sensitivity](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/noise_sensitivity/)

## Summary

Answer Relevancy in Ragas works backwards from the answer: generate questions it would answer, then compare them to the real question in embedding space. Noise Sensitivity measures how often the response makes incorrect claims, with retrieved context either relevant or irrelevant.

## Key claims

- Answer Relevancy: an LLM generates N questions from the response (N = `strictness`, default 3); score = mean cosine similarity between each generated question's embedding and the user input's embedding. Needs `user_input`, `response`, an LLM and an embedding model.
- It does not check factual accuracy; it penalises incomplete answers and unnecessary detail. Because cosine similarity spans -1 to 1, scores are usually but not guaranteed to be in [0, 1].
- The legacy `ResponseRelevancy` class is deprecated in 0.4 and slated for removal in 1.0; the collections class is `AnswerRelevancy` with `score()` / `ascore()`.
- Noise Sensitivity: each response claim is checked against the reference and the retrieved context; score = incorrect claims / total claims, lower is better. `mode="relevant"` (default) or `mode="irrelevant"` targets errors induced by relevant or irrelevant retrieved chunks. Needs `user_input`, `reference`, `response`, `retrieved_contexts`.

## Feeds

[RAGAS and DeepEval](../concepts/ragas-and-deepeval.md)
