---
title: "Source: Great, Now Write an Article About That: The Crescendo Multi-Turn LLM Jailbreak Attack"
summary: "Russinovich, Salem and Eldan (Microsoft, 2024): a benign-looking conversation that escalates step by step, referencing the model's own replies, jailbreaks frontier models."
category: source
lastmod: 2026-11-14
tags: ["security", "jailbreaks", "paper"]
---

- **What:** research paper, arXiv:2404.01833 (USENIX Security 2025)
- **Authors:** Mark Russinovich, Ahmed Salem, Ronen Eldan
- **Date:** 2024-04-02 (v3 2025-02-26)
- **Original:** [arXiv:2404.01833](https://arxiv.org/abs/2404.01833)

## Summary

Crescendo is a multi-turn jailbreak: start with a general, harmless question on the topic, then escalate gradually, each turn pointing back to what the model itself just wrote, until it produces restricted content. No single turn looks clearly malicious.

## Key claims

- High success across ChatGPT, Gemini Pro and Ultra, LLaMA-2 70B Chat, LLaMA-3 70B Chat and Anthropic's chat model; also multimodal models.
- Crescendomation automates the attack and outperforms other techniques on an AdvBench subset by 29-61% on GPT-4 and 49-71% on Gemini-Pro.
- Implication: per-message input filters miss attacks that live in the conversation trajectory.

## Feeds

[Jailbreaks](../concepts/jailbreaks.md)
