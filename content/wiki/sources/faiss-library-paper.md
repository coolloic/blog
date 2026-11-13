---
title: "Source: The Faiss Library (Douze et al.)"
summary: "Paper describing Faiss's design space for vector search: IVF, product and additive quantization, refinement, graph indexes, filtering and index selection."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "ann", "papers"]
---

- **What:** research/system paper, arXiv:2401.08281
- **Authors:** Matthijs Douze, Alexandr Guzhva, Chengqi Deng, Jeff Johnson, Gergely Szilvasy, Pierre-Emmanuel Mazaré, Maria Lomeli, Lucas Hosseini, Hervé Jégou
- **Date:** first submitted January 2024; v4 dated 23 October 2025
- **Original:** [arxiv.org/abs/2401.08281](https://arxiv.org/abs/2401.08281)

## Summary

The Faiss authors lay out vector search as a trade-off between speed, memory and accuracy (plus build time and I/O in some settings) and explain the building blocks Faiss combines: inverted files for non-exhaustive search, vector codecs from scalar to product to additive quantization, graph indexes, and refinement stages. They also cover filtered search and give guidance on which family suits which scale.

## Key claims

- IVF: a coarse quantizer clusters vectors into `nlist` (K_IVF) lists; search visits the `nprobe` nearest. Distance computations are minimized near K_IVF = sqrt(nprobe * N); empirically K_IVF/sqrt(N) of about 15 to 20 worked.
- IVF search time grows sublinearly, roughly N^0.3 at moderate recall and N^0.45 at recall@1 of 0.99.
- PQ splits a vector into M sub-vectors, each quantized with its own k-means codebook; code size is M * log2(K) bits. Asymmetric distance computation keeps the query uncompressed and uses per-query lookup tables.
- Additive quantizers (residual, LSQ, product-residual) are more accurate per bit but cost more to train and encode.
- Refinement: a fast, inaccurate index returns a shortlist that a more accurate index (or raw vectors, possibly on flash) re-scores.
- HNSW supports incremental adds but not removal; NSG often gives better trade-offs but is frozen after build. Graph performance improved up to about 64 edges per node.
- Non-exhaustive search pays off above about 10k vectors; graphs suit memory-unconstrained sets up to about 1M (build time limits beyond about 10M); IVF with compression is needed for very large sets.
- Filtering: ID-selector callbacks; metadata-first brute force is chosen when the filtered subset is tiny.
- A trillion-vector deployment used PCA to 72 dims plus 6-bit SQ (54 bytes per vector) and about 1 s per query.

## Feeds

[ANN indexes](../concepts/ann-indexes.md) · [Vector databases](../concepts/vector-databases.md)
