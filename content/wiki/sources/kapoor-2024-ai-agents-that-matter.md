---
title: "Source: AI Agents That Matter (Kapoor et al., 2024)"
summary: "Princeton paper arguing agent benchmarks must report cost alongside accuracy, use proper holdouts, and be reproducible; simple baselines rival complex agents."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** research paper, arXiv:2407.01502
- **Authors:** Sayash Kapoor, Benedikt Stroebl, Zachary S. Siegel, Nitya Nadgir, Arvind Narayanan
- **Date:** 1 July 2024
- **Original:** [arxiv.org/abs/2407.01502](https://arxiv.org/abs/2407.01502)

## Summary

Critiques agent evaluation practice: accuracy-only leaderboards reward needlessly expensive agents, benchmarks lack holdouts so agents overfit with shortcuts, and results are often irreproducible. It proposes cost-accuracy Pareto reporting, separating model evaluation from downstream evaluation, and holdouts matched to the claimed generality.

## Key claims

- On HumanEval (five runs, 164 problems), simple baselines matched complex agents: "warming" (retries with rising temperature, GPT-4) 93.2% for $2.45 versus LATS (GPT-4) 88.0% for $134.50; Reflexion 87.8% for $3.90; an escalation baseline 85.0% for $0.27.
- Similar accuracy can come at costs differing by nearly two orders of magnitude, so accuracy must be plotted against cost.
- Joint cost-accuracy optimisation (DSPy + Optuna on HotPotQA) cut variable cost 53% (GPT-3.5) and 41% (Llama-3-70B) at similar accuracy.
- Holdouts should match the claimed generality (in-distribution samples, out-of-distribution samples, unseen tasks, unseen domains); of 17 benchmarks surveyed, only 5 had appropriate holdouts and seven had none (nor plans for one).
- WebArena example: STeP (35.8%) hard-coded site-specific policies and more than doubled the paper's best baseline, which would not survive site changes.
- Reproducibility problems: missing test cases, reported scores above the authors' own reruns, harness bugs that marked wrong answers correct, and order-dependent results from rate limits. At SWE-agent's $4/task cap, one run over SWE-bench's 2,000+ tasks could cost over $8,000, discouraging repeated runs and error bars.
- Recommendations: report dollar cost plus token counts, publish standard eval scripts, include error bars.

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
