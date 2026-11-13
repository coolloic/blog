---
title: "Source: Vertex AI — Tune Gemini Models"
summary: "Google Cloud's overview of supervised, preference and reinforcement tuning for Gemini models."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** vendor documentation
- **Author:** Google Cloud
- **Date:** undated (read 2026-11-14)
- **Original:** [Introduction to tuning](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/tune-models)

## Summary

Describes the tuning methods Vertex AI offers for Gemini, which models support each, and guidance on when to tune and how much data to prepare.

## Key claims

- Start with prompting; tune only if quality still falls short, and analyse failures before adding data. Quality beats volume.
- SFT (input-output pairs; hundreds to thousands) for formats, classification, extraction and style; supported on Gemini 3.5 Flash/Flash-Lite, 3.1 Flash-Lite and 2.5 Pro/Flash/Flash-Lite.
- Preference tuning (chosen/rejected pairs; hundreds to thousands) on Gemini 2.5 Flash and Flash-Lite.
- Reinforcement learning fine-tuning (reward functions; dozens to a few hundred prompts) on Gemini 3.5 Flash and 3.1 Flash-Lite, for verifiable multi-step tasks.
- Checkpoints and continuous tuning (SFT→SFT, SFT→RLFT, RLFT→RLFT) are supported.
- Parameter-efficient tuning is cheaper and works with less data; full fine-tuning may score higher but costs more to train and serve.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md) · [Preference optimization](../concepts/preference-optimization.md)
