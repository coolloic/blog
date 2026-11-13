---
title: "Source: Qdrant docs: Vectors (multivectors)"
summary: "Qdrant's vector concepts page: native multivector points scored with MaxSim, configuration, and the hard per-point size limit."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases"]
---

- **What:** vendor documentation
- **Author/publisher:** Qdrant
- **Date:** read 2026-11-14 (multivectors available since v1.10.0)
- **Original:** [qdrant.tech/documentation/concepts/vectors](https://qdrant.tech/documentation/concepts/vectors/)

## Summary

Documents how a Qdrant point can hold a matrix of same-sized vectors instead of one vector, used either for several views of one object or for late-interaction token embeddings such as ColBERT.

## Key claims

- Configure a dense vector with `multivector_config` and `comparator: max_sim`; MaxSim is currently the only comparator.
- MaxSim sums, over each query vector, its best similarity to any document vector, and returns one score per point.
- Hard limit: number of sub-vectors x vector size must stay under 1,048,576 (for 4096-dim vectors, at most 255 sub-vectors). Workarounds: pool token vectors, or split a document into several points and aggregate.
- Compressed datatypes (`turbo16`, `turbo8`, `turbo4`) support multivectors.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
