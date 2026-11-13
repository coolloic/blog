---
title: "Source: LangChain SelfQueryRetriever and query constructor (langchain_classic)"
summary: "LangChain's self-querying retriever: an LLM turns a natural-language question into a semantic query string plus a structured metadata filter, which a per-store translator converts to native filter syntax."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "frameworks"]
---

- **What:** library API reference and source code
- **Author/publisher:** LangChain
- **Date:** read 2026-11-14 (current `master`, package `langchain_classic`)
- **Original:** [API reference](https://reference.langchain.com/python/langchain-classic/retrievers/self_query/base) · [retriever source](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain_classic/retrievers/self_query/base.py) · [prompt source](https://github.com/langchain-ai/langchain/blob/master/libs/langchain/langchain_classic/chains/query_constructor/prompt.py)

## Summary

The retriever holds a vector store, a query-constructor runnable that outputs a `StructuredQuery`, and a `structured_query_translator` (a visitor) that rewrites the internal filter language into the vector store's own search parameters. The prompt describes the data source as JSON (content description plus typed attributes, declared with `AttributeInfo`) and few-shot examples show the expected output.

## Key claims

- Output has three parts: a `query` string for semantic search, a `filter` expression (or `NO_FILTER`), and an optional `limit`.
- Filters use a function syntax such as `and(or(eq("artist", ...), ...), lt("length", 180))`.
- If no translator is passed, a built-in one is chosen from the vector store class; the translator's allowed comparators and operators are fed into the prompt.
- `use_original_query` (default `False`) searches with the user's original text instead of the LLM-rewritten query string.
- `search_type` and `search_kwargs` pass through to the vector store.

## Feeds

[Query transformation](../concepts/query-transformation.md)
