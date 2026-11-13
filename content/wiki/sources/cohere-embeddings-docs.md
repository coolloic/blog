---
title: "Source: Cohere embeddings documentation"
summary: "Cohere's guide to its Embed models (embed-v5.0-pro and embed-v3.0): input_type, Matryoshka dimensions, compressed embedding types and image embeddings."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings"]
---

- **What:** API documentation
- **Author:** Cohere
- **Date:** living document (read 2026-11-14)
- **Original:** [docs.cohere.com/docs/embeddings](https://docs.cohere.com/docs/embeddings)

## Summary

As of November 2026 the page covers `embed-v5.0-pro`, a multilingual multimodal model, and the older `embed-v3.0` family. Cohere makes the task explicit through `input_type`, offers Matryoshka dimensions, and can return several compressed representations in one call.

## Key claims

- `input_type`: `search_query`, `search_document`, `classification`, `clustering` (and `image` for v3.0); it tailors the embedding to its role.
- `embed-v5.0-pro` supports output dimensions 256, 512, 768, 1024, 1536 and 2048.
- `embedding_types`: `float`, `int8`, `uint8`, `binary`, `ubinary`; several can be requested at once. A 1024-dim binary vector is 128 bytes and may need unpacking for some vector stores.
- `embed-v5.0-pro` can embed text and images together in one vector (e.g. slides, document screenshots); up to 96 images per request.

## Feeds

[Embeddings](../concepts/embeddings.md)
