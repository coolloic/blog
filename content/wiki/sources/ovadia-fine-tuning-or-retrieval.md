---
title: "Source: Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs"
summary: "A 2023 Microsoft study finding RAG beats unsupervised fine-tuning for injecting knowledge."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2312.05934)
- **Author:** Oded Ovadia, Menachem Brief, Moshik Mishaeli, Oren Elisha (Microsoft)
- **Date:** 2023-12-10 (v3 2024-01-30)
- **Original:** [arXiv:2312.05934](https://arxiv.org/abs/2312.05934)

## Summary

Compares unsupervised fine-tuning (continued training on documents) with RAG on knowledge-intensive tasks across several topics.

## Key claims

- RAG consistently outperformed unsupervised fine-tuning, for both previously seen and entirely new facts.
- LLMs struggle to learn new facts via unsupervised fine-tuning.
- Training on many paraphrases of the same fact may partly help.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md)
