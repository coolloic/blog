---
title: "Source: Notebook experiment 22: Agentic RAG"
summary: "Runnable scaffold where retrieval is a tool a ReAct agent calls on demand."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/22-agentic-rag](https://github.com/coolloic/Notebook/tree/main/experiments/22-agentic-rag)

## Summary

A LangGraph `create_react_agent` with a `search_policy` retriever tool over FAISS. The agent decides whether and what to retrieve, in contrast to experiment 13 which always retrieves.

## Key claims

- Agentic RAG turns retrieval into a tool rather than a fixed pipeline step.
- It suits mixed workloads where some questions need the knowledge base and others need several targeted lookups.

## Feeds

[Agentic RAG](../concepts/agentic-rag.md)
