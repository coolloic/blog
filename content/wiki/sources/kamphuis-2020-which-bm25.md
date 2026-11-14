---
title: "Source: Kamphuis et al. 2020: Which BM25 Do You Mean?"
summary: "ECIR 2020 reproducibility study finding no significant effectiveness differences among eight BM25 variants, including Lucene's lossy length encoding."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** reproducibility paper, ECIR 2020
- **Author:** Chris Kamphuis, Arjen P. de Vries, Leonid Boytsov, Jimmy Lin
- **Date:** 2020
- **Original:** [Preprint PDF](https://cs.uwaterloo.ca/~jimmylin/publications/Kamphuis_etal_ECIR2020_preprint.pdf)

## Summary

"BM25" names a family of scoring functions. The authors implement eight variants (Robertson et al., Lucene default, Lucene with exact lengths, ATIRE, BM25L, BM25+, BM25-adpt, TFl∘δ∘p×IDF) over the same Lucene/Anserini index, exported to a relational database, and compare them on three TREC newswire collections (Robust04, Core17, Core18).

## Key claims

- The Robertson et al. IDF, log((N - df + 0.5)/(df + 0.5)), goes negative when a term occurs in more than half the documents; Lucene adds 1 inside the log to avoid that.
- Lucene (as of version 8) stores document length lossily in one byte, so only 256 distinct lengths exist and the length-normalization term can be precomputed per length.
- ATIRE uses log(N/df) as IDF and multiplies tf by (k1 + 1), which does not change rankings.
- BM25L and BM25+ add a constant δ to counter BM25's over-penalizing of long documents; BM25-adpt picks a k1 per term.
- With k1 = 0.9 and b = 0.4 (Anserini's defaults), ANOVA and Tukey's HSD find no significant differences between any variants on any collection.
- Mundane choices such as stopword lists often move results more than the choice of BM25 variant.
- Lucene's lossy length approximation costs negligible effectiveness and its speed benefit is also negligible.
- Using a variant that avoids negative scores may still be worthwhile.

## Feeds

[BM25](../concepts/bm25.md)
