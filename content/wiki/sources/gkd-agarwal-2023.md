---
title: "Source: On-Policy Distillation of Language Models (GKD)"
summary: "The 2023 Google DeepMind paper introducing Generalized Knowledge Distillation for autoregressive models."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2306.13649, ICLR 2024)
- **Author:** Rishabh Agarwal, Nino Vieillard, Yongchao Zhou, Piotr Stanczyk, Sabela Ramos, Matthieu Geist, Olivier Bachem
- **Date:** 2023-06-23 (v3 2024-01-17)
- **Original:** [arXiv:2306.13649](https://arxiv.org/abs/2306.13649)

## Summary

Identifies the train–inference mismatch in standard sequence distillation and fixes it by training the student on its own generated sequences with teacher feedback, using a flexible choice of divergence.

## Key claims

- Standard KD for autoregressive models trains on sequences the student will not itself produce at inference.
- GKD trains on student-generated sequences scored by the teacher.
- Alternative divergences help when the student cannot represent the teacher's full distribution.
- Can be combined with RL fine-tuning; evaluated on summarisation, translation, arithmetic reasoning and instruction tuning.

## Feeds

[Knowledge distillation](../concepts/knowledge-distillation.md)
