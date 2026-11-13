---
title: "Source: Vector Databases Compared (Notebook tutorial)"
summary: "The owner's guide to vector databases: core concepts, the chunk-embed-upsert-query flow, a comparison of Chroma, FAISS, Qdrant, Weaviate, Milvus, Pinecone, pgvector and Redis, with code."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "vector-databases"]
---

- **What:** tutorial (HTML page plus Markdown version) in the owner's Notebook
- **Author:** coolloic (wiki owner)
- **Date:** not shown (read 2026-11-14)
- **Original:** [coolloic.github.io/Notebook/vector-databases.html](https://coolloic.github.io/Notebook/vector-databases.html)

## Summary

A practical guide to the storage layer of RAG. It defines the core vocabulary (dimension, metric, ANN index, collection, payload, upsert, top-k), shows the standard chunk, embed, upsert, query and filter flow, compares eight vector stores, and gives working Python for Chroma, FAISS, Qdrant, Pinecone and pgvector using a local 384-dimension sentence-transformers model.

## Key claims

- The storage flow is the same everywhere: chunk, embed, upsert vector plus metadata, query by similarity, filter by metadata.
- The distance metric must match how the embedding model was trained; cosine is most common for text.
- Chroma: embedded or lightweight server, fastest way to prototype. FAISS: a library, not a database; you manage persistence and metadata.
- Qdrant: Rust, strong filtering, HNSW. Weaviate: hybrid search and built-in vectorizers. Milvus: distributed, billion-scale, heavier ops. Pinecone: fully managed serverless. pgvector: vectors next to relational data in Postgres. Redis: in-memory, very low latency.
- Rule of thumb: prototype locally with Chroma or FAISS, then swap to a server store when you need scale, concurrency or persistence; the flow does not change.

## Feeds

[Vector databases](../concepts/vector-databases.md) · [Embeddings](../concepts/embeddings.md)
