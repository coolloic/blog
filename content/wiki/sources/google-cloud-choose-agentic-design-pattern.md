---
title: "Source: Choose a design pattern for your agentic AI system (Google Cloud)"
summary: "Google Cloud Architecture Center guide to 12 agent design patterns and how to choose between them."
category: source
lastmod: 2026-11-13
tags: ["agents", "patterns"]
---

- **What:** architecture guide, Google Cloud Architecture Center
- **Author:** Samantha He (Technical Writer, Google Cloud), with 16 Google contributors
- **Date:** not shown on the page (read 2026-11-13)
- **Original:** [docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system)

## Summary

The guide catalogues reusable architectures for agentic systems and gives a three-step way to choose one: define requirements, review the patterns, then match the pattern to the workload. It covers a single-agent baseline, eight multi-agent patterns, ReAct, human-in-the-loop and custom logic. Its central advice is to start with one agent and add structure only when a requirement demands it. Implementation pointers are Google-specific (ADK, Cloud Run, Agent Gateway/Identity/Registry), but the patterns themselves are general.

## Key claims

- Choose a pattern by four requirements: task characteristics (fixed steps or open-ended), latency, cost budget, and the need for human judgment.
- Tasks that are predictable or need a single model call (summarise, translate, classify) are often better served without agents.
- Start with a single agent. Its performance degrades as tools and responsibilities grow, and that is the signal to consider ReAct or multi-agent.
- Workflow patterns (sequential, parallel, loop) use predefined control flow with no model orchestration, which makes them cheaper and faster but rigid.
- Model-orchestrated patterns (coordinator, hierarchical decomposition, swarm) adapt at runtime but cost more calls, tokens and latency. Swarm is the most complex and costly.
- Loop and swarm patterns need explicit exit conditions, or they risk runaway cost and non-convergence.
- Every agent needs well-managed context: isolate it per agent, persist it across steps, compress large data.
- Human-in-the-loop improves safety at critical points but requires building an external review system.
- No evaluation guidance is given.

## Feeds

[Agent design patterns](../concepts/agent-design-patterns.md) · [Agent loop](../concepts/agent-loop.md) · [Subagents](../concepts/subagents.md) · [Context engineering](../concepts/context-engineering.md) · [Verification and evals](../concepts/verification-and-evals.md) · [Agent guardrails](../concepts/agent-guardrails.md)
