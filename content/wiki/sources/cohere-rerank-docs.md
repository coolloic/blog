---
title: "Source: Cohere docs: Rerank overview"
summary: "Cohere documentation for its hosted reranking models and API."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor documentation
- **Author:** Cohere
- **Date:** read 2026-11-14
- **Original:** [An Overview of Cohere's Rerank Model](https://docs.cohere.com/docs/rerank-overview)

## Summary

Describes the Rerank endpoint: send a query and a list of documents, get back indices with relevance scores in descending order.

## Key claims

- Models listed as of 2026-11: `rerank-v5.0-pro` / `rerank-v5.0-fast`, `rerank-v4.0-pro` / `rerank-v4.0-fast`, `rerank-v3.5`, and the older English and multilingual v3.0 models.
- From v3.5 on, a single multilingual model covers 100+ languages.
- Structured documents work best serialized as YAML strings.
- `top_n` limits how many results come back; each has an `index` and `relevance_score`.

## Feeds

[Reranking](../concepts/reranking.md)
