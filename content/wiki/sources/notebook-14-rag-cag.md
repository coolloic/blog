---
title: "Source: Notebook experiment 14: RAG + CAG"
summary: "Runnable scaffold that preloads stable company facts (CAG) and retrieves volatile per-order facts (RAG)."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/14-rag-cag](https://github.com/coolloic/Notebook/tree/main/experiments/14-rag-cag)

## Summary

Combines cache-augmented generation for a small, always-needed core of facts with retrieval for a larger volatile corpus, using prompt caching in production.

## Key claims

- CAG removes a retrieval round-trip for stable, always-relevant context.
- Cached context still costs tokens on every call and can go stale, so cache only what is stable and bounded.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
