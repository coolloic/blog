---
title: "Source: Qwen2.5-72B-Instruct config.json"
summary: "Model configuration file used as a worked example for KV cache sizing."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** model configuration file on Hugging Face Hub
- **Author:** Qwen team (Alibaba)
- **Date:** 2024-09 (read 2026-11-14)
- **Original:** [Qwen2.5-72B-Instruct config.json](https://huggingface.co/Qwen/Qwen2.5-72B-Instruct/blob/main/config.json)

## Summary

The architecture hyperparameters of a typical 70B-class GQA model, which are exactly the inputs needed for KV cache math.

## Key claims

- 80 hidden layers, hidden size 8192, 64 attention heads (head dim 128), 8 key-value heads (GQA, 8 query heads per KV head).
- BF16 weights; max_position_embeddings 32768.

## Feeds

[KV cache](../concepts/kv-cache.md)
