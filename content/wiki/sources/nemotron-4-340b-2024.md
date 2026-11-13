---
title: "Source: Nemotron-4 340B Technical Report (NVIDIA, 2024)"
summary: "NVIDIA's open 340B model family, released for synthetic data generation, whose alignment data was over 98% synthetic: the most detailed public synthetic-data pipeline."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** technical report (arXiv:2406.11704)
- **Author:** NVIDIA (Bo Adler and 80 co-authors)
- **Date:** 2024-06-17 (v2 2024-08-06)
- **Original:** [arXiv:2406.11704](https://arxiv.org/abs/2406.11704)

## Summary

Releases Nemotron-4-340B Base, Instruct and Reward under the NVIDIA Open Model License, which permits using the models and their outputs, including to generate data for training other models. The report documents the synthetic data pipeline used to align the Instruct model.

## Key claims

- Over 98% of alignment data was synthetic. Only about 20K human-annotated examples were used: 10K for SFT and 10K HelpSteer2 preference pairs for the reward model.
- Synthetic prompts were seeded with about 3K topics (macro topics, subtopics, manual), covering open QA, writing, closed QA over C4 documents, maths and coding (seeded with ~17K maths and ~12K Python keywords), and instruction following with verifiable constraints.
- Multi-turn dialogues were made by role-playing an instruct model against itself with user personas. They were filtered by Nemotron-4-340B-Reward score.
- Preference pairs come from several intermediate models. They are judged by ground truth or verifiers where possible (GSM8K, MATH, instruction constraints), otherwise by LLM-as-judge with swapped order, and later by reward-model-as-judge. The reward model was more accurate on Chat-Hard (0.87 vs 0.54).
- Iterative weak-to-strong alignment: each aligned model generates data for the next, stronger base model. The first generator was Mixtral-8x7B-Instruct. The teacher did not cap the student.
- LMSYS prompts were split into disjoint SFT and preference sets. Unsafe prompts were removed only from the SFT split.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)
