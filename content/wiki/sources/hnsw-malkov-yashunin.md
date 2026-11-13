---
title: "Source: Efficient and robust ANN search using Hierarchical Navigable Small World graphs (Malkov & Yashunin)"
summary: "The HNSW paper: a multi-layer proximity graph with exponentially distributed levels, a diversity-based neighbor heuristic and logarithmic search scaling."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "ann", "papers"]
---

- **What:** research paper, arXiv:1603.09320 (later IEEE TPAMI)
- **Authors:** Yu. A. Malkov, D. A. Yashunin
- **Date:** first submitted 30 March 2016; v4 revised 14 August 2018
- **Original:** [arxiv.org/abs/1603.09320](https://arxiv.org/abs/1603.09320)

## Summary

HNSW builds a hierarchy of proximity graphs over nested subsets of the data. Each element gets a random maximum layer drawn from an exponentially decaying distribution, so upper layers are sparse "express lanes" and layer 0 holds everything. Search greedily descends from the top layer, then runs a wider best-first search at the bottom. The structure is likened to a probabilistic skip list. A neighbor-selection heuristic that favours diverse directions helps on clustered data and at high recall.

## Key claims

- Level of a new element: floor(-ln(U) * mL); the recommended mL is 1/ln(M).
- Parameters: M (links per element per layer), Mmax0 (links on layer 0, recommended 2*M), efConstruction (candidate list size during insert), ef (candidate list size at query time).
- A reasonable range for M is 5 to 48: smaller M suits low recall or low-dimensional data, larger M suits high recall or high-dimensional data. Memory grows with M.
- efConstruction should be large enough that construction-time recall is close to 1 (around 0.95 suffices for most uses).
- Setting Mmax0 = M causes a strong performance penalty at high recall.
- Index memory excluding the vectors is typically about 60 to 450 bytes per element.
- Search complexity scales logarithmically; reported to strongly outperform prior open-source vector-only methods, especially at high recall and on clustered data.

## Feeds

[ANN indexes](../concepts/ann-indexes.md) · [Vector databases](../concepts/vector-databases.md)
