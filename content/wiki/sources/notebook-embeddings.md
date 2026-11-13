---
title: "Source: How Embedding Models Work (Notebook tutorial)"
summary: "The owner's tutorial on embedding models: contrastive training, pooling, similarity metrics, model choice and common traps."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings"]
---

- **What:** interactive HTML tutorial in the owner's Notebook
- **Author:** coolloic (wiki owner)
- **Date:** not shown (read 2026-11-14)
- **Original:** [coolloic.github.io/Notebook/embeddings.html](https://coolloic.github.io/Notebook/embeddings.html)

## Summary

A beginner-to-intermediate walkthrough of text embeddings. It explains embeddings as fixed-length vectors where semantic similarity becomes spatial proximity, how contrastive learning shapes the space, the text-to-vector pipeline (tokenize, transformer, pool, normalize), the three common similarity metrics, and practical rules for choosing and using a model. It closes with multimodal, code and multilingual embeddings.

## Key claims

- An embedding model outputs a vector, not text; RAG typically pairs one with a chat model.
- The dominant training recipe is contrastive learning (InfoNCE or triplet loss) over naturally aligned pairs such as question/answer or caption/image.
- Pipeline: tokenize, run transformer layers, pool token vectors (mean pooling or a [CLS] token), then L2-normalize.
- On normalized vectors, dot product equals cosine similarity and L2 distance gives the same ranking.
- Pick models from MTEB per task type; weigh dimensions, max input length, language/domain coverage, local vs hosted.
- Traps: mixing models (vectors from different models are not comparable), using a symmetric similarity model for asymmetric query/passage search, chunks that are too long (text beyond max length is silently truncated).
- Embeddings capture meaning, not exact tokens; pair with keyword or hybrid search for IDs and rare terms.

## Feeds

[Embeddings](../concepts/embeddings.md)
