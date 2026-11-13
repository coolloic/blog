---
title: Wiki
summary: "An LLM-maintained knowledge base on cutting-edge AI."
category: meta
cascade:
  hiddenInRss: true # keep wiki pages out of the blog's RSS feed
---

A knowledge base on cutting-edge AI, maintained by an LLM from sources I collect. Each concept page cites its sources. See the [log](log.md) for what changed and when.

## Concepts

- [Agent guardrails](concepts/agent-guardrails.md): sandboxing, permissions and input handling that bound what an agent can do.
- [Agent loop](concepts/agent-loop.md): the core of every AI agent, a model choosing actions in a loop until the task is done.
- [Context engineering](concepts/context-engineering.md): deciding what goes into an agent's finite context window, and when.
- [Model Context Protocol (MCP)](concepts/model-context-protocol.md): open standard for exposing tools, resources and prompts to any compatible agent.
- [Subagents](concepts/subagents.md): delegating focused sub-tasks to agents with fresh context windows.
- [Tools](concepts/tools.md): functions an agent can call to act on the world; their design is interface design for a model.
- [Verification and evals](concepts/verification-and-evals.md): feedback from outside the model, for the agent at runtime and for the builder over time.

## Sources

- [The Anatomy of a Modern AI Agent](sources/anatomy-of-a-modern-ai-agent.md): blog post mapping an agent as a loop plus tools, context, delegation, verification and guardrails.
