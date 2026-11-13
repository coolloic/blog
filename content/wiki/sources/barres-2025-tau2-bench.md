---
title: "Source: τ²-bench: Evaluating Conversational Agents in a Dual-Control Environment (Barres et al., 2025)"
summary: "τ-bench successor where both user and agent act on a shared world with tools, starting with a telecom domain."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** research paper, arXiv:2506.07982 (Sierra)
- **Authors:** Victor Barres, Honghua Dong, Soham Ray, Xujie Si, Karthik Narasimhan
- **Date:** 9 June 2025
- **Original:** [arxiv.org/abs/2506.07982](https://arxiv.org/abs/2506.07982)

## Summary

Most agent benchmarks are single-control: only the agent uses tools. τ²-bench adds dual control, modelled as a Dec-POMDP, where the simulated user also acts (e.g. toggling phone settings in a telecom troubleshooting domain) and the agent must guide them.

## Key claims

- Includes a compositional task generator and a user simulator bound to the environment's tools and state.
- Agent performance drops markedly from a no-user setting to dual control, attributed to the difficulty of guiding users.
- Errors are split into reasoning versus communication/coordination failures.
- Success criteria: database check and communication-info check (as in τ-bench), plus status assertions on the final world state, natural-language assertions over the conversation, and action matching.
- Moving from no-user mode (the agent controls all tools) to dual control dropped pass^1 by 18% for gpt-4.1 and 25% for o4-mini.
- User-simulator audit: critical (task-blocking) errors in 13% of airline, 12% of retail and 6% of telecom conversations; total error rates 47%, 40% and 16%.

## Feeds

[Benchmarks](../concepts/benchmarks.md) · [Agent evaluation](../concepts/agent-evaluation.md) · [Error analysis](../concepts/error-analysis.md)
