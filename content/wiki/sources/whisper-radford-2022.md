---
title: "Source: Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)"
summary: "Radford et al. 2022 paper introducing Whisper, a speech recognizer trained on ~680k hours of weakly supervised multilingual audio that generalizes zero-shot."
category: source
lastmod: 2026-11-14
tags: ["models", "audio", "paper"]
---

- **What:** research paper (arXiv:2212.04356)
- **Author/publisher:** Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, Ilya Sutskever (OpenAI)
- **Date:** 2022-12-06
- **Original:** [arXiv:2212.04356](https://arxiv.org/abs/2212.04356)

## Summary

Shows that scaling weakly supervised training (internet audio paired with transcripts) to about 680,000 hours of multilingual, multitask data yields a speech model that transfers to standard benchmarks without fine-tuning.

## Key claims

- Training data: ~680,000 hours of multilingual and multitask (transcription + translation) audio.
- Zero-shot performance is often competitive with prior fully supervised systems.
- The models approach human accuracy and robustness.

## Feeds

[Multimodal models](../concepts/multimodal-models.md) · [Voice agents](../concepts/voice-agents.md)
