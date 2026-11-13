---
title: "Source: Cormack, Clarke & Büttcher 2009: Reciprocal Rank Fusion"
summary: "SIGIR 2009 short paper introducing RRF, the score-free rank fusion formula used by most hybrid search engines."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (SIGIR 2009, 2 pages)
- **Author:** Gordon V. Cormack, Charles L. A. Clarke (University of Waterloo), Stefan Büttcher (Google)
- **Date:** 2009-07
- **Original:** [Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)

## Summary

Proposes Reciprocal Rank Fusion as a simple, unsupervised baseline for combining rankings from several retrieval systems, and finds it beats both the individual systems and established fusion methods.

## Key claims

- RRF score of a document = sum over rankings of 1 / (k + rank), where rank is the document's position in each ranking.
- k = 60 was fixed in a pilot study and not tuned afterwards.
- The formula keeps top ranks most important while letting lower ranks still count; k damps the influence of a single outlier system ranking something first.
- RRF almost always improved on the best input ranking and equalled or beat Condorcet Fuse and CombMNZ on TREC runs and LETOR 3.
- It needs only ranks, not scores, so it needs no score normalization or training data.

## Feeds

[Hybrid search](../concepts/hybrid-search.md)
