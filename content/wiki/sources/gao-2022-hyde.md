---
title: "Source: Gao et al. 2022: HyDE (Precise Zero-Shot Dense Retrieval without Relevance Labels)"
summary: "Paper introducing Hypothetical Document Embeddings: embed an LLM-written fake answer instead of the query."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (ACL 2023), arXiv:2212.10496
- **Author:** Luyu Gao, Xueguang Ma, Jimmy Lin, Jamie Callan
- **Date:** 2022-12-20
- **Original:** [arXiv:2212.10496](https://arxiv.org/abs/2212.10496)

## Summary

An instruction-following LLM writes a hypothetical document that answers the query; an unsupervised contrastive encoder embeds it, and that vector is used to find real documents.

## Key claims

- The hypothetical document may contain false details; the encoder's dense bottleneck is expected to filter them out.
- Significantly outperforms the unsupervised Contriever retriever and is comparable to fine-tuned retrievers.
- Works across web search, QA and fact verification, and in several languages (e.g. Swahili, Korean, Japanese).

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
