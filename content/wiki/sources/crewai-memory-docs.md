---
title: "Source: Memory (CrewAI docs)"
summary: "CrewAI's unified Memory class: LanceDB storage, hierarchical scopes, LLM-assisted save and recall, defaults and limitations."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "memory"]
---

- **What:** official documentation page
- **Author:** CrewAI Inc.
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://docs.crewai.com/en/concepts/memory](https://docs.crewai.com/en/concepts/memory)

## Summary

A single `Memory` class replaces the older short-term, long-term, entity and external memory types. Memories are stored in LanceDB in a path-like scope tree, saved with LLM-inferred scope and importance, and recalled by shallow vector search or a deeper multi-step recall flow.

## Key claims

- Default storage: LanceDB under `./.crewai/memory`; custom backends via a `StorageBackend` protocol.
- Default embedder: OpenAI `text-embedding-3-large`; changing embedding models can break existing stores.
- Recall ranks by semantic similarity, recency (30-day half-life) and importance, weighted 0.5/0.3/0.2.
- Deep recall (default) uses an LLM; queries under 200 characters skip LLM analysis.
- Saves and deep recall send content to the configured LLM, a privacy consideration.
- Background save failures are emitted as events, not raised, so they can go unnoticed.

## Feeds

- [CrewAI](../concepts/crewai.md)
