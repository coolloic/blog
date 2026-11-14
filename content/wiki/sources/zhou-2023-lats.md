---
title: "Source: Language Agent Tree Search (LATS, Zhou et al., 2023)"
summary: "ICML 2024: Monte Carlo Tree Search over ReAct-style trajectories, with LM value functions, self-reflection and environment feedback."
category: source
lastmod: 2026-11-14
tags: ["agents", "reasoning", "paper"]
---

- **What:** research paper (ICML 2024, PMLR vol. 235), arXiv:2310.04406
- **Authors:** Andy Zhou, Kai Yan, Michal Shlapentokh-Rothman, Haohan Wang, Yu-Xiong Wang
- **Date:** v1 2023-10-06, v3 2024-06-06
- **Original:** [arXiv:2310.04406](https://arxiv.org/abs/2310.04406) · [PMLR](https://proceedings.mlr.press/v235/zhou24r.html) · [code](https://github.com/lapisrocks/LanguageAgentTreeSearch)

## Summary

A single ReAct trajectory commits to each step greedily and cannot back up. LATS treats each partial reason-act trajectory as a node in a search tree and runs Monte Carlo Tree Search: the LM proposes candidate next steps, an LM-powered value function scores states, environment feedback grounds those scores, and self-reflections on failed branches are fed into later attempts. It unifies reasoning, acting and planning in one framework.

## Key claims

- Evaluated on programming, interactive QA, web navigation and math.
- HumanEval pass@1 with GPT-4: 92.7% per the arXiv v3 abstract (the ICML poster page cites a different figure, 94.4%).
- WebShop with GPT-3.5: average score 75.9 without gradient updates, which the authors call comparable to gradient-based fine-tuning.
- Synthesis (not checked against the paper body): tree search needs an environment that can be reset or reverted to explore sibling branches, and costs many more model calls than a single trajectory.

## Feeds

[ReAct pattern](../concepts/react-pattern.md)
