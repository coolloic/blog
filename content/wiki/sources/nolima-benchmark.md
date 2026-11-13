---
title: "Source: NoLiMa: Long-Context Evaluation Beyond Literal Matching (ICML 2025)"
summary: "Benchmark where the needle shares almost no words with the question; 11 of 13 128K-class models fall below half their short-context score at 32K."
category: source
lastmod: 2026-11-14
tags: ["models", "long-context", "benchmarks"]
---

- **What:** benchmark paper (arXiv:2502.05167), ICML 2025
- **Authors:** Ali Modarressi, Hanieh Deilamsalehy, Franck Dernoncourt, Trung Bui, Ryan A. Rossi, Seunghyun Yoon, Hinrich Schuetze (LMU Munich and Adobe Research)
- **Date:** 7 February 2025 (v3 9 July 2025)
- **Original:** [arxiv.org/abs/2502.05167](https://arxiv.org/abs/2502.05167)

## Summary

Classic NIAH lets a model find the needle by literal string overlap with the question. NoLiMa builds needles with minimal lexical overlap, so the model must make a latent association (one hop of world knowledge) to locate it. Once that shortcut is removed, long-context performance collapses far earlier than advertised windows suggest.

## Key claims

- 13 LLMs tested, all claiming at least 128K context.
- Strong performance under 1K tokens, then steady degradation with length.
- At 32K, 11 of 13 models fall below 50% of their short-context baseline.
- GPT-4o, among the best, drops from 99.3% to 69.7% at 32K.
- Reasoning models and chain-of-thought prompting do not fix it.
- Attribution: attention struggles to retrieve relevant tokens in long contexts when no literal match exists.

## Feeds

[Long-context degradation](../concepts/long-context-degradation.md)
