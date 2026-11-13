---
title: "Source: DeepSeek-R1 (DeepSeek-AI, 2025)"
summary: "Paper showing reasoning emerges from pure RL with rule-based rewards (R1-Zero, GRPO), plus the four-stage R1 pipeline and distillation into small models."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "training"]
---

- **What:** research paper (arXiv 2501.12948; later published in *Nature* 645, 2025)
- **Authors:** DeepSeek-AI (Daya Guo, Dejian Yang, Haowei Zhang et al.)
- **Date:** 2025-01-22 (v1)
- **Original:** [arXiv:2501.12948](https://arxiv.org/abs/2501.12948)

## Summary

The first fully open description of how to train an o1-class reasoning model. DeepSeek-R1-Zero applies RL directly to a base model with only rule-based rewards. Long, self-checking reasoning emerges without any supervised reasoning traces. DeepSeek-R1 adds a small cold-start SFT and further stages to fix readability, and its traces are distilled into small dense models.

## Key claims

- **R1-Zero:** DeepSeek-V3-Base trained with GRPO, which drops the critic and uses the group's mean score as the baseline. Rewards are rule-based: accuracy (checkable answers, compiler/test results) plus a format reward for reasoning inside think tags. Neural reward models were avoided because of reward hacking and cost.
- AIME 2024 pass@1 went from 15.6% to 71.0% (86.7% with majority voting) during RL.
- Response length grows on its own during training, so the model learns to spend more test-time compute. Reflection and re-trying alternatives emerge, including a noted "aha moment".
- R1-Zero problems: poor readability and language mixing.
- **R1 pipeline:** (1) cold-start SFT on thousands of long CoT examples; (2) reasoning RL with an added language-consistency reward; (3) rejection sampling to build ~800K SFT samples (~600K reasoning, ~200K general) and retrain; (4) RL across all scenarios, with rule rewards for reasoning and reward models for helpfulness and harmlessness.
- R1 results: AIME 2024 79.8%, MATH-500 97.3%, Codeforces rating 2029, GPQA Diamond 71.5%, comparable to OpenAI o1-1217.
- **Distillation:** SFT of Qwen2.5/Llama models (1.5B–70B) on the 800K samples. On Qwen-32B, distillation (AIME 72.6%) beat running RL on the small model directly (47.0%).
- Unsuccessful: process reward models (hard to define steps, reward hacking) and MCTS (search space too large, value model hard to train).
- Limitations: few-shot prompting hurts (use zero-shot), language mixing outside Chinese/English, weaker than V3 at function calling, multi-turn and JSON output.

## Feeds

[Reasoning models](../concepts/reasoning-models.md) · [Test-time compute](../concepts/test-time-compute.md)
