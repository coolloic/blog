---
title: "Source: ADK workflows, graph workflows and LoopAgent (ADK docs)"
summary: "ADK documentation on workflow types: template workflow agents (Sequential, Parallel, Loop), graph-based and dynamic workflows."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "google"]
---

- **What:** official documentation pages: Workflows overview, Graph-based workflows, Template workflows, Loop agents
- **Author:** Google
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://adk.dev/workflows/](https://adk.dev/workflows/)

## Summary

ADK offers four workflow styles: template workflow agents (pre-built Sequential, Parallel and Loop agents that never consult a model for ordering), graph workflows (nodes and edges with conditional routing), dynamic workflows (orchestration in ordinary code) and collaborative workflows (a coordinator agent with sub-agents). Graph, dynamic and collaborative workflows require ADK 2.0. Related pages: [graphs](https://adk.dev/graphs/), [template workflows](https://adk.dev/agents/workflow-agents/), [loop agents](https://adk.dev/agents/workflow-agents/loop-agents/).

## Key claims

- Template workflow agents decide execution order without an AI model, so execution is predictable.
- Template workflows are marked deprecated in Python, TypeScript, Go and Kotlin docs in favour of graph and dynamic workflows.
- Graph nodes can be LLM agents, functions/tools or sub-workflows; a node's output becomes the next node's input.
- Conditional edges route on a route value emitted by a node; fan-out and join nodes are supported.
- `LoopAgent` stops on `max_iterations` (Python default `None`) or when a sub-agent sets `escalate`; without either it can loop forever.
- Loop examples pass data via `output_key` state and `{key}` placeholders, and rely on an agreed exit phrase, which is brittle.
- Agent routing (choosing agents at runtime via router functions) is experimental.

## Feeds

- [Google ADK](../concepts/google-adk.md)
