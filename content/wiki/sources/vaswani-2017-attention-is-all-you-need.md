---
title: "Source: Attention Is All You Need (Vaswani et al., 2017)"
summary: "The paper that introduced the Transformer: attention-only sequence modelling with multi-head scaled dot-product attention."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 1706.03762, NeurIPS 2017)
- **Author:** Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin (Google)
- **Date:** 2017-06-12 (v1); revised 2023-08-02 (v7)
- **Original:** [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)

## Summary

The paper replaces recurrence and convolution in sequence-to-sequence models with stacked attention layers. Each layer computes scaled dot-product attention (queries matched against keys, softmax, weighted sum of values), runs several attention heads in parallel, and follows attention with a position-wise feed-forward network, with residual connections and layer normalisation around each sub-layer. Because attention itself ignores order, the model adds fixed sinusoidal positional encodings to the token embeddings. The original model is an encoder-decoder for machine translation; the decoder uses a causal mask so a position can only attend to earlier positions.

## Key claims

- The Transformer relies entirely on attention, with no recurrence or convolution, which makes training far more parallelisable.
- Attention is computed as softmax(QK^T / sqrt(d_k)) V; the 1/sqrt(d_k) scaling keeps dot products from growing with dimension and saturating the softmax.
- Multi-head attention runs h attention functions on different learned projections so the model can attend to different representation subspaces at once (the base model uses h = 8, d_model = 512).
- Self-attention connects any two positions in a constant number of sequential operations, but its per-layer cost grows with the square of sequence length.
- Sinusoidal positional encodings are added to embeddings to inject order information.
- Reported 28.4 BLEU on WMT 2014 English-German and 41.8 BLEU on English-French (single model, 3.5 days on eight GPUs).

## Feeds

[Transformer architecture](../concepts/transformer-architecture.md)
