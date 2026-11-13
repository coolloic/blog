---
title: "Source: A small number of samples can poison LLMs of any size (Anthropic)"
summary: "Anthropic, UK AISI and Turing Institute (Oct 2025): about 250 poisoned documents backdoored models from 600M to 13B parameters regardless of data size."
category: source
lastmod: 2026-11-14
tags: ["security", "poisoning", "anthropic", "paper"]
---

- **What:** research post and paper
- **Publisher:** Anthropic Alignment Science with the UK AI Security Institute and The Alan Turing Institute
- **Date:** 2025-10-09
- **Original:** [anthropic.com/research/small-samples-poison](https://www.anthropic.com/research/small-samples-poison)

## Summary

Pretraining-poisoning experiment with a denial-of-service backdoor: documents pairing a trigger phrase `<SUDO>` with gibberish taught models to emit gibberish after the trigger while behaving normally otherwise.

## Key claims

- Roughly 250 malicious documents sufficed across 600M, 2B, 7B and 13B models trained Chinchilla-optimally, even though the 13B model saw over 20x more data.
- What matters is the absolute count of poisoned documents, not their share of the corpus, so poisoning is more practical than assumed.
- Caveats: a low-stakes backdoor; unknown whether it holds for larger models or for harmful behaviours such as backdoored code or safety bypass; attackers still need their data to be scraped and to survive post-training.

## Feeds

[LLM security risks](../concepts/llm-security-risks.md)
