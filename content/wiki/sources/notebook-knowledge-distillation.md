---
title: "Source: Knowledge Distillation (Notebook)"
summary: "The owner's tutorial on teacher-student distillation, from Hinton's soft targets to LLM-era sequence and reasoning distillation."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** tutorial in the owner's Notebook
- **Author:** Loic (coolloic)
- **Date:** undated (read 2026-11-14)
- **Original:** [Knowledge Distillation — Teach a Small Model to Think Like a Big One](https://coolloic.github.io/Notebook/knowledge-distillation.html)

## Summary

Explains distillation as training a small student to imitate a large frozen teacher's full output distribution. Covers temperature-softened targets, the combined soft/hard loss, kinds of knowledge (response, feature, relation), training schemes, and how the idea carries over to LLMs as sequence-level, black-box and chain-of-thought distillation.

## Key claims

- Soft targets carry 'dark knowledge': relative probabilities over wrong classes reveal how the teacher sees similarity.
- Loss = α·T²·KL(teacher_T ‖ student_T) + (1−α)·CE(labels); T is typically 2–10 (3–5 a common start), α often 0.5–0.9.
- A very large teacher–student capacity gap can hurt; an intermediate 'teacher assistant' can bridge it.
- LLM-era variants: sequence-level KD (train on teacher-generated text), white-box (logits) vs black-box (API text only), and reasoning-trace distillation.
- Black-box distillation from commercial models may breach terms of service, and the student inherits the teacher's errors.
- Distillation composes with quantization and pruning.

## Feeds

[Knowledge distillation](../concepts/knowledge-distillation.md)
