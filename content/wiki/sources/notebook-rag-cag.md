---
title: "Source: Notebook: RAG vs CAG vs GraphRAG"
summary: "Owner's tutorial comparing RAG, cache-augmented generation and GraphRAG, with a decision map and a table of RAG variants."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** tutorial in the owner's public Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [RAG vs CAG vs GraphRAG: grounding LLMs in your data](https://coolloic.github.io/Notebook/rag-cag.html)

## Summary

A field guide to grounding techniques. It frames RAG, CAG and GraphRAG as three answers to one problem (getting the right facts into the prompt) and routes between them with three questions: does the corpus fit in the context window, does it change often, and are the questions relational or whole-corpus. It then tabulates the wider family of RAG add-ons (hybrid search, reranking, HyDE, query rewriting, contextual retrieval, agentic, corrective and self-RAG, multimodal) by the weakness each one fixes.

## Key claims

- Retrieval is the ceiling of RAG: if the right chunk is not retrieved, the model cannot recover.
- Pure semantic search struggles with exact keywords and with multi-hop or global questions; chunking severs context at boundaries.
- CAG preloads a small, stable corpus and reuses the cached KV state of that prefix; it is bounded by the context window and goes stale when data changes.
- Common production shape: cache the stable core (CAG) and retrieve the volatile long tail (RAG).
- GraphRAG extracts entities and relations into a graph, clusters it into communities and summarizes them; local queries walk an entity's neighbourhood, global queries map-reduce over community summaries. Indexing is expensive.
- Suggested layering order: hybrid retrieve, rerank, optionally grade and correct, generate with citations; add agentic or self-RAG when one pass is not enough.
- Start with the lightest method that works and add machinery only when an evaluation shows it helps.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md) · [Hybrid search](../concepts/hybrid-search.md) · [Reranking](../concepts/reranking.md) · [GraphRAG](../concepts/graphrag.md) · [Agentic RAG](../concepts/agentic-rag.md)
