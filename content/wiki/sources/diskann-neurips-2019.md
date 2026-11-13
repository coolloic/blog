---
title: "Source: DiskANN: Fast Accurate Billion-point Nearest Neighbor Search on a Single Node"
summary: "NeurIPS 2019 paper introducing the Vamana graph and an SSD-resident ANN index that serves a billion vectors from one 64 GB machine."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "ann", "papers"]
---

- **What:** research paper, NeurIPS 2019
- **Authors:** Suhas Jayaram Subramanya, Fnu Devvrit, Harsha Vardhan Simhadri, Ravishankar Krishnaswamy, Rohan Kadekodi (Microsoft Research)
- **Date:** 2019
- **Original:** [proceedings.neurips.cc (abstract)](https://proceedings.neurips.cc/paper/2019/hash/09853c7fb1d3f8ee67a61b6bf4a7f8e6-Abstract.html)

## Summary

DiskANN challenges the assumption that ANN indexes must live in RAM. Its Vamana graph is built with a pruning rule controlled by a parameter alpha; alpha > 1 keeps longer-range edges, shrinking the number of hops, which matters because each hop on SSD is a random read. Product-quantized vectors stay in RAM to steer the search, while the graph and full-precision vectors sit on SSD and are used to re-rank.

## Key claims

- Vamana parameters: max out-degree R, search list size L, pruning factor alpha. Build makes two passes, first alpha = 1, then the user alpha.
- HNSW and NSG implicitly use alpha = 1; the tunable alpha gives Vamana a better degree/diameter trade-off and 2 to 3 times fewer hops for SSD serving.
- Billion-scale build: k-means into about 40 overlapping clusters (each point assigned to its 2 nearest), build per-cluster graphs in memory, merge by edge union.
- Layout: PQ codes (e.g. 32 bytes per point) in RAM; each point's full vector plus its neighbor list stored together on SSD, so re-ranking costs no extra reads.
- BeamSearch fetches several frontier nodes per round; widths of 2 to 8 balance latency and throughput.
- SIFT1B on a 64 GB, 16-core machine: over 5,000 queries per second, under 3 ms mean latency, 95%+ 1-recall@1. Comparable-memory IVF/PQ methods plateaued near 50% 1-recall@1.
- In the high-recall regime it serves roughly 5 to 10 times more points per node than in-memory graph indexes.

## Feeds

[ANN indexes](../concepts/ann-indexes.md) · [Vector databases](../concepts/vector-databases.md)
