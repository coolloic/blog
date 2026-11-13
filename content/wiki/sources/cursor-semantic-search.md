---
title: "Source: Improving agent with semantic search (Cursor, 2025)"
summary: "Cursor's report that a custom, agent-trace-trained code embedding model plus grep improves agent accuracy by 12.5% on average, most on large codebases."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "retrieval"]
---

- **What:** engineering blog post
- **Authors:** Stefan Heule, Emily Jia, Naman Jain (Cursor)
- **Date:** 2025-11-06
- **Original:** [Improving agent with semantic search](https://cursor.com/blog/semsearch)

## Summary

Cursor's agent uses both regex search (grep) and semantic search over an embedding index of the codebase. Cursor trained its own embedding model on agent sessions: an LLM ranked which retrieved content would have helped most at each step, and the embedder was trained to reproduce those rankings.

## Key claims

- Offline (Cursor Context Bench): semantic search raised accuracy for every frequently used model, by 12.5% on average (range 6.5% to 23.5%).
- Online A/B: code retention +0.3% overall and +2.6% on codebases with 1,000+ files; dissatisfied follow-up requests were 2.2% higher without semantic search.
- Grep plus semantic search together performs best; neither alone.

## Feeds

[Coding agents](../concepts/coding-agents.md)
