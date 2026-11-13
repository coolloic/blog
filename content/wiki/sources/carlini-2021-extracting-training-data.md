---
title: "Source: Extracting Training Data from Large Language Models"
summary: "Carlini et al. (2020/2021): querying GPT-2 recovered hundreds of verbatim training sequences, including names, phone numbers and emails; larger models leak more."
category: source
lastmod: 2026-11-14
tags: ["security", "privacy", "paper"]
---

- **What:** research paper, arXiv:2012.07805
- **Authors:** Nicholas Carlini, Florian Tramèr, Eric Wallace, Matthew Jagielski, Ariel Herbert-Voss, Katherine Lee, Adam Roberts, Tom Brown, Dawn Song, Úlfar Erlingsson, Alina Oprea, Colin Raffel
- **Date:** 2020-12-14 (v2 2021-06-15)
- **Original:** [arXiv:2012.07805](https://arxiv.org/abs/2012.07805)

## Summary

Shows that an adversary with only query access can recover individual training examples from a language model, establishing memorisation as a privacy risk rather than a theoretical one.

## Key claims

- Hundreds of verbatim sequences extracted from GPT-2: public PII (names, phone numbers, emails), IRC logs, code, 128-bit UUIDs.
- Extraction worked even for sequences that appeared in a single training document.
- Larger models are more vulnerable than smaller ones.

## Feeds

[LLM security risks](../concepts/llm-security-risks.md)
