---
title: "Source: Notebook experiment 24: Self-RAG"
summary: "Runnable scaffold of decide-to-retrieve, answer, grounding check, retry."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** runnable experiment in the owner's public Notebook repo
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [experiments/24-self-rag](https://github.com/coolloic/Notebook/tree/main/experiments/24-self-rag)

## Summary

A prompted approximation of Self-RAG: the model decides whether to retrieve, answers, checks whether the answer is grounded, and retrieves more and retries up to `MAX_TRIES`.

## Key claims

- Reflection decisions (retrieve? grounded?) let the model gate its own retrieval and self-verify.
- Retries must be bounded.

## Feeds

[Agentic RAG](../concepts/agentic-rag.md)
