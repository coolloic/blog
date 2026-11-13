---
title: "Source: Microsoft Research: LazyGraphRAG"
summary: "Microsoft Research blog on LazyGraphRAG, which defers LLM work to query time and indexes at about vector-RAG cost."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor research blog post
- **Author:** Microsoft Research
- **Date:** 2024-11-25 (editor's note 2025-06-06)
- **Original:** [LazyGraphRAG: Setting a new standard for quality and cost](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/)

## Summary

Presents a GraphRAG variant that builds its concept graph with cheap NLP noun-phrase extraction instead of LLM summarization, and spends LLM calls only at query time under a tunable relevance-test budget.

## Key claims

- Indexing cost equals vector RAG and is about 0.1% of full GraphRAG.
- Query: best-first (vector similarity) plus breadth-first community search with iterative deepening and an LLM relevance assessor.
- Matches GraphRAG global search quality on global queries at over 700x lower query cost; at 4% of its query cost beats all compared methods on local and global queries.
- Evaluated on 5,590 AP news articles with 100 synthetic queries, judged by an LLM.
- A single relevance-test budget parameter trades cost for quality.

## Feeds

[GraphRAG](../concepts/graphrag.md)
