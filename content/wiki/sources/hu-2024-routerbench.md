---
title: "Source: RouterBench, a benchmark for multi-LLM routing (Hu et al., 2024)"
summary: "Benchmark of 405k inference outcomes across 11 models showing a large oracle-routing headroom, that simple predictive routers rarely beat a cost-quality baseline, and that cascades collapse once the judge errs more than about 20% of the time."
category: source
lastmod: 2026-11-14
tags: ["platforms", "routing", "evaluation"]
---

- **What:** research paper (arXiv:2403.12031, v2)
- **Authors:** Qitian Jason Hu, Jacob Bieker, Xiuyu Li, Nan Jiang, Benjamin Keigwin, Gaurav Ranganath, Kurt Keutzer, Shriyash Kaustubh Upadhyay (Martian)
- **Date:** 2024-03-18 (v2 2024-03-28)
- **Original:** [arXiv:2403.12031](https://arxiv.org/abs/2403.12031)

## Summary

Provides a dataset of precomputed model outputs, costs and correctness so routers can be compared offline, a theoretical frame (cost-quality convex hull), and the AIQ metric (normalised area under a router's cost-quality hull).

## Key claims

- 405,467 samples across 11 models and 8 datasets (64 tasks); other sections of the paper say 7 datasets.
- The oracle router (picks the cheapest correct model per query) far exceeds the best single model: on MMLU GPT-4 scores 0.828 at cost 4.09 while the oracle scores 0.957 at 0.30; on HellaSwag the oracle is about 28x cheaper than GPT-4 with higher accuracy.
- Simple predictive routers (KNN, MLP) do not significantly beat the "Zero router" (best mix of single models on the cost-quality hull): better on MMLU and Winogrande, roughly equal on HellaSwag and GSM8K, worse on ARC-Challenge and MBPP.
- Cascades beat the Zero router by a wide margin when the judge's error rate is at most 0.1, but performance may deteriorate rapidly above 0.2.
- On a RAG dataset, all routers significantly improved over the Zero router.

## Feeds

[Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
