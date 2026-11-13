---
title: "Source: On-Policy Distillation (Thinking Machines)"
summary: "Thinking Machines Lab's 2025 post on distilling by scoring the student's own samples with a teacher's per-token log-probs."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** engineering blog post
- **Author:** Kevin Lu with Thinking Machines Lab
- **Date:** 2025-10-27 (updated 2026-06)
- **Original:** [On-Policy Distillation](https://thinkingmachines.ai/blog/on-policy-distillation/)

## Summary

Argues that SFT on teacher outputs (off-policy) suffers compounding error once the student drifts, while RL gives sparse rewards. On-policy distillation samples from the student and uses per-token reverse KL to the teacher as a dense reward, combining the strengths of both.

## Key claims

- Loss is the per-token reverse KL between student and teacher on student-sampled tokens; only teacher log-probs are needed, no reward model.
- Own experiment: from a 400k-prompt SFT checkpoint (60% AIME'24), on-policy distillation reached ~70% in ~150 steps, about the level of an RL run.
- Estimated 9× less compute than extrapolating SFT on teacher outputs to 2M prompts, 30× when the teacher's sampling cost is included (GPU-hour savings closer to 18×).
- Cites the Qwen3 technical report: on-policy distillation scored 74.4% AIME'24 with ~1,800 GPU-hours vs 67.6% for RL with ~17,920 (Qwen's numbers, not the post's own runs).
- Mid-training Qwen3-8B on internal documents dropped IF-eval from 85% to 45%; mixing in 30% chat data gave 79%; on-policy distillation of that checkpoint, with the original Qwen3-8B as teacher on Tulu3 prompts, restored it to 83% while keeping most of the new knowledge (internal QA 41% vs 36% before distillation and 43% for documents-only).
- Suggests alternating fine-tuning and distillation as a route to continual learning.

## Feeds

[Knowledge distillation](../concepts/knowledge-distillation.md) · [Fine-tuning](../concepts/fine-tuning.md)
