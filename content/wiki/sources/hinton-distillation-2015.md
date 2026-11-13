---
title: "Source: Distilling the Knowledge in a Neural Network"
summary: "Hinton, Vinyals and Dean's 2015 paper that named and formalised knowledge distillation."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:1503.02531, NIPS 2014 Deep Learning Workshop)
- **Author:** Geoffrey Hinton, Oriol Vinyals, Jeff Dean (Google)
- **Date:** 2015-03-09
- **Original:** [arXiv:1503.02531](https://arxiv.org/abs/1503.02531)

## Summary

Compresses an ensemble or large model into a small one by training the small model on the large model's temperature-softened class probabilities. Shows results on MNIST and a commercial speech recogniser, and introduces specialist models.

## Key claims

- Raise the softmax temperature T so the teacher's output is soft; use the same T for the student during training and T=1 afterwards.
- Best objective: weighted average of cross-entropy with soft targets (at T) and with true labels (at T=1), weighting the hard term lower.
- Soft-target gradients scale as 1/T², so multiply that term by T².
- At high temperature, distillation reduces to matching logits; for very small students, intermediate T (2.5–4 on MNIST) worked best.
- MNIST: a small net went from 146 errors to 74 when trained on soft targets from a 67-error teacher.
- Soft targets act as a regulariser: a speech model trained on 3% of data generalised well with soft targets but overfit with hard ones.

## Feeds

[Knowledge distillation](../concepts/knowledge-distillation.md)
