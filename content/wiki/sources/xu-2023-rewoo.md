---
title: "Source: ReWOO: Decoupling Reasoning from Observations (Xu et al., 2023)"
summary: "Plan all tool calls up front with evidence variables, execute, then solve: about 5x fewer tokens than ReAct on HotpotQA with slightly higher accuracy."
category: source
lastmod: 2026-11-14
tags: ["agents", "reasoning", "paper"]
---

- **What:** research preprint, arXiv:2305.18323
- **Authors:** Binfeng Xu, Zhiyuan Peng, Bowen Lei, Subhabrata Mukherjee, Yuchen Liu, Dongkuan Xu
- **Date:** 2023-05-23 (v1)
- **Original:** [arXiv:2305.18323](https://arxiv.org/abs/2305.18323)

## Summary

ReWOO ("Reasoning WithOut Observation") argues that ReAct is token-hungry: every step stops generation for a tool call, and the stateless API forces each resumed call to resend the instructions, exemplars and the whole growing trajectory. ReWOO splits the work into three modules. A Planner writes the full plan once, each step naming a tool call whose result is bound to a variable (`#E1`, `#E2`, …) that later steps can reference. A Worker executes the calls and fills in the variables. A Solver reads the plan plus evidence and writes the answer.

## Key claims

- Prompt tokens in an interleaved loop grow with the number of steps, with a quadratic term from the accumulated history; ReWOO sends the context roughly twice (plan and solve).
- HotpotQA with gpt-3.5-turbo: ReAct 40.8% accuracy, 9,795 tokens, 4.97 steps; ReWOO 42.4%, 1,986 tokens, 4.45 steps (about 5x token efficiency, about 4% relative accuracy gain).
- Consistent gains across six public NLP benchmarks and one curated dataset; more robust when tools fail.
- Because planning no longer depends on observations, plan-only data can fine-tune a small model: the authors move reasoning from GPT-3.5 (175B) into a 7B LLaMA.

## Feeds

[ReAct pattern](../concepts/react-pattern.md)
