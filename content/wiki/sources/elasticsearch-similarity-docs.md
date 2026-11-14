---
title: "Source: Elasticsearch docs: Similarity settings"
summary: "Elasticsearch reference for per-field similarity: BM25 is the default (k1 1.2, b 0.75), with DFR, DFI, IB, LM and scripted alternatives."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** vendor documentation
- **Author:** Elastic
- **Date:** read 2026-11-14
- **Original:** [Similarity settings](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity)

## Summary

Explains how to configure the scoring model per field in an index mapping, or as an index-wide default.

## Key claims

- The default similarity is BM25 with k1 = 1.2, b = 0.75 and `discount_overlaps` = true.
- Alternatives: DFR, DFI, IB, LMDirichlet (mu default 2000), LMJelinekMercer (lambda default 0.1), and `scripted`.
- Changing the index-wide default on an existing index requires closing it, updating settings and reopening it.
- Scripted similarities must return positive scores that do not decrease with term frequency and do not increase with document length, or top hits can be wrong.
- Similarity applies to `text` and `keyword` fields only.

## Feeds

[BM25](../concepts/bm25.md)
