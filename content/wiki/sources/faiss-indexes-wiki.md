---
title: "Source: Faiss indexes (Faiss wiki)"
summary: "Reference table of Faiss index types with their parameters, bytes per vector and whether search is exhaustive."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "ann"]
---

- **What:** reference documentation page on the Faiss GitHub wiki
- **Author:** Meta FAIR / Faiss maintainers
- **Date:** living document (read 2026-11-14)
- **Original:** [github.com/facebookresearch/faiss/wiki/Faiss-indexes](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes)

## Summary

A cheat sheet of the main Faiss index classes, which are the reference implementations of the index families most vector databases reuse. Its value is the memory column: it makes explicit what each family costs per vector.

## Key claims

- Flat (L2 or inner product): exact, 4*d bytes per vector. Cosine is inner product on normalized vectors.
- HNSWFlat: parameters M, efConstruction, efSearch; memory is the raw vector plus graph links; vectors cannot be removed.
- IVFFlat: `nlist` and query-time `nprobe`; 4*d + 8 bytes (the 8 bytes store the ID).
- Scalar quantizer SQ8: d bytes per vector (4x smaller than float32); SQ4 and fp16 variants exist.
- PQ: M sub-quantizers of `nbits` each, ceil(M*nbits/8) bytes; d must be a multiple of M.
- IVFPQ: PQ code plus 8 bytes, non-exhaustive; typical code sizes are 4 to 64 bytes.
- Suggested `nlist` is about C*sqrt(n) with C around 10.

## Feeds

[ANN indexes](../concepts/ann-indexes.md)
