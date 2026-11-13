---
title: "Source: Notebook experiment 13: RAG"
summary: "Runnable LangChain + FAISS scaffold of the basic split, embed, retrieve, answer pipeline."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/13-rag](https://github.com/coolloic/Notebook/tree/main/experiments/13-rag)

## Summary

A minimal retrieval-augmented pipeline over a tiny policy document, composed as one LangChain (LCEL) chain with FAISS and sentence-transformers embeddings, traced with LangSmith.

## Key claims

- The basic pipeline is split, embed, store in FAISS, retrieve top-k, generate a grounded answer.
- RAG is the retrieval backbone behind most agent patterns that must answer from private or changing data.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
