---
title: "Source: UMBRELA: An Open-Source Reproduction of the Bing Relevance Assessor (Upadhyay et al.)"
summary: "Open-source GPT-4o relevance labeller reproducing Thomas et al.; low per-label agreement with TREC assessors but near-identical system rankings."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "retrieval", "llm-as-judge", "papers"]
---

- **What:** research paper and toolkit, arXiv:2406.06519
- **Authors:** Shivani Upadhyay, Ronak Pradeep, Nandan Thakur, Nick Craswell, Jimmy Lin
- **Date:** 10 June 2024
- **Original:** [arxiv.org/abs/2406.06519](https://arxiv.org/abs/2406.06519) · code: [github.com/castorini/umbrela](https://github.com/castorini/umbrela)

## Summary

Reimplements the Bing LLM relevance-assessment prompt (Thomas et al.) with GPT-4o and evaluates it against human qrels from the TREC Deep Learning tracks 2019-2023. The main finding is that LLM labels disagree with humans on many individual passages but rank retrieval systems almost the same way.

## Key claims

- Uses a 0-3 scale (irrelevant, related, highly relevant, perfectly relevant), zero-shot, temperature 0.
- Cohen's kappa with human labels: about 0.31-0.37 on the four-point scale and 0.42-0.50 binarised, depending on the year.
- System-ranking correlation on nDCG@10: Kendall tau 0.87-0.94 and Spearman rho 0.97-0.99 across the five tracks.
- Per-label accuracy is uneven (about 75% on label 0 but about 30% on label 2), and some disagreements trace to ambiguous topics rather than model error.
- Designed to plug into multi-stage retrieval and evaluation pipelines, so new runs can be judged without new human assessments.

## Feeds

[Retrieval metrics](../concepts/retrieval-metrics.md)
