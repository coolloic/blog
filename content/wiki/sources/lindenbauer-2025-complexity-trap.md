---
title: "Source: The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management (Lindenbauer et al., 2025)"
summary: "JetBrains Research study on SWE-bench Verified showing that masking old tool observations halves agent cost and matches LLM summarisation, which also lengthens trajectories."
category: source
lastmod: 2026-11-14
tags: ["agents", "context", "papers"]
---

- **What:** research paper (NeurIPS 2025 DL4C workshop, camera-ready v3)
- **Authors:** Tobias Lindenbauer, Igor Slinko, Ludwig Felder, Egor Bogomolov, Yaroslav Zharov
- **Date:** 29 August 2025 (v1), revised 27 October 2025 (v3)
- **Original:** [arXiv:2508.21433](https://arxiv.org/abs/2508.21433)

## Summary

The paper compares three context strategies for a SWE-agent coding agent on SWE-bench Verified: keep everything (raw agent), mask old tool observations, and summarise old turns with an LLM. Masking is as good as summarisation at lower complexity, and a hybrid of the two is cheapest.

## Key claims

- Observation masking: keep the last M = 10 turns intact; replace older tool observations with a short placeholder, keeping the agent's reasoning and actions.
- LLM summarisation: after 31 turns, summarise the oldest N = 21 and keep the last M = 10 verbatim (OpenHands-style prompt).
- Models: Qwen3-32B (with and without thinking), Qwen3-Coder 480B, Gemini 2.5 Flash (with and without thinking).
- Qwen3-Coder 480B: raw agent 53.4% solved at $1.29 per instance; masking 54.8% at $0.61; summarisation 53.8% at $0.64. Both cut cost by about half.
- Summarisation lengthened trajectories: about 15% more turns than the raw agent with Qwen3-Coder; with Gemini 2.5 Flash 52 turns against 44 for masking. The authors suggest summaries encourage the agent to keep going rather than stop.
- Summary calls cost up to 7.2% of instance cost, which largely accounts for the efficiency gap with masking.
- Hybrid (mask first, summarise as a last resort, N = 43) was 7% cheaper than masking and 11% cheaper than summarisation on a 50-instance subset with Qwen3-Coder. Hyperparameters do not transfer between scaffolds: OpenHands needed a much larger window (M = 58).

## Feeds

[Context compaction](../concepts/context-compaction.md)
