---
title: "Subagents"
summary: "Delegating focused sub-tasks to agents with fresh context windows."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-13
tags: ["agents", "multi-agent"]
---

**Subagents** are agents started by a main agent to handle a focused sub-task, each in its own fresh context window. Each one runs its own [agent loop](agent-loop.md) and returns a summary, not its full transcript.

## Trade-offs

- **Benefit: clean context.** A subagent can read hundreds of files and return a few paragraphs, which keeps the main agent's window clear. This is a [context engineering](context-engineering.md) technique as much as a way to run work in parallel.
- **Benefit: parallelism.** Independent sub-tasks such as search, implementation and review can run at the same time.
- **Cost: lossy handoffs.** A subagent knows only what its brief says, and the main agent sees only the summary.
- **Cost: tokens.** Each subagent pays for its own context.
- **Rule of thumb:** delegate when sub-tasks are truly independent. Otherwise the overhead outweighs the gain.

## Arrangements

How subagents are wired together is an architectural choice. It can be a fixed order (sequential, parallel or loop), routing by a coordinator model, multi-level hierarchical decomposition, or an all-to-all swarm. Google's guide advises starting with a single agent and moving to multi-agent only when one agent must juggle several distinct responsibilities. See [agent design patterns](agent-design-patterns.md).

## Related

[Verification and evals](verification-and-evals.md), where independent reviewer subagents are a common use.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)
