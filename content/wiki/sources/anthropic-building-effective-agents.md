---
title: "Source: Building effective agents (Anthropic)"
summary: "Anthropic's guide to agentic systems: prefer the simplest solution, distinguish workflows from agents, and start with raw LLM APIs before adopting a framework."
category: source
lastmod: 2026-11-14
tags: ["agents", "frameworks"]
---

- **What:** engineering blog post
- **Author/publisher:** Anthropic (Erik S. and Barry Zhang)
- **Date:** 2024-12-19 (the page now carries a note that the tooling landscape has changed since December 2024 and points to Claude Managed Agents)
- **Original:** [anthropic.com/engineering/building-effective-agents](https://www.anthropic.com/engineering/building-effective-agents)

## Summary

The post separates **workflows** (LLMs and tools orchestrated through predefined code paths) from **agents** (LLMs directing their own process and tool use), catalogues common workflow patterns, and recommends adding agentic complexity only when it measurably helps. It includes a short section on when and how to use frameworks.

## Key claims

- Find the simplest solution first; for many applications, optimizing single LLM calls with retrieval and in-context examples is enough.
- Agentic systems trade latency and cost for task performance.
- Frameworks simplify low-level work (calling LLMs, defining and parsing tools, chaining calls), but extra abstraction can hide the underlying prompts and responses, making debugging harder, and makes it tempting to add complexity.
- Start with LLM APIs directly, since many patterns take a few lines of code; if you adopt a framework, understand the code underneath, because wrong assumptions about it are a common source of customer error.

## Feeds

[LlamaIndex](../concepts/llamaindex.md), [DSPy](../concepts/dspy.md), [Pydantic AI](../concepts/pydantic-ai.md), [Vercel AI SDK](../concepts/vercel-ai-sdk.md)
