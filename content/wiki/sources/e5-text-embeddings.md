---
title: "Source: Text Embeddings by Weakly-Supervised Contrastive Pre-training (E5)"
summary: "Microsoft paper introducing the E5 open embedding models, trained contrastively on a large curated set of weakly supervised text pairs."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "papers"]
---

- **What:** research paper, arXiv:2212.03533
- **Authors:** Liang Wang, Nan Yang, Xiaolong Huang, Binxing Jiao, Linjun Yang, Daxin Jiang, Rangan Majumder, Furu Wei
- **Date:** submitted 7 December 2022; v2 revised 22 February 2024
- **Original:** [arxiv.org/abs/2212.03533](https://arxiv.org/abs/2212.03533)

## Summary

E5 shows that a large, carefully filtered corpus of naturally occurring text pairs (CCPairs) is enough to pre-train strong general-purpose embeddings with a contrastive objective, then fine-tune on labelled data. It is the origin of the widely used open E5 family (and later multilingual-e5 and e5-mistral).

## Key claims

- Weak supervision from CCPairs plus contrastive pre-training yields single-vector embeddings for retrieval, clustering and classification.
- Zero-shot, E5 is described as the first model to beat the BM25 baseline on BEIR retrieval without labelled data.
- Fine-tuned, it topped MTEB at the time, beating models with 40x more parameters.
- Evaluated on 56 datasets from BEIR and MTEB.

## Feeds

[Embeddings](../concepts/embeddings.md)
