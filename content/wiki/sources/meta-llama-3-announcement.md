---
title: "Source: Introducing Meta Llama 3 (Meta AI blog)"
summary: "Meta's Llama 3 launch post describing a standard decoder-only transformer with a 128K-token vocabulary and grouped-query attention."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** vendor engineering blog post
- **Author:** Meta AI
- **Date:** 2024-04-18
- **Original:** [Introducing Meta Llama 3](https://ai.meta.com/blog/meta-llama-3/)

## Summary

The announcement describes the Llama 3 8B and 70B models and the architectural choices behind them, a useful reference for what a typical open-weight decoder-only LLM looked like in 2024.

## Key claims

- Llama 3 uses a relatively standard decoder-only transformer.
- Its tokenizer has a 128K-token vocabulary and produces up to 15% fewer tokens than Llama 2's.
- Both 8B and 70B models use grouped-query attention.
- Training sequences were 8,192 tokens, with masking so self-attention does not cross document boundaries.

## Feeds

[Transformer architecture](../concepts/transformer-architecture.md) · [Tokenization](../concepts/tokenization.md)
