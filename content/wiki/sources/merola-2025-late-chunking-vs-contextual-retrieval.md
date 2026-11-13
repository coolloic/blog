---
title: "Source: Merola & Singh 2025: Late Chunking vs Contextual Retrieval"
summary: "ECIR 2025 workshop paper reproducing late chunking and contextual retrieval: contextual retrieval wins slightly on relevance but costs far more compute; late chunking is model-dependent."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "papers"]
---

- **What:** workshop paper (ECIR 2025, Knowledge-Enhanced IR workshop), arXiv:2504.19754
- **Author:** Carlo Merola, Jaspinder Singh
- **Date:** 2025-04-28
- **Original:** [Reconstructing Context: Evaluating Advanced Chunking Strategies for Retrieval-Augmented Generation](https://arxiv.org/abs/2504.19754)

## Summary

An independent reproduction that compares two ways to give chunks document context: [late chunking](gunther-2024-late-chunking.md) (embed the whole document, pool per chunk) and LLM-written contextual retrieval (with rank fusion and reranking), on NFCorpus and MS MARCO with several open embedding models on a single 24 GB GPU.

## Key claims

- Contextual retrieval preserved semantic coherence better; late chunking was more efficient but lost some relevance and completeness.
- NFCorpus subset, Jina-V3: contextual rank fusion nDCG@5 0.317 vs late chunking 0.309; nDCG@10 0.308 vs 0.294.
- Contextualization alone gave small gains over uncontextualized fixed chunks (nDCG@5 0.303 to 0.312); adding rank fusion and reranking reached 0.317.
- Late chunking is model-dependent: roughly neutral for Stella-V5 and Jina-V3, slightly positive for Jina-V2, sharply negative for BGE-M3 (nDCG@5 0.246 to 0.070); on MS MARCO with Stella-V5 it dropped nDCG@5 from 0.630 to 0.503.
- Contextualizing long documents needed up to about 20 GB VRAM, forcing the authors to use a 20% subset.
- Note: the paper's late-chunking numbers for Jina-V3 differ between two of its tables.

## Feeds

[Contextual retrieval](../concepts/contextual-retrieval.md)
