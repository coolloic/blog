---
title: "Source: Matryoshka Representation Learning (Kusupati et al.)"
summary: "Paper introducing Matryoshka embeddings, trained so that prefixes of a vector are themselves usable lower-dimensional embeddings."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "papers"]
---

- **What:** research paper, arXiv:2205.13147 (NeurIPS 2022)
- **Authors:** Aditya Kusupati, Gantavya Bhatt, Aniket Rege, Matthew Wallingford, Aditya Sinha, Vivek Ramanujan, William Howard-Snyder, Kaifeng Chen, Sham Kakade, Prateek Jain, Ali Farhadi
- **Date:** submitted 26 May 2022; v4 revised 8 February 2024
- **Original:** [arxiv.org/abs/2205.13147](https://arxiv.org/abs/2205.13147)

## Summary

Matryoshka Representation Learning (MRL) changes the training objective so that information is packed coarse-to-fine: the first few dimensions carry the most signal and each longer prefix adds detail. One trained model then serves many dimension budgets by simple truncation, with no extra inference cost. This is the mechanism behind the `dimensions` / `output_dimension` parameters of current embedding APIs.

## Key claims

- A single embedding encodes information at multiple granularities, adapting to downstream compute budgets.
- Minimal change to existing representation-learning pipelines; no added cost at inference or deployment.
- Up to 14x smaller embeddings at equal ImageNet-1K classification accuracy.
- Up to 14x real-world speed-ups for large-scale retrieval on ImageNet-1K and 4K (adaptive retrieval: shortlist with short prefixes, re-rank with longer ones).
- Extends across vision (ViT, ResNet), vision-language (ALIGN) and language (BERT) models.

## Feeds

[Embeddings](../concepts/embeddings.md) · [ANN indexes](../concepts/ann-indexes.md)
