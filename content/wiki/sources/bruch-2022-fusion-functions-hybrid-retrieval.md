---
title: "Source: Bruch, Gai & Ingber 2022: An Analysis of Fusion Functions for Hybrid Retrieval"
summary: "Paper finding that a tuned convex combination of lexical and semantic scores beats RRF, and that RRF is parameter-sensitive."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (ACM TOIS), arXiv:2210.11934
- **Author:** Sebastian Bruch, Siyu Gai, Amir Ingber (Pinecone)
- **Date:** 2022-10-21 (v2 2023-05-04)
- **Original:** [arXiv:2210.11934](https://arxiv.org/abs/2210.11934)

## Summary

Compares ways of fusing lexical (BM25) and dense retrieval scores, focusing on convex combination of normalized scores versus Reciprocal Rank Fusion.

## Key claims

- A convex combination (CC) of lexical and semantic scores outperforms RRF both in-domain and out-of-domain.
- RRF is sensitive to its parameters, contrary to earlier assumptions.
- The choice of score normalization has little effect on learning CC.
- CC has one parameter and can be tuned with a small set of labelled examples from the target domain.

## Feeds

[Hybrid search](../concepts/hybrid-search.md)
