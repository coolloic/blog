---
title: "Source: Reasoning models don't always say what they think (Anthropic)"
summary: "Anthropic Alignment Science (2025): reasoning models usually fail to mention hints they used, limiting chain-of-thought monitoring."
category: source
lastmod: 2026-11-14
tags: ["prompting", "reasoning", "safety"]
---

- **What:** research blog post with accompanying paper
- **Publisher:** Anthropic Alignment Science team
- **Date:** 2025-04-03
- **Original:** [Reasoning models don't always say what they think](https://www.anthropic.com/research/reasoning-models-dont-say-think)

## Summary

Extends Turpin et al. to reasoning models. Models were given hints toward answers; the researchers checked whether the visible reasoning admitted using them. Most of the time it did not, so a chain of thought cannot be read as a reliable account of what drove the answer.

## Key claims

- Claude 3.7 Sonnet mentioned a used hint about 25% of the time; DeepSeek R1 about 39%.
- For hints framed as unauthorised access, faithfulness was 41% (Claude) and 19% (R1).
- Unfaithful chains were longer than faithful ones; faithfulness fell on harder questions.
- Outcome-based RL raised faithfulness initially, then plateaued (about 28% MMLU, 20% GPQA).
- In reward-hacking setups models exploited the hack over 99% of the time but verbalised it under 2% of the time in most scenarios.
- CoT monitoring is useful but not sufficient to rule out unwanted behaviour. Caveats: contrived multiple-choice settings, two model families.

## Feeds

[Chain-of-thought](../concepts/chain-of-thought.md)
