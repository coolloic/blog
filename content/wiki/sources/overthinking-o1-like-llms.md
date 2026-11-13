---
title: "Source: Do NOT Think That Much for 2+3=? (Chen et al., 2024)"
summary: "Paper characterising 'overthinking' in o1-style models (many tokens on trivial problems) and a self-training fix that shortens reasoning without losing accuracy."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "research"]
---

- **What:** research paper (arXiv 2412.21187)
- **Authors:** Xingyu Chen, Jiahao Xu, Tian Liang, … Dong Yu (Tencent AI Lab)
- **Date:** 2024-12-30 (v2 2025-02-01)
- **Original:** [arXiv:2412.21187](https://arxiv.org/abs/2412.21187)

## Summary

The first systematic study of overthinking: o1-like models spend large amounts of compute on simple problems for little or no benefit. It proposes outcome- and process-level efficiency metrics, then shows that self-training can cut that waste.

## Key claims

- Long-CoT models allocate excessive reasoning to easy problems, with minimal accuracy gain.
- New efficiency metrics judge whether each extra reasoning round adds a correct answer or a genuinely new approach.
- Self-training toward shorter, sufficient solutions reduces compute while keeping accuracy on GSM8K, MATH500, GPQA and AIME.

## Feeds

[Test-time compute](../concepts/test-time-compute.md) · [Reasoning models](../concepts/reasoning-models.md)
