---
title: "Source: Microsoft GraphRAG documentation"
summary: "Docs for Microsoft's open-source GraphRAG library: indexing pipeline and the global, local, DRIFT and basic query modes."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** open-source project documentation
- **Author:** Microsoft
- **Date:** read 2026-11-14
- **Original:** [GraphRAG](https://microsoft.github.io/graphrag/)

## Summary

Describes the `graphrag` package: index a corpus into TextUnits, entities, relationships and claims, cluster with Leiden, summarize communities bottom-up, then query.

## Key claims

- Global Search answers whole-corpus questions from community summaries.
- Local Search answers entity questions by fanning out to an entity's neighbours and associated concepts.
- DRIFT Search is local search enriched with community information.
- Basic Search is plain top-k vector RAG, included as a baseline.
- Strongly recommends prompt tuning to the domain; default prompts may not give the best results.
- Configuration and prompts must be re-initialized between minor versions (`graphrag init --force`), which overwrites them.

## Feeds

[GraphRAG](../concepts/graphrag.md)
