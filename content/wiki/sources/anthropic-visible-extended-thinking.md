---
title: "Source: Claude's Extended Thinking (Anthropic, 2025)"
summary: "Anthropic's launch post for extended thinking in Claude 3.7 Sonnet: serial vs parallel test-time compute and why the thought process is shown."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning"]
---

- **What:** research/news post
- **Publisher:** Anthropic
- **Date:** 2025-02-24
- **Original:** [Claude's extended thinking](https://www.anthropic.com/news/visible-extended-thinking)

## Summary

Introduces extended thinking with Claude 3.7 Sonnet as the same model given more time, not a separate model. It separates serial test-time compute (longer reasoning) from parallel test-time compute (many samples plus selection), and discusses the benefits and risks of showing the reasoning.

## Key claims

- Extended thinking is a mode of the same model; developers set a thinking budget.
- Serial scaling: AIME accuracy rises roughly logarithmically with allowed thinking tokens.
- Parallel scaling: with the equivalent of 256 samples, a learned scorer and a 64K budget, Claude 3.7 Sonnet reached 84.8% on GPQA. This was a research result, not the deployed product.
- Showing the reasoning helps trust and alignment research, but it may be unfaithful to what drives the answer, it is not character-trained, and it may help jailbreakers.
- Gains also show up in agentic settings (OSWorld, Pokémon Red), where the advantage grows with more steps.

## Feeds

[Test-time compute](../concepts/test-time-compute.md) · [Extended thinking](../concepts/extended-thinking.md) · [Reasoning models](../concepts/reasoning-models.md)
