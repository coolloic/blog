---
title: "Source: Sun et al. 2023: RankGPT (Is ChatGPT Good at Search?)"
summary: "EMNLP 2023 paper showing instructed LLMs can rerank as well as supervised rerankers, and distilling that into small models."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (EMNLP 2023), arXiv:2304.09542
- **Author:** Weiwei Sun, Lingyong Yan, Xinyu Ma, et al.
- **Date:** 2023-04-19 (v3 2024-12-28)
- **Original:** [arXiv:2304.09542](https://arxiv.org/abs/2304.09542)

## Summary

Studies generative LLMs (ChatGPT, GPT-4) as rerankers that output a permutation of candidate passages, and introduces a contamination-free test set.

## Key claims

- Properly instructed LLMs are competitive with, and sometimes better than, supervised rerankers on standard IR benchmarks.
- NovelEval, a test set built on recent knowledge, addresses training-data contamination.
- Permutation distillation: a distilled 440M model beat a 3B supervised model on BEIR.

## Feeds

[Reranking](../concepts/reranking.md)
