---
title: "Source: OpenSearch blog: Improving document retrieval with sparse semantic encoders"
summary: "OpenSearch post introducing neural sparse search (2.11) with BEIR relevance, latency and index-size comparisons against BM25, dense and hybrid."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor engineering blog post
- **Author:** Zhichao Geng, Xinyuan Lu, Dagney Braun, Charlie Yang, Fanit Kolchina (OpenSearch)
- **Date:** circa 2023-12 (updated 2025-07-09)
- **Original:** [Improving document retrieval with sparse semantic encoders](https://opensearch.org/blog/improving-document-retrieval-with-sparse-semantic-encoders/)

## Summary

Presents OpenSearch's neural sparse search: learned sparse token-weight vectors stored in a native Lucene inverted index, in two modes. Bi-encoder mode encodes both queries and documents; document-only mode encodes documents at ingest and merely tokenizes queries, removing model inference from the query path.

## Key claims

- Average nDCG@10 over BEIR plus Amazon ESCI: BM25 0.419, dense TAS-B 0.410, hybrid dense + BM25 0.450, sparse document-only 0.462, sparse bi-encoder 0.492.
- P50 latency on a 1M-document MS MARCO v2 subset: BM25 8 ms, document-only sparse 10.2 ms, dense 56.6 ms, bi-encoder sparse 176.3 ms.
- Index size on 8.8M MS MARCO passages: BM25 1 GB, document-only sparse 6.8 GB, bi-encoder sparse 4.7 GB, dense 65.4 GB.
- Sparse encoders can fall back on keyword matching, so they are rarely worse than BM25, while dense encoders can behave unpredictably out of domain.

## Feeds

[BM25](../concepts/bm25.md)
