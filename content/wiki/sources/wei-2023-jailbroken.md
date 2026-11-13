---
title: "Source: Jailbroken: How Does LLM Safety Training Fail?"
summary: "Wei, Haghtalab and Steinhardt (2023): jailbreaks exploit competing objectives and mismatched generalization; scaling alone will not fix them."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "paper"]
---

- **What:** research paper, arXiv:2307.02483
- **Authors:** Alexander Wei, Nika Haghtalab, Jacob Steinhardt
- **Date:** 2023-07-05
- **Original:** [arXiv:2307.02483](https://arxiv.org/abs/2307.02483)

## Summary

Explains why safety training fails with two mechanisms and uses them to design attacks. **Competing objectives:** the model's helpfulness and instruction-following goals conflict with its safety goal (e.g. "start your answer with 'Absolutely!'", refusal suppression, role-play). **Mismatched generalization:** safety training does not cover domains where capabilities exist (e.g. Base64 or other encodings, low-resource languages).

## Key claims

- GPT-4 and Claude v1.3 remained vulnerable despite extensive red-teaming.
- Attacks built from the two principles succeeded on every prompt in a set of unsafe requests drawn from the vendors' red-team evaluations, beating ad-hoc jailbreaks.
- Scaling does not resolve the failure modes; the authors call for safety-capability parity.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)
