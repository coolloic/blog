---
title: "Source: Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
summary: "Fedus, Zoph and Shazeer simplify MoE to top-1 routing and define the capacity factor, auxiliary balance loss, selective router precision and expert dropout used by later MoEs."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "paper"]
---

- **What:** paper, arXiv:2101.03961 (JMLR 2022)
- **Authors:** William Fedus, Barret Zoph, Noam Shazeer (Google)
- **Date:** 2021-01-11 (v3 2022-06-16)
- **Original:** [arXiv:2101.03961](https://arxiv.org/abs/2101.03961)

## Summary

Switch Transformer replaces each T5 feed-forward layer with an MoE layer that routes every token to exactly **one** expert. The paper is the reference for the engineering vocabulary of MoE training: expert capacity and capacity factor, token dropping, the auxiliary load-balancing loss, float32 routers inside bf16 training, reduced initialisation scale, expert dropout during fine-tuning, and distilling sparse models back to dense ones.

## Key claims

- **Top-1 routing** works, contrary to earlier belief that k>=2 was needed; it cuts router compute, halves required expert capacity and reduces communication.
- **Expert capacity** = (tokens per batch / number of experts) x capacity factor; values 1.0-2.0 tested. Tokens over capacity skip the expert and pass through the residual connection ("dropped"); keeping drops under ~1% mattered.
- **Auxiliary balance loss** = alpha x N x sum_i(f_i x P_i), where f_i is the fraction of tokens sent to expert i and P_i the mean router probability for it; alpha = 1e-2.
- **Selective precision:** pure bf16 diverged; computing only the router in float32 matched float32 quality at bf16 speed.
- **Initialisation:** scaling init down 10x improved quality and made runs far more stable across seeds.
- **Fine-tuning:** sparse models overfit more; dropout of 0.4 inside experts and 0.1 elsewhere beat uniform dropout (GLUE 85.2 vs 84.7).
- **Distillation:** a dense student keeps about 30% of the sparse model's quality gain at ~1/20th of the parameters.
- **Speed:** 64-expert Switch-Base reached T5-Base quality ~7x faster in wall-clock; the 1.6T-parameter Switch-C was ~4x faster than T5-XXL.
- Pre-training gains transferred better to knowledge-heavy tasks than to reasoning tasks.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
