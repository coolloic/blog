---
title: "Source: Wang et al. 2023: Query2doc"
summary: "EMNLP 2023 paper (Microsoft) that expands a query with an LLM-written pseudo-document, improving BM25 by 3-15% without any fine-tuning."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** research paper (EMNLP 2023), arXiv:2303.07678
- **Author:** Liang Wang, Nan Yang, Furu Wei (Microsoft Research)
- **Date:** 2023-03-14 (v2 2023-10-11)
- **Original:** [Query2doc: Query Expansion with Large Language Models](https://arxiv.org/abs/2303.07678)

## Summary

A query-expansion method: few-shot prompt an LLM to write a pseudo-document for the query, then concatenate the query and pseudo-document and search with that. It is close in spirit to HyDE but keeps the original query in the search input and targets sparse (BM25) as well as dense retrievers.

## Key claims

- No retriever or LLM fine-tuning is needed; the LLM is used few-shot.
- Improves BM25 by 3% to 15% on MS MARCO and TREC DL ad-hoc retrieval.
- Also helps state-of-the-art dense retrievers, in-domain and out-of-domain.
- The generated text helps disambiguate the query.

## Feeds

[Query transformation](../concepts/query-transformation.md)
