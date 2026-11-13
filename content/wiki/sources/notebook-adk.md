---
title: "Source: Agent Development Kits (Loic's Notebook)"
summary: "The owner's tutorial comparing Google ADK, AWS Strands Agents, Bedrock AgentCore and LangGraph."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "notebook"]
---

- **What:** tutorial page in the owner's Notebook
- **Author:** Loic (site owner)
- **Date:** undated (read 2026-11-14)
- **Original:** [https://coolloic.github.io/Notebook/adk.html](https://coolloic.github.io/Notebook/adk.html)

## Summary

Frames an agent development kit as a category that packages eight production concerns (loop, tools, orchestration, memory, streaming, guardrails, evaluation, deployment) and compares four options in a problem/solution/limits format. Google ADK is presented as a batteries-included framework with both LLM agents and deterministic workflow agents.

## Key claims

- The key axis between kits is who decides the route: your code (workflow agents) or the model (delegation).
- Google ADK primitives (1.x era): `Agent`/`LlmAgent`, `SequentialAgent`, `ParallelAgent`, `LoopAgent`, sub-agents, `Runner`, Session/State/Memory, tools, callbacks.
- ADK limits: young and fast-moving with breaking changes; model-agnostic via LiteLLM but smoothest with Gemini and Vertex AI; smaller community than LangChain.
- Authoring frameworks (ADK, Strands) compose with managed runtimes such as Bedrock AgentCore.

## Feeds

- [Google ADK](../concepts/google-adk.md)
