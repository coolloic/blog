---
title: "Source: Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)"
summary: "NeurIPS 2023: an agent retries a task, writing verbal self-reflections on each failure into an episodic memory instead of updating weights."
category: source
lastmod: 2026-11-14
tags: ["agents", "reasoning", "paper"]
---

- **What:** research paper (NeurIPS 2023), arXiv:2303.11366
- **Authors:** Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao (arXiv author list; the NeurIPS proceedings entry omits Edward Berman)
- **Date:** v1 2023-03-20, v4 2023-10-10
- **Original:** [arXiv:2303.11366](https://arxiv.org/abs/2303.11366) · [NeurIPS proceedings](https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract.html)

## Summary

Reflexion wraps an acting agent (a ReAct or CoT actor) in a trial loop. An evaluator scores each trajectory (exact match, heuristics, an LLM, or self-written unit tests); a self-reflection model turns the trajectory and the sparse reward into a short verbal lesson; the lesson goes into a long-term memory (typically 1–3 entries) that conditions the next trial. Learning happens in context, with no gradient updates.

## Key claims

- ALFWorld: ReAct + Reflexion completes 130 of 134 tasks, a 22% absolute gain over strong baselines within 12 trials.
- HotpotQA: about 20% improvement over baselines.
- HumanEval (Python): 91.0% pass@1 vs 80.1% for prior GPT-4 results.
- Limits stated: can settle in local minima; memory is a bounded sliding window; relies on the model's own self-evaluation; no gain over ReAct on WebShop, which needs diverse exploration; self-generated tests can give false positives (16.3% on MBPP Python); generated code should run in isolation.

## Feeds

[ReAct pattern](../concepts/react-pattern.md)
