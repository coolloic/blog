---
title: "Source: AgentDojo"
summary: "Debenedetti et al. (2024): a dynamic benchmark of 97 agent tasks and 629 prompt-injection test cases in simulated email, banking and travel environments."
category: source
lastmod: 2026-11-14
tags: ["security", "prompt-injection", "benchmarks", "paper"]
---

- **What:** benchmark paper, arXiv:2406.13352
- **Authors:** Edoardo Debenedetti, Jie Zhang, Mislav Balunović, Luca Beurer-Kellner, Marc Fischer, Florian Tramèr
- **Date:** 2024-06-19 (v3 2024-11-24)
- **Original:** [arXiv:2406.13352](https://arxiv.org/abs/2406.13352)

## Summary

An extensible environment for measuring both utility and injection robustness of tool-using agents. Tools return data that may contain attacker instructions; the benchmark scores whether the user task succeeds and whether the attacker's goal is achieved.

## Key claims

- 97 realistic tasks and 629 security test cases in simulated email, e-banking and travel-booking settings.
- Even without attacks, state-of-the-art LLMs fail many tasks.
- Existing attacks break some but not all security properties; new attacks, defences and adaptive attacks can be plugged in.
- Later used as the evaluation suite for CaMeL (see [CaMeL](debenedetti-2025-camel.md)).

## Feeds

[Prompt injection](../concepts/prompt-injection.md)
