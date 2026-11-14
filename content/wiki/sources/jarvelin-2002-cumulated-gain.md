---
title: "Source: Cumulated Gain-Based Evaluation of IR Techniques (Järvelin and Kekäläinen)"
summary: "The 2002 ACM TOIS paper that introduced cumulated gain, DCG and normalized DCG for graded relevance judgments."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval", "papers"]
---

- **What:** journal article, ACM Transactions on Information Systems 20(4), pp. 422-446, DOI 10.1145/582415.582418
- **Authors:** Kalervo Järvelin, Jaana Kekäläinen (University of Tampere)
- **Date:** October 2002
- **Original:** [ACM DL](https://dl.acm.org/doi/10.1145/582415.582418) · [author-hosted PDF](https://trepo.tuni.fi/handle/10024/65718)

## Summary

Argues that binary precision and recall hide the difference between retrieving highly relevant and marginally relevant documents, and proposes three measures for graded relevance: cumulated gain (CG), discounted cumulated gain (DCG) and their normalized versions relative to an ideal ranking (nCG, nDCG). Tested on TREC-style data re-judged on a four-point scale (0 to 3).

## Key claims

- **CG** at rank i is the running sum of the graded relevance scores of the documents at ranks 1..i.
- **DCG** divides each document's gain by log_b of its rank, so late documents count less. The base b models user patience (a larger base means a gentler discount). In the original definition ranks below b are not discounted at all, because log 1 = 0 and a discount there would boost the score.
- **Normalized (D)CG** divides the vector component-wise by the ideal (D)CG vector, giving 1 for ideal performance at every rank and values in [0, 1) otherwise.
- The ideal vector is built from the topic's whole recall base (all judged relevant documents, sorted by grade), not from the documents the system happened to retrieve.
- The measures reward systems that put highly relevant documents first, and the curves are easier to interpret from a user's point of view than precision-recall curves.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)
