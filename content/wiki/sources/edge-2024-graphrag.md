---
title: "Source: Edge et al. 2024: From Local to Global, a Graph RAG Approach"
summary: "Microsoft Research paper introducing GraphRAG: LLM-built entity graph, Leiden communities and map-reduce over community summaries."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper, arXiv:2404.16130
- **Author:** Darren Edge, Ha Trinh, Newman Cheng, et al. (Microsoft Research)
- **Date:** 2024-04-24 (v2 2025-02-19)
- **Original:** [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](https://arxiv.org/abs/2404.16130)

## Summary

Targets global sensemaking questions ("what are the main themes?") that vector RAG cannot answer because no single chunk holds the answer. An LLM extracts an entity graph, the graph is clustered hierarchically and each community is summarized ahead of time; queries map over community summaries and reduce the partial answers.

## Key claims

- Corpora were chunked into 600-token pieces with 100-token overlap; at 600 tokens GPT-4 extracted almost twice as many entity references as at 2,400.
- Gleanings: the LLM is re-asked whether it missed entities, which recovers recall with larger chunks.
- Leiden community detection is applied recursively, giving levels C0 (root, fewest summaries) to C3 (leaf).
- Global search: shuffled community summaries are chunked; each chunk yields a partial answer with a 0-100 helpfulness score; zero-scored answers are dropped and the rest are packed, highest first, into an 8k-token context for the final answer.
- On two corpora of about 1M and 1.7M tokens, global GraphRAG beat vector RAG on comprehensiveness (72-83% win rate) and diversity (62-82%); vector RAG was the most direct.
- Root-level (C0) summaries needed over 97% fewer tokens than map-reducing the source text.
- Limitations: only two corpora; fabrication rates not measured.

## Feeds

[GraphRAG](../concepts/graphrag.md)
