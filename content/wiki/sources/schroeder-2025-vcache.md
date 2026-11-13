---
title: "Source: vCache, verified semantic prompt caching (Schroeder et al., 2025)"
summary: "Shows that a single static similarity threshold cannot bound a semantic cache's error rate, and proposes per-entry thresholds learned online with a user-set error bound; ICLR 2026."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "evaluation"]
---

- **What:** research paper, arXiv 2502.03771 (v5, 2026-02-21), accepted at ICLR 2026
- **Authors:** Luis Gaspar Schroeder, Aditya Desai, Alejandro Cuadron, Kyle Chu, Shu Liu, Mark Zhao, Stephan Krusche, Alfons Kemper, Matei Zaharia, Joseph E. Gonzalez (UC Berkeley, TU Munich and others)
- **Date:** 2025-02-06 (first version)
- **Original:** [arXiv:2502.03771](https://arxiv.org/abs/2502.03771)

## Summary

Existing semantic caches (GPTCache-style) apply one cosine threshold to every entry. The paper shows similarity is a poor and uneven predictor of whether a cached answer is correct, so a global threshold gives no error guarantee. vCache instead learns, per cached embedding, the probability that a hit at a given similarity is correct, and decides whether to serve or to re-query the LLM so that the overall error rate stays below a user-chosen δ.

## Key claims

- On a classification benchmark, the similarity distributions of correct and incorrect hits overlap almost completely (means about 0.84 vs 0.85). The best threshold varies per embedding from about 0.71 to 1.0.
- With static thresholds, the GPTCache baseline's error rate kept rising as the cache filled.
- Algorithm: per entry, fit a sigmoid of P(correct | similarity) online from labels gathered when the LLM is called anyway; from confidence bounds compute an exploration probability; with that probability call the LLM (and learn), otherwise serve the cache. Under i.i.d. and sigmoid-fit assumptions, correctness is at least 1 - δ.
- "Correct" means the cached response matches what the LLM would have produced: string match for classification, an LLM judge for open-ended answers (can run asynchronously).
- Released benchmarks: SemCacheLMArena (60k prompts), SemCacheClassification (45k), SemCacheSearchQueries (150k), SemCacheCombo (27.5k, no true hits).
- Results: up to 12.5x higher hit rate and up to 26x lower error rate than static-threshold and fine-tuned-embedding baselines. Example: δ = 0.02 on the classification set gave a 35.5% hit rate at 1.2% error, cutting a vLLM run from 240 to 170 minutes.
- Overhead: about 1.5 ms per threshold update; embedding about 18 ms.
- Limitation: the guarantee depends on the i.i.d. and sigmoid assumptions.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
