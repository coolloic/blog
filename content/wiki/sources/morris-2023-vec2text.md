---
title: "Source: Text Embeddings Reveal (Almost) As Much As Text"
summary: "Morris et al. (EMNLP 2023): Vec2Text iteratively inverts dense embeddings, recovering 92% of 32-token inputs exactly and full names from clinical notes."
category: source
lastmod: 2026-11-14
tags: ["privacy", "embeddings", "paper"]
---

- **What:** research paper, arXiv:2310.06816 (EMNLP 2023)
- **Authors:** John X. Morris, Volodymyr Kuleshov, Vitaly Shmatikov, Alexander M. Rush
- **Date:** 2023-10-10
- **Original:** [arXiv:2310.06816](https://arxiv.org/abs/2310.06816)

## Summary

Shows that a stored embedding is not a safe one-way hash of the text. Inversion is framed as controlled generation: propose text, re-embed it, and correct toward the target vector over several rounds.

## Key claims

- A naive decoder conditioned on the embedding does poorly; iterative correct-and-re-embed works.
- Recovers 92% of 32-token inputs exactly.
- Recovers personal information (full names) from embeddings of clinical notes.

## Feeds

[PII and data privacy](../concepts/pii-and-data-privacy.md)
