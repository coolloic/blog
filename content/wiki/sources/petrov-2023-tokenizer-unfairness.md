---
title: "Source: Language Model Tokenizers Introduce Unfairness Between Languages (Petrov et al., 2023)"
summary: "Shows that the same text costs very different numbers of tokens in different languages, affecting price, latency and context capacity."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 2305.15425, NeurIPS 2023)
- **Author:** Aleksandar Petrov, Emanuele La Malfa, Philip H.S. Torr, Adel Bibi (University of Oxford)
- **Date:** 2023-05-17 (v1); revised 2023-10-20 (v2)
- **Original:** [arXiv:2305.15425](https://arxiv.org/abs/2305.15425)

## Summary

The authors tokenise parallel translations of the same text with many tokenizers and compare lengths. Disparities appear before any model runs, and persist in tokenizers designed to be multilingual and even in byte- or character-level schemes.

## Key claims

- Token counts for the same content can differ by up to 15x between languages.
- Disparities persist for deliberately multilingual tokenizers.
- Byte- and character-level models also show gaps above 4x for some language pairs.
- Consequences: higher cost for commercial services, higher latency, and less content fitting in the context window.
- Future models should use multilingually fair tokenizers.

## Feeds

[Tokenization](../concepts/tokenization.md) · [Context window](../concepts/context-window.md)
