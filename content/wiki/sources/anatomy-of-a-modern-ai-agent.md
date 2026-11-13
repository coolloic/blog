---
title: "Source: The Anatomy of a Modern AI Agent"
summary: "Blog post mapping an AI agent as a loop plus tools, context, delegation, verification and guardrails."
category: source
lastmod: 2026-11-13
tags: ["agents"]
---

- **What:** blog post on this site
- **Author:** Loic
- **Date:** 2026-11-13
- **Original:** [The Anatomy of a Modern AI Agent](../../posts/anatomy-of-an-ai-agent.md)

## Summary

The post argues that an AI agent is, at its core, a language model running in a loop that picks actions and sees their results. The loop itself is simple. What separates a reliable agent from a demo is the engineering around it: tool design, context management, delegation, verification and guardrails.

## Key claims

- An agent is an LLM in a loop: generate, execute the requested tool calls, append the results, repeat until the model stops calling tools.
- Tool quality depends on interface design (name, description, schema). Overlapping tools cause wrong choices.
- MCP standardises how tools are exposed, so integrations are built once and reused by any compatible agent.
- Context is finite, and models degrade as it fills with noise. "Context engineering" (on-demand loading, lean tool output, compaction, written notes) is the key skill.
- Subagents give sub-tasks a fresh context and return summaries. That's worth it only when the sub-tasks are independent, because handoffs are lossy and cost tokens.
- Agents need feedback that comes from outside the model (tests, screenshots, citations). Builders need evals.
- Guardrails (sandboxing, permissions, treating fetched content as data) are what allow autonomy to grow safely.

## Feeds

[Agent loop](../concepts/agent-loop.md) · [Tools](../concepts/tools.md) · [Model Context Protocol](../concepts/model-context-protocol.md) · [Context engineering](../concepts/context-engineering.md) · [Subagents](../concepts/subagents.md) · [Verification and evals](../concepts/verification-and-evals.md) · [Agent guardrails](../concepts/agent-guardrails.md)
