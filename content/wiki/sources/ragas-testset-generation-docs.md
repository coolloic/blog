---
title: "Source: Ragas docs: Testset generation for RAG"
summary: "Ragas guide to generating synthetic RAG test questions from your own documents via a knowledge graph and query synthesizers."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "ragas", "synthetic-data"]
---

- **What:** library documentation (getting-started guide)
- **Publisher:** Ragas (Exploding Gradients), Apache-2.0
- **Date:** page shows dates of 16 December 2025 and 13 November 2026; read 2026-11-14
- **Original:** [Testset Generation for RAG](https://docs.ragas.io/en/stable/getstarted/rag_testset_generation/)

## Summary

Shows how to turn a folder of documents into a synthetic evaluation set for a RAG pipeline. Documents become nodes in a knowledge graph, LLM- and embedding-based transforms enrich it with extracted properties and relationships, and query synthesizers turn sampled scenarios into test queries.

## Key claims

- Quickstart: `TestsetGenerator(llm=..., embedding_model=...)` and `generate_with_langchain_docs(docs, testset_size=...)`; a LlamaIndex equivalent exists. Results export via `to_pandas()` for review.
- Advanced path: build a `KnowledgeGraph` of `Node`s, run `default_transforms()` with `apply_transforms()` (in the example, 10 document nodes grew to 48 nodes and 605 relationships), then `generate(testset_size=..., query_distribution=...)`.
- `default_query_distribution` mixes single-hop specific queries (50%), multi-hop abstract (25%) and multi-hop specific (25%).
- The guide frames the output as a starting point to review and select from, not a finished gold set.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)
