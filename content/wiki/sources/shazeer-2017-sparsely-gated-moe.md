---
title: "Source: Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"
summary: "Shazeer et al. (2017) introduce the sparsely-gated MoE layer: a trainable gate picks a few of thousands of feed-forward experts per input, decoupling capacity from compute."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "paper"]
---

- **What:** paper, arXiv:1701.06538
- **Authors:** Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis, Quoc Le, Geoffrey Hinton, Jeff Dean (Google)
- **Date:** 2017-01-23
- **Original:** [arXiv:1701.06538](https://arxiv.org/abs/1701.06538)

## Summary

The paper that made conditional computation practical at scale. A layer holds up to thousands of feed-forward sub-networks ("experts"); a trainable gating network picks a sparse subset per example, so parameter count grows far faster than compute. The layer was inserted between stacked LSTM layers for language modelling and translation. The Hugging Face MoE explainer describes the gate as noisy top-k gating (tunable noise added to logits, only the top k kept).

## Key claims

- Sparse gating gives over 1000x more model capacity with only minor losses in computational efficiency on GPU clusters.
- MoE layers with up to 137B parameters, applied between LSTM layers, beat the prior state of the art on language modelling and translation at lower compute.
- The gate is trained jointly with the experts.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
