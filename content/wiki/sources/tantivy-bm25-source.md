---
title: "Source: Tantivy bm25.rs (source code)"
summary: "Tantivy's BM25 scorer: hard-coded k1 = 1.2 and b = 0.75, Lucene-style IDF, (k1+1) factor, and a 256-entry fieldnorm cache."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** open-source Rust library source code and API docs (tantivy 0.27.0 on docs.rs)
- **Author:** Quickwit / tantivy contributors
- **Date:** read 2026-11-14
- **Original:** [src/query/bm25.rs](https://github.com/quickwit-oss/tantivy/blob/main/src/query/bm25.rs) · [Bm25Weight on docs.rs](https://docs.rs/tantivy/latest/tantivy/query/struct.Bm25Weight.html)

## Summary

Tantivy is a Lucene-inspired full-text search library in Rust. Its BM25 weight is built from collection statistics supplied by a `Bm25StatisticsProvider` (by default the `Searcher`, summing over segments).

## Key claims

- k1 = 1.2 and b = 0.75 are compile-time constants; the public constructors take no k1 or b, only term statistics and an optional multiplicative boost.
- IDF = ln(1 + (N - n + 0.5)/(n + 0.5)), the same form as Lucene.
- The explanation output includes a (K1 + 1) factor in the tf component, unlike current Lucene; rankings are unaffected.
- Document length is a one-byte fieldnorm id; the length-normalization term is cached for all 256 ids.
- Statistics (total tokens, document count, document frequency) can be overridden by implementing the provider trait, e.g. to share statistics across indexes.

## Feeds

[BM25](../concepts/bm25.md)
