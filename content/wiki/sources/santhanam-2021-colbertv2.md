---
title: "Source: Santhanam et al. 2021: ColBERTv2"
summary: "NAACL 2022 paper adding denoised distillation and centroid-plus-residual compression to ColBERT, shrinking the MS MARCO index from 154 GiB to 16-25 GiB with no quality loss at 2 bits."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** research paper (NAACL 2022), arXiv:2112.01488
- **Author:** Keshav Santhanam, Omar Khattab, Jon Saad-Falcon, Christopher Potts, Matei Zaharia (Stanford)
- **Date:** 2021-12-02 (v3 2022-07-10)
- **Original:** [ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction](https://arxiv.org/abs/2112.01488)

## Summary

Keeps ColBERT's late interaction (one 128-dim vector per token, MaxSim scoring) and fixes its two problems. Quality: training with hard negatives and distillation from a cross-encoder. Storage: token vectors cluster tightly by meaning, so each vector is stored as the ID of its nearest centroid plus a 1- or 2-bit-per-dimension quantized residual.

## Key claims

- Encoding: 4 bytes for the centroid ID plus 16 or 32 bytes of residual (b = 1 or 2) = 20 or 36 bytes per vector, versus 256 bytes for a 128-dim fp16 vector.
- MS MARCO index: 154 GiB for ColBERT vs 16 GiB (1-bit) or 25 GiB (2-bit) for ColBERTv2, a 6-10x reduction (including a 4.5 GiB inverted list).
- That is about the size of a single-vector index: 9M passages x 768-dim float32 is a little over 25 GiB, before any HNSW overhead.
- Compression barely hurts: vanilla ColBERT 36.2 MRR@10; with 2-bit residuals 36.2; with 1-bit 35.5.
- MS MARCO dev MRR@10 39.7, the best among the compared retrievers (SPLADEv2 36.8, RocketQAv2 38.8).
- Strong out of domain on BEIR and the new LoTTE benchmark; SPLADEv2 still wins some sets (e.g. LoTTE forum queries).
- Under extreme resource constraints, simpler designs like SPLADEv2 may be preferable.

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
