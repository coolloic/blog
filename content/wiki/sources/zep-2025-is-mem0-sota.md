---
title: "Source: Lies, Damn Lies, & Statistics: Is Mem0 Really SOTA in Agent Memory? (Zep, 2025)"
summary: "Zep's rebuttal of the Mem0 paper: argues LoCoMo is too short and noisy, says Mem0 misconfigured Zep, and reports a corrected Zep LoCoMo J score of 75.14%."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "benchmarks"]
---

- **What:** vendor engineering blog post (Zep is a competing memory vendor)
- **Authors:** Daniel Chalef, Preston Rasmussen (Zep)
- **Date:** 6 May 2025 (page metadata shows a later modification, 3 June 2026)
- **Original:** [getzep.com/blog/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory](https://www.getzep.com/blog/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/)

## Summary

A direct response to the [Mem0 paper](chhikara-2025-mem0.md). Zep attacks both the benchmark (LoCoMo) and how Mem0 ran Zep as a baseline, then publishes its own rerun. Read it as one vendor criticising another: the critique of LoCoMo itself is the most durable part.

## Key claims

- LoCoMo conversations average roughly 16k–26k tokens, which fit in modern context windows; Mem0's own full-context baseline (about 73%) beats Mem0's best (about 68%).
- LoCoMo has no knowledge-update questions, and its data has defects: category 5 lacks ground truth (excluded by both vendors), some image questions are unanswerable from the BLIP captions, some attribute statements to the wrong speaker, some are ambiguous.
- Mem0's Zep baseline was allegedly misconfigured: both speakers given the user role, timestamps appended to message text instead of Zep's `created_at` field, and searches run sequentially rather than in parallel (inflating latency).
- Zep's corrected LoCoMo J score: 75.14% ± 0.17, versus 65.99% reported for Zep in the Mem0 paper and 68.44% for Mem0's graph variant. The page's meta description claims a 24% margin, while the article body and correction note say about 10% relative.
- Corrected Zep p95 search latency 0.632 s (0.778 s as reported by Mem0) versus 0.657 s for Mem0 graph and 0.200 s for base Mem0 (which Zep calls not comparable).
- A later banner on the page cites a newer Zep LoCoMo score of about 80%; it is not part of the original analysis.

## Feeds

[Mem0](../concepts/mem0.md)
