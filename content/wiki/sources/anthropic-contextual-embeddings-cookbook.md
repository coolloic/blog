---
title: "Source: Anthropic cookbook: Contextual Retrieval guide"
summary: "Runnable Anthropic cookbook that reproduces contextual retrieval on 9 codebases, with the contextualizer prompt, prompt-caching cost stats and Pass@k numbers per stage."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor notebook / tutorial (Claude cookbook)
- **Author/publisher:** Anthropic
- **Date:** read 2026-11-14 (recorded run used an earlier Haiku model than the one now named in the code)
- **Original:** [Enhancing RAG with contextual retrieval](https://platform.claude.com/cookbook/capabilities-contextual-embeddings-guide)

## Summary

A hands-on companion to the [contextual retrieval blog post](anthropic-contextual-retrieval.md). It builds a baseline RAG over 737 chunks from 9 codebases, evaluates it on 248 queries that each have a golden chunk, then adds contextual embeddings, contextual BM25 (Elasticsearch) and a Cohere reranker, reporting Pass@k at each step. It also logs the prompt-caching savings of generating the per-chunk context.

## Key claims

- Metric: Pass@k, whether the golden chunk is in the top k.
- Pass@10: baseline 87.15%, contextual embeddings 92.34%, reranked pipeline 95.26%. Pass@20 goes from 90.06% (baseline) to 97.45% (full pipeline).
- Contextualizer prompt: whole document in a `<document>` block (marked with `cache_control`), the chunk in a `<chunk>` block, and a request for a short, succinct situating context, returned with nothing else. Example output: about 76 tokens from about 3.4k input tokens.
- Process chunks document by document so the cached document prefix (5-minute cache) is reused; in the recorded run 61.83% of input tokens were cache reads, cutting estimated cost from about $9.20 to $2.85 (about 69%).
- Hybrid fusion: weighted reciprocal rank fusion over the top 150 of each retriever, 0.8 semantic / 0.2 BM25 by default; both raw and contextualized text indexed.
- Reranking: over-retrieve 10x, rerank with Cohere `rerank-english-v3.0`; about 100-200 ms and about $0.002 per query added.
- Caveat: contextualized chunks can exceed an embedding model's input limit and be truncated.
- Recommendation tiers: contextual embeddings only for cost-sensitive high volume; add reranking for maximum accuracy.

## Feeds

[Contextual retrieval](../concepts/contextual-retrieval.md)
