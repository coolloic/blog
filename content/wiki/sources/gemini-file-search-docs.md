---
title: "Source: File Search (Gemini API docs)"
summary: "Google's hosted RAG tool for Gemini: persistent file search stores, chunking config, metadata filters, file_citation annotations, limits and pricing."
category: source
lastmod: 2026-11-14
tags: ["platforms", "google", "rag"]
---

- **What:** official API documentation page
- **Publisher:** Google (Gemini API / AI Studio)
- **Date:** living document; read 2026-11-14
- **Original:** [File Search](https://aistudio.google.com/docs/file-search)

## Summary

File Search imports, chunks, embeds and indexes documents in a persistent store that the `file_search` tool queries during an interaction.

## Key claims

- Stores persist until deleted (unlike raw Files, which expire after 48 hours); embeddings have no TTL.
- Ingest by `uploadToFileSearchStore` or by Files API upload plus `importFile`; both are long-running operations.
- Optional `chunking_config.white_space_config` (`max_tokens_per_chunk`, `max_overlap_tokens`).
- Custom metadata plus AIP-160 `metadata_filter`; citations come back as `file_citation` annotations with file name, page number and metadata.
- Image indexing with `gemini-embedding-2`.
- Limits: 100 MB per document; store size 1 GB (Free) to 1 TB (Tier 3); keep stores under 20 GB for latency; backend size is about 3x input.
- Pricing: pay embedding rates at indexing; storage and query embeddings are free; retrieved chunks are billed as context tokens.
- Cannot currently be combined with Google Search grounding or URL context; can be combined with custom functions on Gemini 3/4.

## Feeds

[Gemini API](../concepts/gemini-api.md)
