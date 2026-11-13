---
title: "Source: GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning (Agrawal et al., 2025)"
summary: "GEPA optimizes prompts by reflecting in natural language on sampled trajectories and keeping a Pareto frontier of candidates; it reports beating GRPO with up to 35x fewer rollouts."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "prompting"]
---

- **What:** research paper (arXiv 2507.19457)
- **Authors:** Lakshya A. Agrawal, Shangyin Tan, Dilara Soylu, et al., incl. Christopher Potts, Koushik Sen, Matei Zaharia, Omar Khattab
- **Date:** submitted 2025-07-25 (v1); figures below are from v2, revised 2026-02-14
- **Original:** [arxiv.org/abs/2507.19457](https://arxiv.org/abs/2507.19457)

## Summary

The paper argues that language is a richer learning signal than the sparse scalar rewards behind RL methods like GRPO. GEPA (Genetic-Pareto) samples trajectories from an LLM system (reasoning, tool calls, tool outputs), reflects on them in natural language to diagnose failures, proposes and tests prompt updates, and combines complementary lessons from the Pareto frontier of its attempts.

## Key claims

- Across six tasks GEPA beats GRPO by 6% on average and up to 20%, using up to 35x fewer rollouts (v2 abstract; the July 2025 v1 abstract reported 10% on average across four tasks).
- It beats MIPROv2 by over 10% (e.g. +12% accuracy on AIME-2025).
- It can turn a few rollouts into large quality gains and shows promise as an inference-time search strategy for code optimization.
- Implemented in DSPy as `dspy.GEPA`, which accepts a feedback metric returning text as well as a score.

## Feeds

[DSPy](../concepts/dspy.md)
