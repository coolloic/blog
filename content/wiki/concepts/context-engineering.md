---
title: "Context engineering"
summary: "Deciding what goes into an agent's finite context window, and when."
category: concept
sources:
  - ../sources/anatomy-of-a-modern-ai-agent.md
  - ../sources/google-cloud-choose-agentic-design-pattern.md
lastmod: 2026-11-14
tags: ["agents", "context"]
---

**Context engineering** is the practice of controlling what is in an agent's [context window](context-window.md) at each step: [system prompt](system-prompts.md), tool definitions, conversation history and tool results. The window is finite, and models [use information less well](long-context-degradation.md) as it fills with noise. Managing context is arguably the most important skill in building agents.

## Techniques

- **Load on demand.** Give the agent search and read [tools](tools.md) rather than pre-loading documents. This is how [coding agents](coding-agents.md) work in codebases far larger than their window.
- **Keep tool output lean.** Summarise, paginate and truncate. A 50,000-line log dump wastes context.
- **Compact long sessions.** Near the limit, replace the history with a summary that keeps decisions and open threads.
- **Write things down.** Notes in files (plans, progress logs, to-do lists) let an agent recover its state after a reset or compaction (see [agent memory](agent-memory.md)).
- **Delegate.** [Subagents](subagents.md) do context-heavy work in a fresh window and return only a summary.

In multi-agent systems the same principles apply per agent: **isolate** each agent's context, **persist** what later steps need, and **compress** large data before passing it on ([Google Cloud](../sources/google-cloud-choose-agentic-design-pattern.md)).

## Related

[Agent loop](agent-loop.md)

## Going deeper

- [Context window](context-window.md): current window sizes per model and provider-side compaction / context editing.
- [Long-context degradation](long-context-degradation.md): the evidence (lost-in-the-middle, context rot) behind keeping context small.
- [Agent Memory](agent-memory.md): compaction, tool-result clearing and long-term memory stores.
- [Prompt Caching](prompt-caching.md): why stable-first context ordering is also what makes it cacheable.
- [Agentic RAG](agentic-rag.md): just-in-time retrieval as the 'load on demand' technique.
- [Agent Instruction Files](agent-instruction-files.md): how CLAUDE.md / AGENTS.md files are loaded into context.
- [Agent Skills](agent-skills.md): progressive disclosure: load instructions only when needed.
- [Prompt engineering](prompt-engineering.md): writing the static parts of the context well.

## Sources

- [The Anatomy of a Modern AI Agent](../sources/anatomy-of-a-modern-ai-agent.md)
- [Choose a design pattern for your agentic AI system (Google Cloud)](../sources/google-cloud-choose-agentic-design-pattern.md)
