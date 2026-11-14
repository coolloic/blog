---
title: "Source: Formal et al. 2021: SPLADE v2"
summary: "Follow-up to SPLADE adding max pooling, a document-only variant and distillation, with BEIR zero-shot results above BM25."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper, arXiv:2109.10086
- **Author:** Thibault Formal, Carlos Lassance, Benjamin Piwowarski, Stéphane Clinchant
- **Date:** 2021-09-21
- **Original:** [arXiv:2109.10086](https://arxiv.org/abs/2109.10086)

## Summary

Improves SPLADE by replacing sum pooling with max pooling (SPLADE-max), benchmarking a document-encoder-only model where queries are not passed through the network, and training with distillation from a cross-encoder (DistilSPLADE-max).

## Key claims

- Max pooling over tokens of log(1 + ReLU(w_ij)) becomes SPLADE's default and adds almost 2 points on MS MARCO and TREC.
- MS MARCO dev MRR@10: BM25 0.184, SPLADE-max 0.340, DistilSPLADE-max 0.368.
- On the BEIR subset used, average nDCG@10 (zero-shot datasets): BM25 0.456 (tuned BM25 from the BEIR leaderboard), TAS-B 0.437, ColBERT 0.457, SPLADE-max 0.464, DistilSPLADE-max 0.506.
- Abstract claims more than 9% nDCG@10 gain on TREC DL 2019 over the original SPLADE.

## Feeds

[BM25](../concepts/bm25.md)
