---
title: "Source: Learning to Reason with LLMs (OpenAI, 2024)"
summary: "OpenAI's o1 announcement: RL-trained chain of thought, with performance scaling in both train-time RL compute and test-time thinking; raw CoT hidden."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "openai"]
---

- **What:** research blog post announcing o1
- **Publisher:** OpenAI
- **Date:** 2024-09-12
- **Original:** [Learning to reason with LLMs](https://openai.com/index/learning-to-reason-with-llms/)
- **Note:** the page blocked automated fetching on 2026-11-14; claims below are from its quoted excerpts and contemporaneous coverage, such as [Simon Willison's notes](https://simonwillison.net/2024/Sep/12/openai-o1/).

## Summary

The post that started the reasoning-model era. o1 is trained with large-scale reinforcement learning to produce a long internal chain of thought before answering. Its headline finding is a second scaling axis: accuracy improves both with more RL training compute and with more thinking at inference.

## Key claims

- A large-scale RL algorithm teaches the model to use its chain of thought productively, in a data-efficient way.
- Performance improves steadily with more RL (train-time) compute and with more time spent thinking (test-time compute). On AIME the relationship looks log-linear.
- OpenAI chose not to show raw chains of thought to users. It cited the value of an unaltered CoT for safety monitoring, user experience and competitive advantage. Reasoning tokens are billed but invisible.
- Critics (e.g. ARC Prize) noted that the product fixes one point on the compute continuum and hides it from developers.

## Feeds

[Reasoning models](../concepts/reasoning-models.md) · [Test-time compute](../concepts/test-time-compute.md)
