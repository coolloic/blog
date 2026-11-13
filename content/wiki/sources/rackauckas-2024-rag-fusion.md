---
title: "Source: Rackauckas 2024: RAG-Fusion"
summary: "Case study (Infineon) of generating several query variants, retrieving for each and merging with reciprocal rank fusion; better coverage, some off-topic drift."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** research paper / industry case study, arXiv:2402.03367 (International Journal on Natural Language Computing, vol. 13 no. 1)
- **Author:** Zackary Rackauckas
- **Date:** 2024-01-31 (v2 2024-02-21)
- **Original:** [RAG-Fusion: a New Take on Retrieval-Augmented Generation](https://arxiv.org/abs/2402.03367)

## Summary

Describes a chatbot for Infineon product information that turns one user question into several LLM-generated queries, retrieves for each, and fuses the ranked lists with reciprocal rank fusion before generation. Evaluation was manual (accuracy, relevance, comprehensiveness), not a benchmark.

## Key claims

- Multiple generated queries approach the question from different angles, giving more comprehensive answers.
- Results from each query are combined with reciprocal rank fusion.
- Failure mode: when generated queries were not relevant enough to the original question, answers drifted off topic.

## Feeds

[Query transformation](../concepts/query-transformation.md)
