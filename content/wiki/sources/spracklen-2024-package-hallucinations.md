---
title: "Source: We Have a Package for You! (package hallucinations)"
summary: "Spracklen et al. (2024): code LLMs recommend non-existent packages (5.2% commercial, 21.7% open-source), a new package-confusion supply-chain attack."
category: source
lastmod: 2026-11-14
tags: ["security", "supply-chain", "paper"]
---

- **What:** research paper, arXiv:2406.10279 (USENIX Security 2025)
- **Authors:** Joseph Spracklen, Raveen Wijewickrama, A H M Nazmus Sakib, Anindya Maiti, Bimal Viswanath, Murtuza Jadliwala
- **Date:** 2024-06-12 (v3 2025-03-02)
- **Original:** [arXiv:2406.10279](https://arxiv.org/abs/2406.10279)

## Summary

Measures how often code-generating LLMs import packages that do not exist. An attacker can register those names with malicious code; developers who trust the generated code install it. The attack later became known informally as "slopsquatting".

## Key claims

- 576,000 code samples, 16 LLMs, two programming languages.
- Hallucinated packages: at least 5.2% on average for commercial models, 21.7% for open-source models.
- 205,474 unique hallucinated package names.
- The problem is systemic and persistent; tested mitigations reduced hallucination without hurting code quality.

## Feeds

[LLM security risks](../concepts/llm-security-risks.md)
