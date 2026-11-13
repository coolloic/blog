---
title: "Source: smolagents conceptual guides: What are agents? and How do multi-step agents work?"
summary: "Hugging Face's agency spectrum (processor to code agent), when to avoid agents, the case for code actions, and the MultiStepAgent ReAct loop with memory steps."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "hugging-face"]
---

- **What:** official conceptual documentation (two pages)
- **Author:** Hugging Face
- **Date:** read 2026-11-14 (docs v1.26.0)
- **Original:** [https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents](https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents), [https://huggingface.co/docs/smolagents/conceptual_guides/react](https://huggingface.co/docs/smolagents/conceptual_guides/react)

## Summary

Defines agents as programs whose control flow is decided by LLM output, with agency as a spectrum from simple processor through router, tool call, multi-step agent and multi-agent to code agent. Argues for deterministic code whenever a fixed workflow fits, and for code actions over JSON when agency is needed. Describes the ReAct-based `MultiStepAgent` loop and its memory steps.

## Key claims

- Agency levels: simple processor, router, tool call, multi-step agent, multi-agent, code agent (highest).
- If a predetermined workflow covers the requests, code it without agents for reliability.
- Code actions beat JSON on composability, object management, generality and representation in training data (citing CodeAct and related papers).
- All agents derive from `MultiStepAgent`: system prompt in a `SystemPromptStep`, task in a `TaskStep`; each loop iteration writes memory to messages, calls the model, parses the action (JSON for ToolCallingAgent, code for CodeAgent), executes it and logs an `ActionStep`; `step_callbacks` run after each step.
- Optional planning periodically writes a `PlanningStep` with updated facts and plan.

## Feeds

- [smolagents](../concepts/smolagents.md)
