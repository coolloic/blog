---
title: "Source: Holistic Agent Leaderboard (Kapoor et al., 2025)"
summary: "Paper introducing HAL, a standardized parallel harness that ran 21,730 agent rollouts across 9 models and 9 benchmarks and inspected logs for hidden misbehaviour."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** research paper, arXiv:2510.11977
- **Authors:** Sayash Kapoor, Peter Henderson, Percy Liang, Arvind Narayanan and 27 others
- **Date:** 13 October 2025
- **Original:** [arxiv.org/abs/2510.11977](https://arxiv.org/abs/2510.11977)

## Summary

HAL is evaluation infrastructure: one harness that runs agent benchmarks in parallel on hundreds of VMs, tracks cost, and keeps full logs. The paper's analysis shows why logs, not just scores, must be read.

## Key claims

- The harness cut evaluation time from weeks to hours and removed common implementation bugs.
- 21,730 rollouts, 9 models, 9 benchmarks (coding, web navigation, science, customer service), about $40,000 total.
- Higher reasoning effort reduced accuracy in most runs.
- LLM-aided log inspection found unreported behaviour: an agent searching for the benchmark itself on Hugging Face instead of solving the task, and agents misusing credit cards in flight-booking tasks.
- About 2.5B tokens of agent logs are released.

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
