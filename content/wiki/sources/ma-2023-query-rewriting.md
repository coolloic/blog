---
title: "Source: Ma et al. 2023: Query Rewriting for Retrieval-Augmented LLMs"
summary: "EMNLP 2023 paper proposing Rewrite-Retrieve-Read, with a small rewriter trained by RL from the reader's feedback."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (EMNLP 2023), arXiv:2305.14283
- **Author:** Xinbei Ma, Yeyun Gong, Pengcheng He, Hai Zhao, Nan Duan
- **Date:** 2023-05-23
- **Original:** [arXiv:2305.14283](https://arxiv.org/abs/2305.14283)

## Summary

Argues that the query, not just the retriever or reader, should be adapted: rewrite the input before retrieval.

## Key claims

- Pipeline: rewrite the query with an LLM, retrieve with a web search engine, read with a frozen LLM.
- A trainable variant uses a small language model as rewriter, trained with reinforcement learning from the reader's feedback.
- Consistent gains on open-domain and multiple-choice QA.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
