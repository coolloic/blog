---
title: "Source: ViDoRe V3 (Loison et al., ACL 2026)"
summary: "End-to-end multimodal RAG benchmark over 26k enterprise document pages: visual and late-interaction retrievers beat text ones, but a text pipeline with a strong text reranker scores best overall."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "multimodal", "benchmarks"]
---

- **What:** research paper / benchmark (ACL 2026 long paper, Anthology 2026.acl-long.755), arXiv:2601.08620
- **Author:** António Loison, Quentin Macé, Antoine Edy, Victor Xing, Tom Balough, Gabriel Moreira, Bo Liu, Manuel Faysse, Céline Hudelot, Gautier Viaud (ViDoRe team)
- **Date:** 2026-01-13 (v2 2026-04-21)
- **Original:** [ViDoRe V3: A Comprehensive Evaluation of Retrieval Augmented Generation in Complex Real-World Scenarios](https://arxiv.org/abs/2601.08620)

## Summary

The third ViDoRe benchmark moves from retrieval-only to full RAG: 10 datasets across professional domains, 26,000 pages, 3,099 human-verified queries in 6 languages, scoring retrieval, answer generation and visual grounding. Two datasets are held out privately; it is integrated into MTEB.

## Key claims

- Retrieval (nDCG@10, macro average): best visual retriever ColEmbed-3B-v2 59.8; best text retrievers Qwen3-8B 51.0 and Jina-v4 (text) 50.4.
- Multi-vector beats single-vector at similar size: ColQwen2.5 (3B) 51.9 vs Nomic-3B 44.3.
- A text reranker (zerank-2) lifted Jina-v4 text retrieval from 50.4 to 63.6, the best pipeline overall; a visual reranker (jina-reranker-m0) on Jina-v4 visual moved 57.6 to 57.8 and hurt 4 datasets.
- Generation (Gemini 3 Pro): image context beats text context on hard queries by about 2.4-2.8 points; hybrid (image + text) context is best at 54.7% on hard queries (65.7% overall), about 10 points below the image oracle.
- Models remain weak on non-textual elements, open-ended queries and visual grounding (model F1 under 0.09 vs 0.60 between humans).

## Feeds

[Late-interaction retrieval](../concepts/late-interaction-retrieval.md)
