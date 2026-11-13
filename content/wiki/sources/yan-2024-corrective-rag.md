---
title: "Source: Yan et al. 2024: Corrective Retrieval Augmented Generation (CRAG)"
summary: "Paper adding a lightweight retrieval evaluator that triggers refine, web-search or both depending on confidence."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper, arXiv:2401.15884
- **Author:** Shi-Qi Yan, Jia-Chen Gu, Yun Zhu, Zhen-Hua Ling
- **Date:** 2024-01-29 (v3 2024-10-07)
- **Original:** [arXiv:2401.15884](https://arxiv.org/abs/2401.15884)

## Summary

A plug-in to any RAG pipeline: a small evaluator scores retrieved documents, and the score picks a corrective action before generation.

## Key claims

- Evaluator: T5-large (0.77B) fine-tuned to score query-document relevance in [-1, 1], with per-dataset upper and lower thresholds.
- Correct (some document above the upper threshold): refine internal documents. Incorrect (all below the lower threshold): discard them and use web search. Ambiguous: combine both.
- Decompose-then-recompose: split documents into strips, score each, keep the best and concatenate.
- Web fallback: an LLM rewrites the question into short keyword queries; top 5 search results, preferring Wikipedia, go through the same refinement.
- Gains over standard RAG on PopQA, Biography, PubHealth and ARC-Challenge, e.g. PubHealth 75.6 vs 39.0 with a Self-RAG 7B generator.
- Limitation: depends on a separately fine-tuned evaluator.

## Feeds

[Agentic RAG](../concepts/agentic-rag.md)
