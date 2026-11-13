---
title: "Source: Notebook experiment 23: Corrective RAG"
summary: "Runnable scaffold that grades retrieved chunks and falls back to web search when they are weak."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/23-corrective-rag](https://github.com/coolloic/Notebook/tree/main/experiments/23-corrective-rag)

## Summary

Retrieves from FAISS, asks the model to grade relevance, and falls back to a stub web search when the grade fails, before answering.

## Key claims

- Corrective RAG grades retrieval and takes a corrective action (broaden the query, search the web) when it is weak.
- It targets open-domain questions where the local index may not hold the answer.

## Feeds

[Agentic RAG](../concepts/agentic-rag.md)
