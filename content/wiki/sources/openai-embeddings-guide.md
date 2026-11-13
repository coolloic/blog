---
title: "Source: OpenAI Vector embeddings guide"
summary: "OpenAI's API guide to text-embedding-3-small/-large: dimensions, input limits, shortening via the dimensions parameter, normalization and pricing."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "openai"]
---

- **What:** API documentation (guide plus pricing page)
- **Author:** OpenAI
- **Date:** living document (read 2026-11-14)
- **Original:** [developers.openai.com/api/docs/guides/embeddings](https://developers.openai.com/api/docs/guides/embeddings) · [pricing](https://developers.openai.com/api/docs/pricing)

## Summary

The guide documents OpenAI's third-generation embedding models and how to use them for search, clustering, recommendations and classification. As of November 2026 it still lists only the `-3` models and the legacy ada-002, with no newer embedding model.

## Key claims

- `text-embedding-3-small`: 1536 dims by default, 8,192 max input tokens, MTEB average 62.3%; $0.02 per 1M tokens.
- `text-embedding-3-large`: 3072 dims by default, 8,192 max input tokens, MTEB 64.6%; $0.13 per 1M tokens.
- `text-embedding-ada-002`: legacy, MTEB 61.0%; $0.10 per 1M tokens.
- The `dimensions` parameter shortens embeddings; `-3-large` cut to 256 dims still beats ada-002 at 1536 on MTEB. Manual truncation requires re-normalizing.
- Embeddings are normalized to length 1, so cosine similarity equals a dot product and gives the same ranking as Euclidean distance.
- Tokenizer is `cl100k_base`; the models have no knowledge of events after September 2021.

## Feeds

[Embeddings](../concepts/embeddings.md)
