---
title: "Source: Introduction to Information Retrieval, ch. 8: Evaluation in IR (Manning, Raghavan, Schütze)"
summary: "The standard textbook chapter on IR evaluation: precision, recall, MAP, precision@k, R-precision, NDCG, pooling and assessor agreement."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval"]
---

- **What:** textbook chapter (Cambridge University Press), free online edition
- **Authors:** Christopher D. Manning, Prabhakar Raghavan, Hinrich Schütze
- **Date:** book published 2008; online edition dated 2009 (chapter PDF marked draft of 1 April 2009); read 2026-11-14
- **Original:** [Chapter 8 PDF](https://nlp.stanford.edu/IR-book/pdf/08eval.pdf) · [HTML edition](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html)

## Summary

Defines the classical test-collection methodology (documents, information needs, relevance judgments) and the unranked and ranked metrics built on it. Section 8.4 covers ranked retrieval: interpolated precision-recall curves, MAP, precision at k, R-precision, ROC and NDCG. Section 8.5 covers how relevance judgments are collected (pooling) and how much judges agree (kappa).

## Key claims

- **Average precision** for one query averages the precision at the rank of each relevant document; a relevant document that is never retrieved contributes precision 0. **MAP** is the arithmetic mean of AP over queries, so every query weighs the same regardless of how many relevant documents it has.
- AP approximates the area under the uninterpolated precision-recall curve. MAP is described as having especially good discrimination and stability, and was the most standard TREC measure.
- MAP varies far more across queries for one system (e.g. 0.1 to 0.7) than across systems for one query, so the query set must be large and diverse.
- **Precision at k** needs no estimate of the number of relevant documents, but is the least stable common measure and averages badly, because the number of relevant documents per query caps it (with 8 relevant documents, even a perfect system scores 0.4 at P@20).
- **R-precision** = precision at rank |Rel|; at that cut-off precision equals recall (the break-even point). It correlates highly with MAP empirically.
- **NDCG@k** is for graded relevance: gain (2^R - 1) / log2(1 + m) summed over the top k ranks, normalized per query by the ideal ranking's score so a perfect ranking scores 1, then averaged over queries.
- **Pooling:** for large collections only the union of the top k results from several systems (plus other sources) is judged; unjudged documents are treated as non-relevant.
- **Kappa:** rule of thumb above 0.8 good, 0.67 to 0.8 fair, below 0.67 dubious; TREC and medical IR interjudge agreement typically sits in the "fair" band. Swapping which judge is gold changes absolute scores considerably but rarely changes the relative ranking of systems.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)
