---
title: "Source: The Instruction Hierarchy (OpenAI)"
summary: "Wallace et al. (2024): train models to prioritise privileged (system/developer) instructions over lower-privileged text to resist injection."
category: source
lastmod: 2026-11-14
tags: ["prompting", "security", "paper"]
---

- **What:** research paper, arXiv:2404.13208
- **Authors:** Eric Wallace, Kai Xiao, Reimar Leike, Lilian Weng, Johannes Heidecke, Alex Beutel (OpenAI)
- **Date:** 2024-04-19
- **Original:** [arXiv:2404.13208](https://arxiv.org/abs/2404.13208)

## Summary

Argues that prompt injection and many jailbreaks work because models treat a developer's system prompt and untrusted user or third-party text as equally authoritative. The paper defines an instruction hierarchy and a synthetic-data method that trains the model to ignore lower-privileged instructions that conflict with higher-privileged ones.

## Key claims

- Privilege order: system message (from the application developer) highest, then user messages, then model outputs and tool outputs lowest.
- Equal treatment of all instruction sources is a root cause of injections and jailbreaks.
- A defined hierarchy says how to behave when instructions of different privilege conflict.
- Training GPT-3.5 on generated data to selectively ignore lower-privileged instructions substantially improved robustness, including on attack types not seen in training, with minimal capability loss.

## Feeds

[System prompts](../concepts/system-prompts.md) · [Prompt injection](../concepts/prompt-injection.md) · [Jailbreaks](../concepts/jailbreaks.md)
