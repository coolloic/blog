---
title: "Source: MMTEB: Massive Multilingual Text Embedding Benchmark (Enevoldsen et al.)"
summary: "Community expansion of MTEB to 500+ tasks and 250+ languages, with cheaper downsampled benchmarks and a refreshed English MTEB(eng, v2)."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings", "benchmarks", "papers"]
---

- **What:** research paper, arXiv:2502.13595 (ICLR 2025)
- **Authors:** Kenneth Enevoldsen and a large open collaboration (including Niklas Muennighoff and Siva Reddy)
- **Date:** submitted February 2025; v4 revised 13 November 2025
- **Original:** [arxiv.org/abs/2502.13595](https://arxiv.org/abs/2502.13595)

## Summary

MMTEB grows MTEB into more than 500 quality-controlled tasks across 10 categories, adding instruction following, long-document retrieval and code retrieval. To keep evaluation affordable it downsamples retrieval corpora, bootstraps clustering, and selects a smaller representative task set. The refreshed English benchmark, MTEB(eng, v2), keeps about 41 tasks and ranks models similarly to v1.

## Key claims

- 500+ tasks, 10 task categories, 250+ languages (more counting bitext mining).
- Best public model overall at the time was multilingual-e5-large-instruct (560M parameters).
- 7B LLM-based embedders (e.g. e5-mistral-7b-instruct, GritLM-7B) lead some subsets but smaller XLM-R-based models often win on low-resource languages.
- Instruction-tuned embedders clearly beat non-instruction-tuned counterparts.
- Full MTEB(eng, v1) could take up to two days on one A100 for moderate LLMs; MTEB(eng, v2) takes about 3.1 hours on an H100 for a 7B model.
- MTEB(eng, v2) rankings correlate with v1 at Spearman 0.90.

## Feeds

[Embeddings](../concepts/embeddings.md)
