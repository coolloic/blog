---
title: "Source: BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of IR Models (Thakur et al.)"
summary: "The 18-dataset zero-shot retrieval benchmark that standardised nDCG@10 and showed annotation pools biased toward lexical retrievers under-score dense models."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval", "benchmarks", "papers"]
---

- **What:** research paper, arXiv:2104.08663, NeurIPS 2021 Datasets and Benchmarks Track
- **Authors:** Nandan Thakur, Nils Reimers, Andreas Rücklé, Abhishek Srivastava, Iryna Gurevych
- **Date:** v1 17 April 2021; v4 21 October 2021
- **Original:** [arxiv.org/abs/2104.08663](https://arxiv.org/abs/2104.08663) · code: [github.com/beir-cellar/beir](https://github.com/beir-cellar/beir)

## Summary

Collects 18 public datasets across nine retrieval tasks into one format (corpus, queries, qrels) and evaluates ten lexical, sparse, dense, late-interaction and re-ranking systems zero-shot. Argues for one rank-aware metric that works for binary and graded labels, and studies how annotation pools bias results.

## Key claims

- Metric choice: precision and recall are rank-unaware; MRR and MAP are binary and cannot use graded judgments; nDCG@k handles both, so BEIR reports nDCG@10 for every dataset, computed with the Python interface of the official TREC evaluation tool (pytrec_eval).
- BM25 is a robust zero-shot baseline; re-ranking and late-interaction models score best on average but cost more compute; many models that beat BM25 in-domain lose to it zero-shot.
- **Annotation selection bias:** many datasets were labelled from candidates retrieved by lexical systems, so relevant documents with little lexical overlap were never judged and count as non-relevant.
- On TREC-COVID, the **Hole@10** rate (share of top-10 hits never seen by annotators) was 6.4% for BM25 and 2.8% for docT5query but 14.4% for ANCE and 31.8% for TAS-B, even though the pool came from many systems.
- After the authors judged the holes (980 query-document pairs), ANCE's nDCG@10 rose from 0.654 to 0.735, 6.7 points above BM25 (0.668 after re-judging); docT5query barely moved (0.713 to 0.714).

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)
