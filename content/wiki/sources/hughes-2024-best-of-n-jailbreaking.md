---
title: "Source: Best-of-N Jailbreaking"
summary: "Hughes et al. (2024): resample randomly augmented prompts (shuffled, recapitalised) until one works; 89% ASR on GPT-4o and 78% on Claude 3.5 Sonnet at N=10,000."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "paper"]
---

- **What:** research paper, arXiv:2412.03556
- **Authors:** John Hughes, Sara Price, Aengus Lynch, Rylan Schaeffer, Fazl Barez, Sanmi Koyejo, Henry Sleight, Erik Jones, Ethan Perez, Mrinank Sharma
- **Date:** 2024-12-04 (v2 2024-12-19)
- **Original:** [arXiv:2412.03556](https://arxiv.org/abs/2412.03556)

## Summary

A black-box attack that exploits sampling randomness and input sensitivity: repeatedly apply cheap random augmentations (character shuffling, random capitalisation; image and audio equivalents for other modalities) to a harmful request and sample until a harmful answer appears.

## Key claims

- With 10,000 samples: 89% ASR on GPT-4o, 78% on Claude 3.5 Sonnet.
- Works on text, vision (GPT-4o) and audio (Gemini 1.5 Pro) inputs with modality-specific augmentations.
- ASR scales with N in a power-law-like way over many orders of magnitude, so attacker compute buys success predictably.
- Also defeats the circuit-breakers defence; combining with an optimised prefix raises ASR by up to 35%.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)
