---
title: "Source: Chroma: Evaluating Chunking Strategies for Retrieval"
summary: "Chroma technical report measuring chunkers at the token level; finds defaults like 800/400 are poor and 200-token chunks do well."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor technical report
- **Author:** Brandon Smith, Anton Troynikov (Chroma)
- **Date:** 2024-07-03
- **Original:** [Evaluating Chunking Strategies for Retrieval](https://www.trychroma.com/research/evaluating-chunking)

## Summary

Builds a synthetic, token-level retrieval benchmark (LLM-generated queries with exact-match excerpts across five corpora, about 328k tokens and 472 queries; the text elsewhere says 474) and uses it to compare fixed-size, recursive, semantic, cluster-based and LLM-based chunkers.

## Key claims

- Metrics: token-level recall, precision, an upper-bound precision, and IoU (Jaccard over tokens), which penalizes redundant and irrelevant retrieved tokens.
- Chunking choice alone moved recall by "up to 9%" (the report does not state the exact basis; recall in its main table spans 83.6 to 91.9).
- With text-embedding-3-large and 5 retrieved chunks: recursive 200/0 reached 88.1 recall and 6.9 IoU; the OpenAI Assistants default (800 tokens, 400 overlap) had 87.9 recall but only 1.4 IoU.
- An LLM-based chunker (GPT-4o) and a cluster chunker at 400 tokens had the highest recall (about 91 to 92) but low precision.
- Reducing overlap improves IoU by cutting duplicated tokens.
- The default Kamradt semantic chunker scored slightly below average.
- Caveat from the authors: small, synthetic dataset with limited query diversity.

## Feeds

[Chunking](../concepts/chunking.md)
