---
title: "Source: The Anatomy of an Agent Harness (LangChain, 2026)"
summary: "LangChain post defining the harness as everything that isn't the model and walking through the components that give a model durable state, execution and long-horizon behaviour."
category: source
lastmod: 2026-11-14
tags: ["agents", "harness"]
---

- **What:** engineering blog post
- **Author:** Vivek Trivedy
- **Publisher:** LangChain
- **Date:** 2026-03-10
- **Original:** [The Anatomy of an Agent Harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)

## Summary

Defines an agent as model plus harness, where the harness is all code, configuration and execution logic outside the model. Raw models cannot keep durable state, run code, learn post-cutoff facts or set up their own environment; harness components supply each capability. The post works backwards from desired behaviours to components.

## Key claims

- Components: system prompts; tools, skills and MCP servers with their descriptions; bundled infrastructure (filesystem, sandbox, browser); orchestration (subagent spawning, handoffs, model routing); hooks and middleware for deterministic steps (compaction, continuation, lint checks).
- The filesystem is the most foundational primitive: durable workspace, overflow for context, cross-session persistence, collaboration surface. Git adds versioning and rollback.
- A bash / code-execution tool lets the agent build what it needs instead of relying only on predefined tools.
- Sandboxes give isolated execution with optional command allow-lists and network isolation, scale on demand, and ship with runtimes, git, test CLIs and a browser.
- Memory: files such as AGENTS.md injected at start act as a simple form of continual learning; web search and MCP tools cover knowledge past the cutoff.
- Context-rot countermeasures: compaction near capacity, tool-output offloading (keep head and tail in context, full output on disk), and skills with progressive disclosure.
- Long-horizon execution: filesystem and git for progress tracking, "Ralph loops" that catch the model's exit attempt and re-inject the original prompt into a clean context, planning, and self-verification via tests run through hooks.
- Models post-trained with a harness in the loop can overfit to it; the best harness for a task is not necessarily the one the model was trained with. On Terminal-Bench 2.0 the same model (Opus 4.6) scores very differently across harnesses, and LangChain moved its coding agent from roughly top 30 to top 5 by changing only the harness.
- Some harness functions may move into models over time, but harness engineering stays useful. Open problems: coordinating many parallel agents, agents analysing their own traces to fix harness failures, just-in-time assembly of tools and context.

## Feeds

[Harness engineering](../concepts/harness-engineering.md)
