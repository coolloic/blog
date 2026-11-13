---
title: "Source: Es et al. 2023: RAGAS, Automated Evaluation of Retrieval Augmented Generation"
summary: "Paper introducing Ragas: reference-free, LLM-computed faithfulness, answer relevance and context relevance metrics."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (EACL 2024 demo), arXiv:2309.15217
- **Author:** Shahul Es, Jithin James, Luis Espinosa-Anke, Steven Schockaert
- **Date:** 2023-09-26 (v2 2025-04-28)
- **Original:** [arXiv:2309.15217](https://arxiv.org/abs/2309.15217)

## Summary

Proposes metrics that score a RAG pipeline without human ground-truth answers, by asking an LLM to decompose and check outputs.

## Key claims

- Faithfulness: split the answer into statements, check each against the retrieved context; score = supported / total.
- Answer relevance: generate n questions from the answer, embed them, average cosine similarity to the original question.
- Context relevance: extract the sentences of the context needed to answer; score = extracted / total sentences.
- Agreement with human judgments on WikiEval: 0.95 faithfulness, 0.78 answer relevance, 0.70 context relevance, beating direct GPT scoring baselines.
- Context relevance was the hardest dimension to evaluate.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
