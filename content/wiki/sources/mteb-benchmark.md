---
title: "Source: MTEB: Massive Text Embedding Benchmark (Muennighoff et al.)"
summary: "The paper that defined the standard benchmark for text embedding models and showed no single model wins every task."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "benchmarks", "papers"]
---

- **What:** research paper, arXiv:2210.07316 (EACL 2023)
- **Authors:** Niklas Muennighoff, Nouamane Tazi, Loïc Magne, Nils Reimers
- **Date:** submitted 13 October 2022; v3 revised 19 March 2023
- **Original:** [arxiv.org/abs/2210.07316](https://arxiv.org/abs/2210.07316) · leaderboard: [huggingface.co/spaces/mteb/leaderboard](https://huggingface.co/spaces/mteb/leaderboard)

## Summary

MTEB gathered 58 datasets spanning 8 embedding task types and 112 languages, and benchmarked 33 models on them. Its central finding is that embedding quality is task-dependent: a model that ranks first on one task type need not do so on others. It became the de facto leaderboard for choosing embedding models.

## Key claims

- 8 task types (including clustering, reranking and retrieval), 58 datasets, 112 languages.
- 33 models evaluated; no method dominates across all tasks.
- The field had not converged on a universal text embedding method.

## Feeds

[Embeddings](../concepts/embeddings.md)
