---
title: "Source: Mixtral of Experts"
summary: "Mistral AI's Mixtral 8x7B paper: an 8-expert top-2 sparse MoE (~47B total, ~13B active) that matched Llama 2 70B, plus an analysis of what the router actually learns."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "paper", "mistral"]
---

- **What:** paper, arXiv:2401.04088
- **Authors:** Albert Q. Jiang and 25 co-authors (Mistral AI)
- **Date:** 2024-01-08
- **Original:** [arXiv:2401.04088](https://arxiv.org/abs/2401.04088)

## Summary

Mixtral 8x7B keeps the Mistral 7B architecture but replaces each feed-forward block with 8 SwiGLU experts, of which a router picks 2 per token per layer. It was the first widely used open-weight MoE (Apache 2.0) and showed that a sparse model with ~13B active parameters could match a 70B dense model.

## Key claims

- Gate: G(x) = Softmax(TopK(x . W_g)) with K = 2; logits outside the top-k are set to minus infinity, and the output is the gate-weighted sum of the two experts.
- ~47B parameters stored, ~13B active per token; 32k context.
- Matches or beats Llama 2 70B and GPT-3.5 on the evaluated benchmarks, with large margins in maths, code and multilingual tasks.
- **Routing analysis:** no clear topic specialisation (ArXiv, PubMed and PhilPapers route almost identically); routing is more syntactic (e.g. Python `self` and indentation tokens go to consistent experts). Consecutive tokens reuse the same expert well above chance in deeper layers.
- **Serving:** compute follows active parameters but memory follows total parameters; MoE layers suit batched, high-arithmetic-intensity workloads; under expert parallelism, routing locality can overload individual GPUs. MegaBlocks expresses MoE FFNs as block-sparse matmuls to handle uneven per-expert token counts.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
