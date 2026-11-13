---
title: "Source: DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model"
summary: "DeepSeek paper introducing Multi-head Latent Attention, which compresses the KV cache into a latent vector."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper, arXiv:2405.04434
- **Author:** DeepSeek-AI
- **Date:** 2024-05-07
- **Original:** [DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model](https://arxiv.org/abs/2405.04434)

## Summary

DeepSeek-V2 is a 236B-parameter MoE (21B active per token) whose Multi-head Latent Attention stores a compressed latent instead of full per-head keys and values.

## Key claims

- MLA reduces KV cache by 93.3% versus DeepSeek 67B.
- Maximum generation throughput rises to 5.76x that of DeepSeek 67B.
- 236B total parameters, 21B activated per token.

## Feeds

[KV cache](../concepts/kv-cache.md)
