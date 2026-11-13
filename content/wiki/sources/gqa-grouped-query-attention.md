---
title: "Source: GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints"
summary: "EMNLP 2023 paper introducing grouped-query attention as a middle ground between MHA and MQA."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (EMNLP 2023), arXiv:2305.13245
- **Author:** Joshua Ainslie, James Lee-Thorp, Michiel de Jong, Yury Zemlyanskiy, Federico Lebron, Sumit Sanghai (Google Research)
- **Date:** 2023-05-22
- **Original:** [GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](https://arxiv.org/abs/2305.13245)

## Summary

Multi-query attention (one K/V head) makes decoding fast but can hurt quality. GQA uses an intermediate number of K/V heads shared by groups of query heads, and existing multi-head checkpoints can be uptrained into GQA cheaply.

## Key claims

- MQA uses a single key-value head and drastically speeds up decoder inference but can degrade quality.
- GQA uses more than one but fewer K/V heads than query heads.
- Uptraining MHA checkpoints costs about 5% of original pre-training compute.
- Uptrained GQA reaches quality close to MHA at speed comparable to MQA.

## Feeds

[KV cache](../concepts/kv-cache.md)
