---
title: "Source: Vertex AI RAG Engine — Overview and Transformations"
summary: "Google's managed RAG pipeline (corpus, ingestion, chunking, embedding, retrieval), with its region, CMEK and VPC-SC constraints."
category: source
lastmod: 2026-11-14
tags: ["platforms", "gcp", "rag"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated, read 2026-11-14
- **Original:** [RAG Engine overview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview)
- **Original:** [Fine-tune RAG transformations](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/fine-tune-rag-transformations)

## Summary

Explains the RAG Engine pipeline stages and default chunking parameters, plus where it's available.

## Key claims

- Pipeline: ingest (local files, Cloud Storage, Google Drive) → transform/chunk → embed → index into a RAG corpus → retrieve → generate with retrieved context.
- Default chunking: `chunk_size` 1,024 tokens, `chunk_overlap` 256 tokens. Smaller chunks give more precise embeddings; larger ones more general.
- Layout-aware parsing via the Document AI layout parser integration.
- A RAG-Engine-managed Spanner instance can serve as the vector DB and is billed to you.
- Access to `us-central1`, `us-east1`, `us-east4` and `europe-west1` requires allowlisting; the page tells users with new projects to try other regions.
- Supports VPC-SC and CMEK; does not support data residency or Access Transparency (AXT) controls.

## Feeds

[Google Vertex AI](../concepts/google-vertex-ai.md)
