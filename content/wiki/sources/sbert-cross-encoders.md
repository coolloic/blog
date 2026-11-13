---
title: "Source: Sentence-Transformers docs: Cross-Encoders"
summary: "SBERT documentation contrasting bi-encoders with cross-encoders and recommending retrieve-then-rerank."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** library documentation
- **Author:** Sentence-Transformers (UKP Lab / Hugging Face)
- **Date:** read 2026-11-14
- **Original:** [Cross-Encoders](https://sbert.net/examples/cross_encoder/applications/README.html)

## Summary

Explains why a cross-encoder, which reads query and document together, is more accurate than a bi-encoder but cannot be used for first-stage search.

## Key claims

- A bi-encoder embeds each text independently; similarity is a cosine between vectors that can be precomputed.
- A cross-encoder feeds the pair through the transformer together and outputs a relevance score; it produces no reusable embedding.
- Cost scales with the number of pairs: clustering 10,000 sentences would need about 50 million pair passes (about 65 hours) versus about 5 seconds to embed them with a bi-encoder.
- Recommended pattern: bi-encoder retrieves a candidate set (e.g. top 100), cross-encoder re-scores it. Example model: `cross-encoder/ms-marco-MiniLM-L6-v2`.

## Feeds

[Reranking](../concepts/reranking.md)
