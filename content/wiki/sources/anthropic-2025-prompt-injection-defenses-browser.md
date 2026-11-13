---
title: "Source: Mitigating the risk of prompt injections in browser use (Anthropic)"
summary: "Anthropic (Nov 2025): RL training, content classifiers and red teaming cut adaptive Best-of-N attack success on its browser agent to about 1-2%, while stating no browser agent is immune."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "anthropic", "vendor-blog"]
---

- **What:** research post
- **Publisher:** Anthropic
- **Date:** 2025-11-24
- **Original:** [anthropic.com/research/prompt-injection-defenses](https://www.anthropic.com/research/prompt-injection-defenses)

## Summary

Describes how Anthropic hardens Claude's browser agent (Claude for Chrome) against injections hidden in web content: RL training on simulated injections that rewards refusing them, classifiers that scan all untrusted content entering context (hidden text, manipulated images, deceptive UI), and continuous internal and external red teaming.

## Key claims

- Measured with an internal adaptive Best-of-N attacker combining known injection techniques, 100 attempts per environment (about 2,200-3,200 attempts per bar). Attack success rate (model only / old safeguards / improved safeguards): Sonnet 4 13.8% / 10.7% / 2.0%; Sonnet 4.5 13.8% / 10.8% / 1.9%; Haiku 4.5 12.0% / 11.1% / 2.4%; Opus 4.5 8.0% / 7.6% / 1.4%.
- A 1% attack success rate still represents meaningful risk.
- No browser agent is immune; the work is progress, not a solution.

## Feeds

[Prompt injection](../concepts/prompt-injection.md)
