---
title: "Source: OpenSearch docs: Normalization processor"
summary: "OpenSearch search-pipeline processor that normalizes and combines BM25 and vector sub-query scores for hybrid queries."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor documentation
- **Author:** OpenSearch project
- **Date:** read 2026-11-14
- **Original:** [Normalization processor](https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/)

## Summary

Describes the search-phase results processor that makes the `hybrid` query work: it sits between the query and fetch phases and rescales then merges the scores returned by each sub-query (for example a BM25 `match` and a `neural` or k-NN query).

## Key claims

- Introduced in OpenSearch 2.10.
- Normalization techniques: `min_max` (default), `l2`, `z_score`.
- Combination via `arithmetic_mean`, with optional per-clause `weights`; without weights, clauses count equally. `z_score` supports only `arithmetic_mean`.
- Reciprocal rank fusion is documented on a separate page rather than in this processor.

## Feeds

[BM25](../concepts/bm25.md)
