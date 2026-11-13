---
title: "Source: Advancing semantic caching with domain-specific embeddings and synthetic data (Gill et al., 2025)"
summary: "Redis/Virginia Tech paper showing a small ModernBERT model fine-tuned for duplicate-query detection (LangCache-Embed) matches or beats large general embedding models for cache-hit precision."
category: source
lastmod: 2026-11-14
tags: ["inference", "caching", "embeddings"]
---

- **What:** arXiv preprint 2504.02268 (v1)
- **Authors:** Waris Gill, Justin Cechmanek, Tyler Hutcherson, Srijith Rajamohan, Jen Agarwal, Muhammad Ali Gulzar, Manvinder Singh, Benoit Dion (Redis, Virginia Tech)
- **Date:** 2025-04-03
- **Original:** [arXiv:2504.02268](https://arxiv.org/abs/2504.02268)

## Summary

General-purpose embedding models are trained for retrieval, not for deciding whether two queries deserve the *same answer*. The authors fine-tune a compact encoder on duplicate-question pairs (real and LLM-generated) and show precision gains on caching tasks at lower embedding latency. A vendor paper: Redis ships the resulting model behind LangCache.

## Key claims

- Base: ModernBERT (about 149M parameters), fine-tuned one epoch with online contrastive loss.
- Quora duplicates: precision rose from 64% to 84% (average precision 76% to 92%). Medical duplicates: precision 78% to 92%.
- A synthetic set of about 35k paraphrase and "related but different" pairs, generated with Qwen2.5-32B, alone raised medical precision from 78% to 87%.
- On the medical test set the synthetic-trained model scored precision 0.87 vs 0.85 for OpenAI text-embedding-3-large and 0.78 for Cohere embed-english-v3; Linq-Embed-Mistral (7B) had higher recall but costs far more to run.
- Training too long hurts other domains: six epochs on Quora gained 22 points there but lost 8 on medical (catastrophic forgetting).
- Large or closed embedding models add cost, network latency and data-privacy concerns to every cache lookup.

## Feeds

[Semantic caching](../concepts/semantic-caching.md)
