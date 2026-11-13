---
title: "Source: Inverse Scaling in Test-Time Compute (Gema et al., 2025)"
summary: "Paper finding that longer reasoning can lower accuracy on some tasks, and naming five distinct failure modes across Claude and o-series models."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "research"]
---

- **What:** research paper (arXiv 2507.14417; TMLR 12/2025)
- **Authors:** Aryo Pradipta Gema, Alexander Hägele, Runjin Chen, … Joe Benton, Ethan Perez
- **Date:** 2025-07-19 (v2 2025-12-15)
- **Original:** [arXiv:2507.14417](https://arxiv.org/abs/2507.14417)

## Summary

Builds tasks where longer reasoning by large reasoning models makes accuracy worse, an inverse scaling between test-time compute and performance. It catalogues how that happens.

## Key claims

- Task families: counting with distractors, regression with spurious features, deduction with constraint tracking, and AI-risk evaluations.
- Failure modes: (1) Claude models get more distracted by irrelevant information; (2) o-series models resist distractors but overfit to familiar problem framings; (3) models drift from sensible priors to spurious correlations; (4) all models lose focus on complex deduction; (5) extended reasoning can amplify concerning behaviour (more self-preservation statements from Claude Sonnet 4).
- Implication: evaluate across reasoning lengths, not only at the maximum.

## Feeds

[Test-time compute](../concepts/test-time-compute.md) · [Reasoning models](../concepts/reasoning-models.md)
