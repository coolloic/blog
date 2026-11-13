---
title: "Source: LangChain MultiQueryRetriever (langchain_classic)"
summary: "LangChain's reference implementation of multi-query retrieval: an LLM writes 3 rephrasings, each is retrieved, and the unique union is returned."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "frameworks"]
---

- **What:** library API reference and source code
- **Author/publisher:** LangChain
- **Date:** read 2026-11-14 (current `master`, package `langchain_classic`)
- **Original:** [API reference](https://reference.langchain.com/python/langchain-classic/retrievers/multi_query/MultiQueryRetriever) · [source](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain_classic/retrievers/multi_query.py)

## Summary

`MultiQueryRetriever` wraps any retriever. `from_llm(retriever, llm, prompt, include_original)` builds a chain of prompt, LLM and a line-list parser; at query time it generates variants, runs the wrapped retriever once per variant and deduplicates the results. It now lives in the `langchain_classic` package, the home of pre-1.0 chains and retrievers.

## Key claims

- The default prompt asks for 3 alternative versions of the question, one per line, explicitly to work around limits of distance-based similarity search.
- Results are merged as a unique union (deduplicated), not rank-fused.
- `include_original` (default `False`) adds the user's original query to the generated list.
- Sync and async paths (`generate_queries` / `agenerate_queries`).

## Feeds

[Query transformation](../concepts/query-transformation.md)
