---
title: "Source: Effective context engineering for AI agents (Anthropic)"
summary: "Anthropic Applied AI post framing context as a finite attention budget subject to context rot, with compaction, notes, sub-agents and just-in-time retrieval as remedies."
category: source
lastmod: 2026-11-14
tags: ["models", "agents", "context"]
---

- **What:** engineering blog post
- **Authors:** Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield (Anthropic Applied AI), with contributors
- **Date:** 29 September 2025
- **Original:** [anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

## Summary

The post argues that context is a scarce resource even when windows are large. It explains context rot from transformer mechanics and training distribution, and gives techniques for keeping the context small and high-signal in long-horizon agents.

## Key claims

- Context rot: recall accuracy falls as the window fills, across all models, though at different rates.
- Models have an "attention budget"; each token spends some of it, with diminishing returns.
- Self-attention relates every token to every other, n-squared pairwise relationships for n tokens, which stretches thin as n grows.
- Training data has more short sequences than long ones, so models have less experience with very long-range dependencies.
- Position-encoding interpolation extends windows but degrades positional understanding somewhat: a gradient, not a cliff.
- Remedies: compaction (summarise and restart), tool-result clearing, structured note-taking outside the window, sub-agents with clean contexts returning condensed summaries, and just-in-time retrieval via lightweight references.

## Feeds

[Long-context degradation](../concepts/long-context-degradation.md) · [LLM limitations](../concepts/llm-limitations.md)
