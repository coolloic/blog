---
title: "Source: The Attacker Moves Second"
summary: "Nasr, Carlini, Tramèr et al. (Oct 2025): adaptive attacks exceed 90% success against most of 12 published jailbreak and prompt-injection defences that reported near-zero ASR."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "jailbreaks", "paper"]
---

- **What:** research paper, arXiv:2510.09023
- **Authors:** Milad Nasr, Nicholas Carlini, Chawin Sitawarin, Sander V. Schulhoff, Jamie Hayes, Michael Ilie, Juliette Pluto, Shuang Song, Harsh Chaudhari, Ilia Shumailov, Abhradeep Thakurta, Kai Yuanqing Xiao, Andreas Terzis, Florian Tramèr
- **Date:** 2025-10-10
- **Original:** [arXiv:2510.09023](https://arxiv.org/abs/2510.09023)

## Summary

Argues that LLM defences are evaluated wrongly: against fixed attack strings or weak optimisers not tailored to the defence. Re-evaluates 12 recent defences with scaled, adaptive attacks (gradient descent, reinforcement learning, random search, human-guided exploration).

## Key claims

- Attack success above 90% for most of the 12 defences, most of which originally reported near-zero ASR.
- A human red-teaming competition (about 500 participants, $20,000 prize pool, per Willison's summary) defeated every defence.
- Robustness claims need adaptive attackers and substantial attack compute; near-zero ASR on static sets should be treated sceptically.

## Feeds

[Prompt injection](../concepts/prompt-injection.md) · [Jailbreaks](../concepts/jailbreaks.md)
