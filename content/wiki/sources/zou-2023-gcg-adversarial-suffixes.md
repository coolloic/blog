---
title: "Source: Universal and Transferable Adversarial Attacks on Aligned Language Models (GCG)"
summary: "Zou et al. (2023): greedy plus gradient search finds adversarial suffixes on open models that transfer to ChatGPT, Bard and Claude."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "paper"]
---

- **What:** research paper, arXiv:2307.15043 (method commonly called Greedy Coordinate Gradient, GCG)
- **Authors:** Andy Zou, Zifan Wang, Nicholas Carlini, Milad Nasr, J. Zico Kolter, Matt Fredrikson
- **Date:** 2023-07-27 (v2 2023-12-20)
- **Original:** [arXiv:2307.15043](https://arxiv.org/abs/2307.15043)

## Summary

Automates jailbreaks by optimising a token suffix appended to a harmful request so that the model's most likely continuation begins affirmatively ("Sure, here is...") rather than refusing. Search combines greedy and gradient-based token substitution, requiring white-box access to open models.

## Key claims

- Suffixes optimised over many prompts and over Vicuna-7B and 13B transfer to black-box systems: ChatGPT, Bard and Claude public interfaces, and to LLaMA-2-Chat, Pythia and Falcon.
- Suffixes are automatically generated, not hand-written, and often look like gibberish.
- Code: github.com/llm-attacks/llm-attacks.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)
