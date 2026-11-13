---
title: "Source: Mixture of Experts Explained (Hugging Face blog)"
summary: "Hugging Face's survey of MoE history, load balancing, capacity factor, fine-tuning behaviour and serving trade-offs, written around the Mixtral release."
category: source
lastmod: 2026-11-14
tags: ["models", "moe"]
---

- **What:** explainer blog post
- **Authors:** Omar Sanseviero, Lewis Tunstall, Philipp Schmid, Sourab Mangrulkar, Younes Belkada, Pedro Cuenca (Hugging Face)
- **Date:** 2023-12-11
- **Original:** [Mixture of Experts Explained](https://huggingface.co/blog/moe)

## Summary

A practitioner-oriented review of MoE research from the 1991 "Adaptive Mixture of Local Experts" paper through Shazeer's sparse gating, GShard, Switch and Mixtral. Strongest on the practical consequences: why routers collapse without balancing, how capacity works, why MoEs fine-tune differently, and when sparse beats dense.

## Key claims

- Without intervention the gate favours a few experts, which then get trained more and become more favoured; an auxiliary loss counters this.
- Capacity factor trades quality against communication; Switch did well at 1-1.25. Overflow tokens are passed on via the residual or dropped.
- MoEs overfit more in fine-tuning; higher regularisation inside experts helps.
- Freezing all non-expert weights hurts badly; freezing only the MoE layers is nearly as good as full fine-tuning and faster.
- Instruction tuning benefits MoEs more than dense models (Flan-MoE vs Flan-T5).
- Distilling back to dense keeps 30-40% of the sparsity gains (Switch experiments).
- Sparse MoEs suit high-throughput serving across many machines; dense models suit low-throughput, VRAM-limited settings.
- Mixtral 8x7B needs VRAM for a ~47B dense model but costs about as much per token as a ~12B one.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
