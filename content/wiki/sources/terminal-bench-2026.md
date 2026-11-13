---
title: "Source: Terminal-Bench (Merrill et al., 2026)"
summary: "Paper introducing Terminal-Bench 2.0: 89 hard, realistic command-line tasks with per-task environments and verification tests."
category: source
lastmod: 2026-11-14
tags: ["agents", "coding", "benchmarks"]
---

- **What:** research paper (ICLR 2026)
- **Authors:** Mike A. Merrill, Ludwig Schmidt and 83 others
- **Date:** 2026-01-17
- **Original:** [arXiv:2601.11868](https://arxiv.org/abs/2601.11868)

## Summary

Measures agents on end-to-end terminal work rather than patch generation: each task ships its own environment, a human-written reference solution and tests. Tasks are inspired by real workflows (e.g. training a model, building software from source, reverse engineering).

## Key claims

- Terminal-Bench 2.0 has 89 curated hard tasks.
- At publication, frontier models and agents scored below 65%; smaller models around 15%.
- Includes an error analysis of agent failure modes; tasks run through the Harbor harness.

## Feeds

[Coding agents](../concepts/coding-agents.md)
