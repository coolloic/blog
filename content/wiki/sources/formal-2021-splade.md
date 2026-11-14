---
title: "Source: Formal, Piwowarski & Clinchant 2021: SPLADE"
summary: "SIGIR 2021 short paper introducing SPLADE, a learned sparse retriever that predicts vocabulary-wide term weights with expansion and served from an inverted index."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (SIGIR 2021 short paper), arXiv:2107.05720
- **Author:** Thibault Formal, Benjamin Piwowarski, Stéphane Clinchant (Naver Labs Europe, Sorbonne Université)
- **Date:** 2021-07-12
- **Original:** [arXiv:2107.05720](https://arxiv.org/abs/2107.05720)

## Summary

Proposes a first-stage ranker that keeps the inverted-index efficiency of bag-of-words models while fixing their vocabulary-mismatch problem. A BERT masked-language-model head scores every vocabulary term for each input token; weights are made positive with ReLU, damped with log(1 + x), and summed over tokens to give one sparse vector per query or document. Sparsity is enforced with a regularizer during training.

## Key claims

- Bag-of-words models like BM25 remain strong baselines but suffer from vocabulary mismatch (relevant documents lacking query terms).
- Term weight for vocabulary entry j: sum over input tokens of log(1 + ReLU(w_ij)); the log saturation stops a few terms from dominating and helps sparsity.
- Sparsity is trained with the FLOPS regularizer (squared mean activation per term), with separate weights for queries and documents so queries can be made sparser for speed.
- The model performs both expansion (adds related terms, e.g. stems or topic words) and compression (drops uninformative terms): on 10k documents, about 20 terms dropped and 32 expansion terms added per document on average.
- MS MARCO dev MRR@10: BM25 0.184, doc2query-T5 0.277, SPLADE 0.322; dense baselines ANCE 0.330, TCT-ColBERT 0.335. TREC DL 2019 nDCG@10: BM25 0.506, SPLADE about 0.665.
- Reported FLOPS for SPLADE (0.73 to 0.88) are on the order of BOW models (BM25 0.13, doc2query-T5 0.81); a heavily regularized model (FLOPS 0.05) still reaches MRR@10 0.296 with an index under 1.4 GB.

## Feeds

[BM25](../concepts/bm25.md)
