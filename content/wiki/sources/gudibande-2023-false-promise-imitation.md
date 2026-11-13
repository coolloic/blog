---
title: "Source: The False Promise of Imitating Proprietary LLMs"
summary: "Berkeley 2023 paper finding that fine-tuning open models on ChatGPT outputs copies style, not capability or factuality."
category: source
lastmod: 2026-11-14
tags: ["training", "data"]
---

- **What:** research paper (arXiv:2305.15717)
- **Author:** Arnav Gudibande, Eric Wallace, Charlie Snell, Xinyang Geng, Hao Liu, Pieter Abbeel, Sergey Levine, Dawn Song
- **Date:** 2023-05-25
- **Original:** [arXiv:2305.15717](https://arxiv.org/abs/2305.15717)

## Summary

The authors fine-tuned open models (1.5B–13B) on ChatGPT outputs. Crowd raters judged the imitators competitive, but targeted benchmarks showed the gap barely closed on tasks the imitation data did not cover.

## Key claims

- Imitation models copy ChatGPT's style, not its factuality, and this fools human raters.
- Little of the capability gap closes on tasks outside the imitation data's support.
- Closing the gap by imitation would take impractical amounts of data. Stronger base models are the better lever.

## Feeds

[Synthetic data generation](../concepts/synthetic-data-generation.md)
