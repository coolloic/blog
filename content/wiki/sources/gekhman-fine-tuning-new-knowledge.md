---
title: "Source: Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?"
summary: "A 2024 Google study showing that SFT examples with unknown facts are learned slowly and raise hallucination."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2405.05904, EMNLP 2024)
- **Author:** Zorik Gekhman, Gal Yona, Roee Aharoni, Matan Eyal, Amir Feder, Roi Reichart, Jonathan Herzig
- **Date:** 2024-05-09 (v3 2024-10-01)
- **Original:** [arXiv:2405.05904](https://arxiv.org/abs/2405.05904)

## Summary

Controls the share of fine-tuning examples that contain facts the model did not already know, and measures the effect on hallucination.

## Key claims

- Examples introducing new knowledge are learned significantly slower than examples consistent with what the model knows.
- Once learned, they linearly increase the model's tendency to hallucinate.
- LLMs mostly acquire facts in pre-training; fine-tuning mainly teaches them to use what they know.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md)
