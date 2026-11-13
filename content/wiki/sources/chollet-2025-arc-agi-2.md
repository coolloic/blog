---
title: "Source: ARC-AGI-2: A New Challenge for Frontier AI Reasoning Systems (Chollet et al., 2025)"
summary: "Paper introducing ARC-AGI-2, grid-transformation puzzles calibrated so humans solve them and frontier models largely do not."
category: source
lastmod: 2026-11-14
tags: ["evaluation"]
---

- **What:** research paper, arXiv:2505.11831
- **Authors:** François Chollet, Mike Knoop, Gregory Kamradt, Bryan Landers, Henry Pinkard (ARC Prize Foundation)
- **Date:** 17 May 2025 (v2 15 January 2026)
- **Original:** [arxiv.org/abs/2505.11831](https://arxiv.org/abs/2505.11831)

## Summary

ARC-AGI-2 keeps ARC-AGI-1's format, a few input-output grid examples from which the solver must infer the transformation and apply it to a test input, but raises difficulty for compositional reasoning, and validates every task against human testers.

## Key claims

- ARC-AGI-1 had 400 public training and 400 public evaluation tasks plus 100 semi-private and 100 private tasks; ARC-AGI-2 has 120 semi-private and 120 private tasks for Kaggle evaluation.
- Human testing: 407 participants, 515 sessions; every included task was solved by at least two non-expert testers within two attempts; median successful solve time about 2.2 minutes.
- At launch (May 2025) frontier reasoning models scored about 3% or less (o3-mini high 3.0%, o3 medium 3.0%); scores under 5% are not considered meaningful.
- Cost per task is reported alongside accuracy; for ARC-AGI-1, a preview version of o3 had an estimated cost of about $200 per task at low compute (76%) and about $20,000 per task at high compute (88%).

## Feeds

[Benchmarks](../concepts/benchmarks.md)
