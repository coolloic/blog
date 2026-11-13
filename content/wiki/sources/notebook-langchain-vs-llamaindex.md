---
title: "Source: Notebook tutorial: LangChain vs LlamaIndex"
summary: "The owner's comparison of LangChain (orchestration and agents) and LlamaIndex (data ingestion and retrieval), with the same RAG built both ways."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "langchain", "llamaindex"]
---

- **What:** interactive HTML tutorial in the owner's public Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [LangChain vs LlamaIndex](https://coolloic.github.io/Notebook/langchain-vs-llamaindex.html)

## Summary

Frames LangChain as a broad orchestration toolkit and LlamaIndex as a focused data framework; they overlap on RAG. Builds the same document Q&A in both to show LlamaIndex's opinionated defaults versus LangChain's explicit, composable stages.

## Key claims

- LangChain's limits are sprawl: many abstractions, fast-moving APIs, and more manual RAG assembly.
- LlamaIndex reaches a working RAG answer in about four lines because it decides the pipeline; LangChain exposes each seam, which costs code but gives control and reuse inside agents and graphs.
- Rule of thumb: if the hard part is the data, start with LlamaIndex; if it is control flow, start with LangChain/LangGraph; combine them by exposing a LlamaIndex retriever as a tool in a LangGraph agent.

## Feeds

[LangChain](../concepts/langchain.md)
