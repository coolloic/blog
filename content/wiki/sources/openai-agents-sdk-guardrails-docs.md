---
title: "Source: Guardrails (OpenAI Agents SDK docs)"
summary: "Input, output and tool guardrails in the OpenAI Agents SDK, tripwire semantics, parallel vs blocking execution, and gaps."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "guardrails"]
---

- **What:** official documentation page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/guardrails/](https://openai.github.io/openai-agents-python/guardrails/)

## Summary

Guardrails are checks that run alongside agents. Input guardrails run on the first agent, output guardrails on the agent producing the final output, and tool guardrails wrap function tools on every call. A guardrail returns a result with a tripwire flag; a tripped wire raises an exception and halts the run.

## Key claims

- Input guardrails run only for the first agent; by default in parallel with it (`run_in_parallel=True`), so tokens and tool side effects may already have occurred when they trip.
- Blocking mode (`run_in_parallel=False`) finishes the check before the agent starts.
- Output guardrails run only on the final agent, after it completes.
- Tripwires raise `InputGuardrailTripwireTriggered` / `OutputGuardrailTripwireTriggered` (and tool-level equivalents).
- Agents reached via handoff do not get input guardrails; use tool guardrails for checks across a multi-agent workflow.
- Tool guardrails do not cover handoff calls, hosted tools (web search) or built-in execution tools (computer, shell), and `as_tool()` does not expose them.

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)
