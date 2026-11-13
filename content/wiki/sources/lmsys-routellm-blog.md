---
title: "Source: RouteLLM, an open-source framework for cost-effective LLM routing (LMSYS blog)"
summary: "LMSYS write-up of RouteLLM: four router architectures trained on Chatbot Arena preferences, with cost savings measured on MT Bench, MMLU and GSM8K for GPT-4 Turbo vs Mixtral 8x7B."
category: source
lastmod: 2026-11-14
tags: ["platforms", "routing", "cost"]
---

- **What:** research blog post accompanying the RouteLLM paper and open-source framework
- **Publisher:** LMSYS (Isaac Ong, Amjad Almahairi, Vincent Wu, Wei-Lin Chiang, Tianhao Wu, Joseph E. Gonzalez, M Waleed Kadous, Ion Stoica)
- **Date:** 2024-07-01
- **Original:** [lmsys.org/blog/2024-07-01-routellm](https://lmsys.org/blog/2024-07-01-routellm/)

## Summary

Presents four routers that decide, per query, between a strong model (GPT-4 Turbo) and a weak one (Mixtral 8x7B), trained on Chatbot Arena pairwise preferences, and reports how many strong-model calls each needs to keep 95% of GPT-4's benchmark score.

## Key claims

- Routers: similarity-weighted ranking (Elo weighted by query similarity), matrix factorization (learned query-model scoring), BERT classifier, causal-LLM classifier.
- Training data: Arena preferences, augmented with LLM-judge labels and about 1,500 MMLU golden-label samples (under 2% of data).
- MT Bench: matrix factorization keeps 95% of GPT-4 performance with 26% GPT-4 calls (about 48% cheaper than a random router); with judge-augmented data 14% (about 75% cheaper); over 85% cost reduction versus GPT-4 only.
- MMLU: Arena-only routers were near random; with golden-label augmentation the causal-LLM router needed 54% GPT-4 calls. Reported savings versus GPT-4 only: over 45% on MMLU, over 35% on GSM8K.
- Matched commercial routers (Martian, Unify) on MT Bench while over 40% cheaper; worked without retraining for Claude 3 Opus vs Llama 3 8B.

## Feeds

[Model routing and fallbacks](../concepts/model-routing-and-fallbacks.md)
