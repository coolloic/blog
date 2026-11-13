---
title: "Source: Elasticsearch docs: Reciprocal rank fusion retriever"
summary: "Elasticsearch reference for the RRF retriever that fuses BM25 and kNN results by rank."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor documentation
- **Author:** Elastic
- **Date:** read 2026-11-14
- **Original:** [Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

## Summary

Documents the `rrf` retriever, which takes two or more child retrievers (for example a `standard` BM25 query and a `knn` query) and combines them with reciprocal rank fusion.

## Key claims

- Score per document is the sum of 1 / (rank_constant + rank) across child retrievers.
- `rank_constant` defaults to 60; higher values give lower-ranked documents more influence.
- `rank_window_size` sets how many results each child returns before fusion; larger is more accurate and slower.
- Scroll, sort and rescore are unsupported; pagination past `rank_window_size` returns nothing.

## Feeds

[Hybrid search](../concepts/hybrid-search.md)
