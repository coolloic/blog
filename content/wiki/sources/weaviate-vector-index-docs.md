---
title: "Source: Weaviate vector indexing, filtering and quantization docs"
summary: "Weaviate's concept docs on its HNSW, flat, dynamic and HFresh indexes, its ACORN filtering strategy, and PQ, BQ, SQ and RQ compression."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases", "ann"]
---

- **What:** product documentation (three concept pages)
- **Author:** Weaviate
- **Date:** living documents, features up to v1.40 (read 2026-11-14)
- **Original:** [vector index](https://docs.weaviate.io/weaviate/concepts/vector-index) · [filtering](https://docs.weaviate.io/weaviate/concepts/filtering) · [vector quantization](https://docs.weaviate.io/weaviate/concepts/vector-quantization)

## Summary

Weaviate defaults to HNSW, offers a flat index for small or per-tenant data, a dynamic index that starts flat and switches to HNSW, and the disk-based HFresh index (technical preview in v1.36, generally available in v1.38). Filters are pre-computed as an allow-list from an inverted index, then applied during graph traversal with the ACORN strategy, falling back to brute force when the filter is very restrictive. Four compression schemes trade memory for recall, usually with rescoring.

## Key claims

- Dynamic `ef` (`ef = -1`) sizes the search list from the query limit, bounded by `dynamicEfMin`, `dynamicEfMax`, `dynamicEfFactor`.
- Dynamic index switches flat to HNSW at 10,000 objects by default, one way only; useful for multi-tenancy where most tenants stay small.
- Filtering builds an allow-list first; ACORN has been the default strategy since v1.34 and is much faster for restrictive filters weakly correlated with the query. Very restrictive filters (around 15% of the data) switch to flat search over matches.
- PQ: segments replaced by centroid IDs (256 per segment by default), needs 10k to 100k training records per shard, about 24x compression in the example.
- BQ: 1 bit per dimension, 32x, model-dependent quality. SQ: 8-bit, 4x, trained. RQ: random rotation then quantization, no training; 8-bit about 4x with 98 to 99% recall (HNSW v1.32, flat v1.35); 4-bit about 8x with about 94 to 95% recall before rescoring on 1536-dim data (v1.40, HNSW only); 1-bit close to 32x at high dimension, roughly matching BQ recall (HNSW v1.33).
- HFresh (SPFresh-inspired): a compact in-memory centroid index selects posting lists stored on disk; suited to workloads tolerating latencies in the hundreds of milliseconds. Source: [Weaviate 1.36 release](https://weaviate.io/blog/weaviate-1-36-release), [1.38 release](https://weaviate.io/blog/weaviate-1-38-release).
- SQ, BQ and RQ over-fetch (`rescoreLimit`) and rescore with uncompressed vectors.

## Feeds

[Vector databases](../concepts/vector-databases.md) · [ANN indexes](../concepts/ann-indexes.md)
