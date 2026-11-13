---
title: "Source: Milvus Index Explained (Milvus docs)"
summary: "Milvus 3.0 guide to its index types and how to pick one by memory, recall, top-k and filter ratio, with memory estimates."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases", "ann"]
---

- **What:** product documentation
- **Author:** Milvus project (Zilliz)
- **Date:** v3.0.x docs (read 2026-11-14)
- **Original:** [milvus.io/docs/index-explained.md](https://milvus.io/docs/index-explained.md)

## Summary

Milvus exposes nearly every ANN family (FLAT, IVF variants, HNSW variants, DiskANN, ScaNN, RaBitQ, GPU CAGRA) and frames an index as data structure plus optional quantization plus optional refiner. The page's value is its decision rules and worked memory arithmetic.

## Key claims

- Graph indexes usually beat IVF on QPS and suit low-latency, high-recall, small-top-k search.
- IVF variants suit large top-k and heavy filtering; PQ gives better recall than SQ at similar compression, SQ is faster.
- By filter ratio (share of data excluded): under 85% graph; 85 to 95% IVF; brute-force FLAT above that (prose says over 98%, the decision matrix says over 95%); the page warns these rules are not always correct.
- Raw data in memory: HNSW or IVF with refinement. Raw data on SSD: DiskANN (works when about a quarter of raw data fits in RAM; IOPS can bottleneck). Limited RAM: IVF-PQ/SQ with mmap.
- Memory for 1M 128-dim float32 vectors: IVF-FLAT about 515 MB, IVF-SQ8 about 131 MB, IVF-PQ (8 subquantizers) about 11 MB; HNSW (degree 32) about 640 MB (128 MB of it graph), HNSW_PQ about 136 MB.
- Recall above 99%: FLAT, ideally on GPU.

## Feeds

[ANN indexes](../concepts/ann-indexes.md) · [Vector databases](../concepts/vector-databases.md)
