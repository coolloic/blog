---
title: "Source: pgvector README"
summary: "Official README of pgvector, the PostgreSQL extension for vector similarity search: types, operators, HNSW and IVFFlat indexes, iterative scans and filtering."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases", "postgres"]
---

- **What:** project README (reference documentation)
- **Author:** pgvector maintainers (Andrew Kane and contributors)
- **Date:** latest version mentioned is 0.8.7 (read 2026-11-14)
- **Original:** [github.com/pgvector/pgvector](https://github.com/pgvector/pgvector)

## Summary

pgvector adds vector types, distance operators and two approximate index types to Postgres 13+. The README is the authoritative reference for limits and tuning knobs, and it is unusually candid about how approximate indexes interact with SQL `WHERE` clauses.

## Key claims

- Types: `vector` (float32, up to 16,000 dims stored, 2,000 indexable), `halfvec` (float16, 4,000 indexable), `bit` (64,000 indexable), `sparsevec` (up to 1,000 non-zeros indexable, HNSW only).
- Operators: `<->` L2, `<#>` negative inner product, `<=>` cosine distance, `<+>` L1, `<~>` Hamming, `<%>` Jaccard.
- HNSW: build params `m` (default 16) and `ef_construction` (default 64); query param `hnsw.ef_search` (default 40). Better speed/recall than IVFFlat but slower build and more memory; can be created on an empty table.
- IVFFlat: `lists` at build, `ivfflat.probes` (default 1) at query. Build after data is loaded. Suggested `lists` = rows/1000 up to 1M rows, sqrt(rows) beyond; start `probes` at sqrt(lists).
- Filtering is applied after the index scan: with `ef_search` 40 and a filter matching 10% of rows, about 4 rows come back on average.
- Iterative index scans (0.8.0+): `hnsw.iterative_scan` = `strict_order` or `relaxed_order`, bounded by `hnsw.max_scan_tuples` (default 20,000).
- For selective filters use a B-tree on the filter column; partial indexes for a few filter values; partitioning for many values or multitenancy.
- HNSW build is much faster when the graph fits in `maintenance_work_mem`; parallel builds use `max_parallel_maintenance_workers`.
- Binary quantization via `binary_quantize()` expression index plus Hamming search, then re-rank by full vectors; `halfvec` expression indexes shrink indexes.

## Feeds

[Vector databases](../concepts/vector-databases.md) · [ANN indexes](../concepts/ann-indexes.md)
