---
title: "Source: Defending Against Indirect Prompt Injection Attacks With Spotlighting"
summary: "Microsoft (2024): mark the provenance of untrusted input by delimiting, datamarking or encoding it; cuts attack success from over 50% to under 2% on GPT models."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "paper"]
---

- **What:** research paper, arXiv:2403.14720
- **Authors:** Keegan Hines, Gary Lopez, Matthew Hall, Federico Zarfati, Yonatan Zunger, Emre Kiciman (Microsoft)
- **Date:** 2024-03-20
- **Original:** [arXiv:2403.14720](https://arxiv.org/abs/2403.14720)

## Summary

Spotlighting is a family of prompt transformations that give the model a continuous signal about which text came from an untrusted source, plus a system-prompt instruction never to follow instructions inside that text. Evaluated on summarisation and Q&A over 1,000 synthetic poisoned documents with a keyword payload.

## Key claims

- **Delimiting:** wrap input in markers (e.g. `<<` `>>`). Weakest: an attacker who learns the prompt can forge the markers.
- **Datamarking:** interleave a special character through the input (example: replace whitespace with `ˆ`). Recommended to randomise the token and positions. GPT-3.5-Turbo ASR fell to about 3% (summarisation) and 8% (Q&A), with no measured task degradation.
- **Encoding:** transform input with Base64 (not ROT13, which an attacker can pre-invert). ASR near 0% but only capable models (GPT-4 class) keep task quality; GPT-3.5-Turbo made decoding errors.
- Headline: ASR from above 50% to below 2% with minimal task impact.
- Limits: synthetic attacks, simple payload, adaptive attackers not tested empirically.

## Feeds

[Prompt injection](../concepts/prompt-injection.md)
