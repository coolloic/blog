---
title: "Source: Apache Lucene BM25Similarity (javadoc and source)"
summary: "Lucene's default BM25 implementation: k1 = 1.2, b = 0.75, an IDF with +1 inside the log, no (k1+1) factor, and a 256-entry length cache."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** library API documentation and source code
- **Author:** Apache Lucene project
- **Date:** javadoc 9.11.0; source on `main` read 2026-11-14
- **Original:** [BM25Similarity javadoc (9.11.0)](https://lucene.apache.org/core/9_11_0/core/org/apache/lucene/search/similarities/BM25Similarity.html) · [BM25Similarity.java](https://github.com/apache/lucene/blob/main/lucene/core/src/java/org/apache/lucene/search/similarities/BM25Similarity.java)

## Summary

The scoring class Lucene (and so Elasticsearch, OpenSearch and Solr) uses for BM25. The class comment cites Robertson et al., "Okapi at TREC-3" (TREC 1994).

## Key claims

- Defaults: k1 = 1.2, b = 0.75, `discountOverlaps` = true (tokens with position increment 0, such as synonyms, are not counted in document length).
- Constructor rejects negative or infinite k1 and b outside [0, 1].
- IDF is computed as log(1 + (N - n + 0.5)/(n + 0.5)), which is never negative.
- The scorer computes weight × tf/(tf + K), where weight = boost × IDF and K = k1 × ((1 - b) + b × dl/avgdl); there is no (k1 + 1) factor, so a term's contribution approaches IDF × boost as tf grows.
- K is precomputed for 256 encoded document lengths, read from a one-byte norm.
- The source rewrites the formula to guarantee scores are monotonic in tf and length under float rounding.

## Feeds

[BM25](../concepts/bm25.md)
