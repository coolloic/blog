---
title: "Source: Notebook: How LLMs & transformers work"
summary: "The owner's interactive tutorial on tokens, embeddings, attention, the transformer block, next-token sampling and training."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** interactive tutorial (owner's Notebook site)
- **Author:** Loic (coolloic/Notebook)
- **Date:** accessed 2026-11-14
- **Original:** [How LLMs & transformers work](https://coolloic.github.io/Notebook/transformers.html)

## Summary

A conceptual walkthrough of the LLM forward pass for builders: text becomes tokens, tokens become position-aware vectors, stacked attention + feed-forward layers mix in context, and logits are turned into a sampled next token, repeated autoregressively. Ends with practical implications and a quiz.

## Key claims

- An LLM predicts the next token, appends it and repeats (autoregressive generation).
- Tokens come from a fixed vocabulary of roughly 50k-200k entries; in English a token averages about 4 characters (~750 words per 1,000 tokens).
- Self-attention lets each token gather context from others via queries, keys and values; multi-head attention learns several relation types in parallel.
- A transformer layer is attention then feed-forward, with residuals and normalisation; dozens to 100+ layers are stacked.
- Temperature, top-p/top-k and max tokens control sampling and length.
- Builders must budget the context window (prompt + retrieved data + output) and pay per token.

## Feeds

[Transformer architecture](../concepts/transformer-architecture.md) · [Tokenization](../concepts/tokenization.md) · [Context window](../concepts/context-window.md) · [Sampling parameters](../concepts/sampling-parameters.md)
