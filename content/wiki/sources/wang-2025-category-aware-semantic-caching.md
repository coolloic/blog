---
title: "Source: Category-aware semantic caching for heterogeneous LLM workloads (Wang et al., 2025)"
summary: "Argues that thresholds, TTLs and quotas should vary by query category because repetition, embedding density and staleness differ; gives a break-even model for remote vs local vector search."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "cost"]
---

- **What:** arXiv preprint 2510.26835 (v1), self-described as a position paper (13 pages)
- **Authors:** Chen Wang, Xunzhuo Liu, Yue Zhu, Alaa Youssef, Priya Nagpurkar, Huamin Chen (IBM Research, Red Hat, Tencent; vLLM community)
- **Date:** 2025-10-29
- **Original:** [arXiv:2510.26835](https://arxiv.org/abs/2510.26835)

## Summary

A design paper. Mixed LLM traffic contains categories with very different cacheability: code questions repeat heavily and cluster tightly in embedding space, conversation is near-unique and spread out, financial and news answers go stale in minutes. One global threshold and TTL is wrong for all of them. The authors propose per-category policies plus a hybrid architecture that keeps the vector index in local memory so a miss is cheap.

## Key claims

- Stated hit rates: 40-60% for high-repetition categories (code, common documentation) and 5-15% for low-repetition or volatile ones. These figures are presented as representative; the paper names no production dataset or measurement method.
- Dense spaces need strict thresholds: in code, 0.80 is said to give about 15% false matches (e.g. ascending vs descending sort), 0.90 about 3%. Sparse conversational spaces can use about 0.75. Rule of thumb: 0.88+ for dense, 0.78 or lower for sparse.
- TTL by staleness: days for code, hours to a day for docs, about 5 minutes for financial data, minutes for news/weather.
- Break-even: if every lookup pays about 30 ms to a remote vector DB, the hit rate must exceed about 30/(LLM latency - 5 ms), i.e. roughly 6-15% (abstract says 15-20%); with a local HNSW index (about 2 ms miss) it drops below about 1% (abstract says 3-5%). The paper is internally inconsistent on these numbers; the abstract's 15-20% (remote) and 3-5% (local) are the headline figures, and all are modelled rather than measured.
- Load-aware policy loosening is projected (not measured) to cut 9-17% of traffic to overloaded models.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
