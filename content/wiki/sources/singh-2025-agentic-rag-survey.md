---
title: "Source: Singh et al. 2025: Agentic Retrieval-Augmented Generation, a Survey"
summary: "Survey that classifies agentic RAG architectures (router, multi-agent, hierarchical, corrective, adaptive, graph-based, document workflows)."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** survey paper, arXiv:2501.09136
- **Author:** Aditi Singh, Abul Ehtesham, Saket Kumar, Tala Talaei Khoei, Athanasios V. Vasilakos
- **Date:** 2025-01-15 (v4 2026-04-01)
- **Original:** [arXiv:2501.09136](https://arxiv.org/abs/2501.09136)

## Summary

Surveys systems that embed agents in the RAG pipeline, using reflection, planning, tool use and multi-agent collaboration to manage retrieval dynamically.

## Key claims

- Single-agent router: one agent routes each query to SQL, vector search, web search or another source.
- Multi-agent and hierarchical: specialized retrieval agents per source, coordinated by a master or by tiers.
- Corrective: agents grade retrieved documents, refine queries and fall back to external search.
- Adaptive: a classifier estimates query complexity and chooses no retrieval, single-step or multi-step retrieval.
- Graph-based and agentic document workflows extend the pattern to knowledge graphs and end-to-end document processing.
- Open challenges: evaluation, coordination, memory, computational overhead and latency, governance.

## Feeds

[Agentic RAG](../concepts/agentic-rag.md)
