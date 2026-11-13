---
title: "Source: Khattab & Zaharia 2020: ColBERT"
summary: "SIGIR 2020 paper introducing late interaction: per-token embeddings matched cheaply at query time."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (SIGIR 2020), arXiv:2004.12832
- **Author:** Omar Khattab, Matei Zaharia (Stanford)
- **Date:** 2020-04-27
- **Original:** [ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT](https://arxiv.org/abs/2004.12832)

## Summary

Sits between bi-encoders and cross-encoders: query and document are encoded independently into token-level vectors (so documents can be precomputed), then a cheap interaction step scores the match.

## Key claims

- Document representations are computed offline, so only the query is encoded at search time.
- Two orders of magnitude faster and four orders of magnitude fewer FLOPs per query than BERT cross-encoder ranking.
- Competitive with BERT-based rankers in effectiveness and better than all non-BERT baselines on two passage-search benchmarks.

## Feeds

[Reranking](../concepts/reranking.md)
