---
title: "Source: agentevals (LangChain)"
summary: "Open-source library of agent trajectory evaluators: reference trajectory matching in four modes, tool-argument matching rules, and LLM-as-judge trajectory graders."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** open-source library README (Python and TypeScript)
- **Publisher:** LangChain
- **Date:** accessed 2026-11-14
- **Original:** [github.com/langchain-ai/agentevals](https://github.com/langchain-ai/agentevals)

## Summary

Prebuilt evaluators that grade an agent's intermediate steps (messages and tool calls) rather than only its final answer, either deterministically against a reference trajectory or with an LLM judge.

## Key claims

- `create_trajectory_match_evaluator(trajectory_match_mode=...)` modes: `strict` (same tool calls in the same order; message text may differ), `unordered` (same calls, any order), `subset` (no tools beyond the reference), `superset` (reference tools must appear, extras allowed).
- `tool_args_match_mode`: `exact` (default), `ignore`, `subset`, `superset`; `tool_args_match_overrides` sets per-tool rules (exact, ignore, a list of fields, or a comparator function) and takes precedence.
- `create_trajectory_llm_as_judge(prompt, model, ...)` grades a trajectory with or without a reference (`TRAJECTORY_ACCURACY_PROMPT`, `TRAJECTORY_ACCURACY_PROMPT_WITH_REFERENCE`); options include `continuous`, `choices`, `few_shot_examples`.
- Graph trajectory evaluators work on visited nodes for LangGraph: `extract_langgraph_trajectory_from_thread`, `graph_trajectory_strict_match`, `create_graph_trajectory_llm_as_judge`.
- All evaluators support Python asyncio (e.g. `create_async_trajectory_match_evaluator`, `create_async_trajectory_llm_as_judge`).

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
