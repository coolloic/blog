---
title: "Source: dsRAG (D-Star AI) README"
summary: "Open-source retrieval engine combining semantic sectioning, contextual chunk headers (AutoContext) and relevant segment extraction, with FinanceBench and KITE results."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "frameworks"]
---

- **What:** open-source project README (vendor benchmark claims)
- **Author/publisher:** D-Star AI (Zach McCormick, Nick McCormick)
- **Date:** read 2026-11-14
- **Original:** [github.com/D-Star-AI/dsRAG](https://github.com/D-Star-AI/dsRAG)

## Summary

dsRAG targets dense documents such as financial reports, legal documents and papers. At ingest, an LLM splits the document into titled sections (semantic sectioning), and AutoContext builds a **contextual chunk header** for each chunk from a generated document title and summary plus section titles (and optionally section summaries); the header is prepended before embedding. At query time, Relevant Segment Extraction (RSE) stitches clusters of adjacent relevant chunks into longer contiguous segments.

## Key claims

- Contextual chunk headers are deterministic templates of document- and section-level context, not a per-chunk free-text blurb.
- FinanceBench: 96.6% with dsRAG (Claude 3.5 Sonnet, mostly default settings) vs 19% for vanilla RAG in the original benchmark paper and 32% in the authors' own baseline.
- KITE average score (0-10): top-k baseline 4.72; RSE 6.73; CCH + top-k 6.04; CCH + RSE 8.42. Semantic sectioning was not used in these runs.
- RSE contributes slightly more than CCH; the combination is best.

## Feeds

[Contextual retrieval](../concepts/contextual-retrieval.md)
