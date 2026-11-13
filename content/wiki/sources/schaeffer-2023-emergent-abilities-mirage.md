---
title: "Source: Are Emergent Abilities of Large Language Models a Mirage? (Schaeffer et al., 2023)"
summary: "NeurIPS 2023 paper arguing that sudden 'emergent' jumps with scale often come from discontinuous evaluation metrics rather than from the models."
category: source
lastmod: 2026-11-14
tags: ["training", "scaling-laws", "evaluation"]
---

- **What:** research paper (arXiv:2304.15004), NeurIPS 2023
- **Authors:** Rylan Schaeffer, Brando Miranda, Sanmi Koyejo (Stanford)
- **Date:** 2023-04-28 (v2 2023-05-22)
- **Original:** [arxiv.org/abs/2304.15004](https://arxiv.org/abs/2304.15004)

## Summary

Re-analyses claimed emergent abilities with fixed model outputs and different metrics. Nonlinear or all-or-nothing metrics (such as exact match) turn smooth per-token improvement into what looks like a sudden jump; linear or continuous metrics on the same outputs show smooth, predictable change.

## Key claims

- Apparent emergence is often produced by the researcher's choice of metric.
- Discontinuous metrics create sharp transitions; continuous ones show smooth scaling.
- Implication: smooth loss scaling does not by itself mean capabilities will appear abruptly, and abrupt benchmark curves need checking against continuous measures.

## Feeds

[Scaling laws](../concepts/scaling-laws.md)
