---
title: "Source: Günther et al. 2024: Late Chunking"
summary: "Jina AI paper that embeds the whole document first and pools token vectors per chunk afterwards, so chunks keep document context."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper, arXiv:2409.04701
- **Author:** Michael Günther, Isabelle Mohr, Daniel James Williams, Bo Wang, Han Xiao (Jina AI)
- **Date:** 2024-09-07 (v3 2025-07-07)
- **Original:** [Late Chunking: Contextual Chunk Embeddings Using Long-Context Embedding Models](https://arxiv.org/abs/2409.04701)

## Summary

Proposes reversing the usual order of chunk-then-embed: run a long-context embedding model over the full text to get token embeddings, then mean-pool them within each chunk's span.

## Key claims

- Each chunk embedding then reflects surrounding document context (e.g. what a pronoun refers to).
- Needs no extra training; a fine-tuning recipe further improves it.
- Reported better retrieval than naive chunking across several tasks.
- Requires a long-context embedding model with access to token-level outputs (not just a pooled API vector).

## Feeds

[Chunking](../concepts/chunking.md)
