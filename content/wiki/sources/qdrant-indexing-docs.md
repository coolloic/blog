---
title: "Source: Qdrant indexing documentation"
summary: "Qdrant's reference for payload indexes, HNSW parameters, filterable HNSW, the query planner, ACORN, sparse vector indexes and tenant-aware indexing."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases"]
---

- **What:** product documentation
- **Author:** Qdrant
- **Date:** living document; features versioned up to v1.20 (read 2026-11-14)
- **Original:** [qdrant.tech/documentation/concepts/indexing](https://qdrant.tech/documentation/concepts/indexing/)

## Summary

Qdrant combines an HNSW vector index with typed payload indexes. Its distinctive move is filterable HNSW: once a field is indexed, extra graph edges are added per payload value so filtered traversals stay connected. A query planner uses payload-index cardinality estimates to pick between filtered graph search and a full scan over matching points.

## Key claims

- HNSW defaults: `m` 16, `ef_construct` 100; search `ef` defaults to `ef_construct`; configurable per collection or named vector.
- `full_scan_threshold` (default 10,000 KB): if the estimated matching set is smaller, the planner does a full scan instead of graph traversal.
- Filter-aware edges exist only if payload indexes are created before the HNSW index is built; create them right after the collection, before ingest. Otherwise a costly rebuild is needed.
- ACORN (v1.16, released November 2025; enabled per query with the `acorn` search parameter): explores neighbors of neighbors for strict filter combinations or many deleted points, trading speed for accuracy.
- Payload index types: keyword, integer, float, bool, geo, datetime, text (full text), uuid.
- `is_tenant: true` on keyword/uuid fields co-locates a tenant's data on disk.
- Sparse vectors use an exact inverted-index-like structure with dot product only, optionally with an IDF modifier (v1.10) for BM25-style scoring.

## Feeds

[Vector databases](../concepts/vector-databases.md) · [ANN indexes](../concepts/ann-indexes.md)
