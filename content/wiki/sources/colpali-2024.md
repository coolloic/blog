---
title: "Source: ColPali (Faysse et al., ICLR 2025)"
summary: "Retrieves document pages by embedding page images with a vision-language model into multi-vector late-interaction embeddings, skipping OCR and layout parsing; introduces the ViDoRe benchmark."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "multimodal", "embeddings"]
---

- **What:** research paper (arXiv:2407.01449, ICLR 2025)
- **Author/publisher:** Manuel Faysse, Hugues Sibille, Tony Wu, Bilel Omrani, Gautier Viaud, Céline Hudelot, Pierre Colombo
- **Date:** 2024-06-27 (v6 2025-02-28)
- **Original:** [arXiv:2407.01449](https://arxiv.org/abs/2407.01449)

## Summary

ColPali questions whether retrieval over visually rich documents needs a parsing pipeline at all. It fine-tunes PaliGemma-3B to emit one embedding per image patch of a page and scores queries with ColBERT-style late interaction. On the new ViDoRe benchmark it beats text pipelines built on Unstructured parsing plus captioning, and indexes pages far faster.

## Key claims

- Each page becomes about 1,030 vectors of dimension 128 (1,024 patches plus a few prompt tokens); about 257.5 KB per page in float16.
- Offline indexing on an NVIDIA L4: 0.39 s per page for ColPali vs 7.22 s per page for an Unstructured pipeline (layout 0.81 s, OCR 2.67 s, captioning 3.71 s).
- ViDoRe average nDCG@5: 81.3 for ColPali vs 67.0 for the best text baseline (Unstructured + captioning + BGE-M3).
- Retrieval only: the generator still needs either the page image or extracted text to answer.

## Feeds

[Document processing](../concepts/document-processing.md)
