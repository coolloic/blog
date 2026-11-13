---
title: "Source: Ragas docs: Available metrics"
summary: "Documentation of the open-source Ragas library's RAG metrics (context precision/recall, faithfulness, response relevancy, noise sensitivity)."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** library documentation
- **Author:** Ragas (Exploding Gradients)
- **Date:** page dated 2025-12-09, read 2026-11-14
- **Original:** [List of available metrics](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/)

## Summary

Catalogue of the metrics in the Ragas library; LLM-based metrics may use one or more LLM calls to produce a score.

## Key claims

- RAG metrics: Context Precision, Context Recall, Context Entities Recall, Noise Sensitivity, Response Relevancy, Faithfulness, plus multimodal variants.
- Faithfulness = claims in the response supported by the retrieved context / total claims, in [0, 1].
- Vectara's HHEM-2.1-Open, a small T5-based classifier, can replace the LLM for the claim-checking step (the docs list it under the legacy metrics API, which "will be deprecated in version 0.4 and removed in version 1.0").

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
