---
title: "Source: Robertson & Zaragoza 2009: The Probabilistic Relevance Framework: BM25 and Beyond"
summary: "The canonical survey deriving BM25 and BM25F from the probabilistic relevance framework, with guidance on k1 and b."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** survey monograph, Foundations and Trends in Information Retrieval 3(4), pp. 333-389, DOI 10.1561/1500000019
- **Author:** Stephen Robertson, Hugo Zaragoza
- **Date:** 2009
- **Original:** [PDF (author copy)](https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf)

## Summary

Lays out the probabilistic relevance framework (PRF) behind the Okapi line of work: the binary independence model, the Robertson/Spärck Jones (RSJ) weight, the "eliteness" model that motivates a saturating term-frequency function, document-length normalization, and the field-aware extension BM25F. It is the reference most later papers cite for "the" BM25 formula.

## Key claims

- BM25 combines an RSJ weight (which reduces to an IDF-like weight without relevance data) with a saturating function of term frequency, summed over query terms.
- Saturation follows from the eliteness model: a term's contribution approaches a ceiling no matter how often it repeats, unlike raw tf or 1 + log tf, which grow without bound.
- Length normalization uses B = (1 - b) + b · dl/avdl, applied to tf before saturation; b = 1 is full normalization, b = 0 turns it off.
- The model gives no theoretical values for k1 and b; experiments suggest 0.5 < b < 0.8 and 1.2 < k1 < 2 work in many settings, but optima depend on documents and queries.
- Published BM25 versions differ: the original had a query-term-frequency component (k3) and an extra length correction, both found unimportant; adding (k1 + 1) to the numerator rescales all terms equally and does not change rankings.
- BM25F: for structured documents (title, body, anchor text), accumulate weighted term frequency across fields first, then apply saturation once per term, rather than scoring each field separately and summing.

## Feeds

[BM25](../concepts/bm25.md)
