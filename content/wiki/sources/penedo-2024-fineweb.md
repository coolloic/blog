---
title: "Source: The FineWeb Datasets (Penedo et al., Hugging Face, 2024)"
summary: "Hugging Face's 15T-token open web pretraining dataset from 96 Common Crawl snapshots, with ablated filtering and dedup choices and the 1.3T-token FineWeb-Edu subset."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2406.17557), NeurIPS 2024 Datasets and Benchmarks
- **Authors:** Guilherme Penedo, Hynek Kydlíček, Loubna Ben Allal, Anton Lozhkov, Margaret Mitchell, Colin Raffel, Leandro Von Werra, Thomas Wolf
- **Date:** 2024-06-25 (v2 2024-10-31)
- **Original:** [arxiv.org/abs/2406.17557](https://arxiv.org/abs/2406.17557)

## Summary

Builds an open pretraining corpus from raw Common Crawl and documents each curation decision with small-model ablations, especially deduplication and filtering. FineWeb-Edu is a subset kept by an LLM-annotated "educational value" classifier. The datasets, curation code and ablation models are released.

## Key claims

- FineWeb: 15T tokens from 96 Common Crawl snapshots; models trained on it beat those trained on other open web datasets.
- Deduplication and filtering choices were ablated in depth rather than assumed.
- FineWeb-Edu (1.3T tokens) gives much better results on knowledge- and reasoning-heavy benchmarks such as MMLU and ARC.

## Feeds

[LLM training pipeline](../concepts/llm-training-pipeline.md)
