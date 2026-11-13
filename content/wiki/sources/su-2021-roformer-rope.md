---
title: "Source: RoFormer: Rotary Position Embedding (Su et al., 2021)"
summary: "Introduces RoPE, which encodes position by rotating query and key vectors so attention scores depend on relative distance."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 2104.09864)
- **Author:** Jianlin Su, Yu Lu, Shengfeng Pan, Ahmed Murtadha, Bo Wen, Yunfeng Liu
- **Date:** 2021-04-20 (v1); revised 2023-11-08 (v5)
- **Original:** [arXiv:2104.09864](https://arxiv.org/abs/2104.09864)

## Summary

RoPE multiplies each query and key vector by a position-dependent rotation (pairs of dimensions are rotated by an angle proportional to the position, each pair at a different frequency). Because the dot product of two rotated vectors depends only on the difference of their angles, the attention score between two tokens depends on their relative offset, even though each vector is encoded with its absolute position. RoPE is applied inside attention to Q and K rather than added to the input embedding.

## Key claims

- RoPE encodes absolute position with a rotation matrix and thereby builds explicit relative-position dependence into self-attention.
- It allows flexible sequence lengths.
- It gives inter-token dependency that decays as relative distance grows.
- It can be combined with linear self-attention.

## Feeds

[Transformer architecture](../concepts/transformer-architecture.md) · [Context window](../concepts/context-window.md)
