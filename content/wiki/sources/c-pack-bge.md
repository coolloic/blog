---
title: "Source: C-Pack: Packed Resources for General Chinese Embeddings (BGE)"
summary: "BAAI paper releasing the C-MTEB benchmark, the C-MTP training set and the BGE embedding model family (via FlagEmbedding)."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "papers"]
---

- **What:** research paper, arXiv:2309.07597 (SIGIR 2024)
- **Authors:** Shitao Xiao, Zheng Liu, Peitian Zhang, Niklas Muennighoff, Defu Lian, Jian-Yun Nie
- **Date:** submitted 14 September 2023; v5 revised 24 September 2024
- **Original:** [arxiv.org/abs/2309.07597](https://arxiv.org/abs/2309.07597) · code: [github.com/FlagOpen/FlagEmbedding](https://github.com/FlagOpen/FlagEmbedding)

## Summary

C-Pack bundles a Chinese embedding benchmark (C-MTEB, 6 tasks, 35 datasets), a large training corpus (C-MTP) and a family of embedding models in several sizes, released through the FlagEmbedding repository, which is where the BGE models live. The paper integrates the full training pipeline and also releases English models.

## Key claims

- C-MTEB: 6 tasks, 35 datasets for Chinese embeddings.
- The released models beat prior Chinese embeddings on C-MTEB by up to 10% at release.
- The English models reached state of the art on MTEB at release, with English training data about 2x the Chinese.
- Data, models and training code are open.

## Feeds

[Embeddings](../concepts/embeddings.md)
