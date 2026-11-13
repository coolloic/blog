---
title: "Source: Tasks (CrewAI docs)"
summary: "CrewAI Task attributes, context passing between tasks, structured outputs and function or LLM-based task guardrails."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "crewai"]
---

- **What:** official documentation page
- **Author:** CrewAI Inc.
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://docs.crewai.com/en/concepts/tasks](https://docs.crewai.com/en/concepts/tasks)

## Summary

A Task is a unit of work with a description and expected output, optionally bound to an agent. Outputs pass forward as context, can be structured with Pydantic, and can be validated by guardrails that send failures back to the agent for retries.

## Key claims

- Required: `description` and `expected_output`.
- Outputs flow to the next task by default; `context` selects specific (even non-adjacent) upstream tasks.
- `async_execution` runs a task in the background; dependants listing it in `context` wait for it.
- Guardrails can be functions returning `(ok, result_or_error)` or natural-language criteria checked by the agent's LLM.
- Failed guardrails retry up to `guardrail_max_retries` (default 3).
- The final task's output is the crew's output.

## Feeds

- [CrewAI](../concepts/crewai.md)
