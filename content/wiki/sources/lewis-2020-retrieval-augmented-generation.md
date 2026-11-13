---
title: "Source: Lewis et al. 2020: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
summary: "The NeurIPS 2020 paper that named RAG: a seq2seq generator conditioned on passages from a dense Wikipedia index."
category: source
lastmod: 2026-11-14
tags: ["retrieval"]
---

- **What:** research paper (NeurIPS 2020), arXiv:2005.11401
- **Author:** Patrick Lewis, Ethan Perez, et al. (Facebook AI Research, UCL, NYU)
- **Date:** 2020-05-22 (v4 2021-04-12)
- **Original:** [arXiv:2005.11401](https://arxiv.org/abs/2005.11401)

## Summary

Introduces RAG as a combination of parametric memory (a pre-trained seq2seq model) and non-parametric memory (a dense vector index of Wikipedia searched by a neural retriever), trained end to end. Two variants differ in how retrieved passages condition the output.

## Key claims

- Retriever: a DPR bi-encoder (BERT-base query and document encoders). Generator: BART-large (about 400M parameters).
- Index: a December 2018 Wikipedia dump split into about 21M 100-word passages, searched with FAISS (HNSW) maximum inner product search.
- RAG-Sequence uses the same retrieved passages for the whole output; RAG-Token can use a different passage for each generated token.
- Only the query encoder and generator are fine-tuned; the document encoder and index stay frozen, so the index never needs re-embedding during training.
- Swapping the index updates knowledge without retraining: on world-leader questions, matching index and year gave 70% / 68% accuracy, mismatched gave 12% / 4%.
- Set the state of the art on three open-domain QA tasks and produced more specific, factual text than a parametric-only baseline.

## Feeds

[Retrieval-augmented generation](../concepts/retrieval-augmented-generation.md)
