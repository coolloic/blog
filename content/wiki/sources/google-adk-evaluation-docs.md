---
title: "Source: ADK documentation: Why evaluate agents"
summary: "Google Agent Development Kit docs on test files, evalsets, trajectory and response metrics, rubric judges, user simulation and the adk eval CLI."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** official framework documentation
- **Publisher:** Google
- **Date:** accessed 2026-11-14
- **Original:** [adk.dev/evaluate](https://adk.dev/evaluate/)

## Summary

ADK evaluates agents on two axes, the trajectory of tool calls and the final response, with threshold-based scoring because outputs vary run to run. It supports unit-style test files, multi-session evalsets, and simulated users.

## Key claims

- Test files (`*.test.json`) hold one session for fast unit-style checks; evalsets hold many named sessions with initial state, for multi-turn integration tests and user-simulation scenarios.
- Reference metrics: `tool_trajectory_avg_score` (match of expected tool calls; default threshold 1.0; `match_type` `EXACT` by default, or `IN_ORDER` / `ANY_ORDER`, which allow extra calls between the expected ones), `response_match_score` (ROUGE-1; default 0.8), `final_response_match_v2` (LLM-judged semantic match).
- LLM-judged metrics: `rubric_based_final_response_quality_v1`, `rubric_based_tool_use_quality_v1`, `rubric_based_multi_turn_trajectory_quality_v1`, `hallucinations_v1`, `safety_v1`, `per_turn_user_simulator_quality_v1`, `multi_turn_task_success_v1`, `multi_turn_trajectory_quality_v1`, `multi_turn_tool_use_quality_v1`. These need the Vertex Gen AI Evaluation Service.
- Efficiency metrics (`tool_call_count_v1`, `inference_call_count_v1`, `token_usage_v1`, `invocation_duration_v1`) are reported but never pass/fail.
- With user simulation, an LLM generates user turns dynamically; the reference-based metrics (`tool_trajectory_avg_score`, `response_match_score`, `final_response_match_v2`) are not supported in that mode.
- Run via `adk web` (save sessions as eval cases), `pytest` with `AgentEvaluator.evaluate`, or `adk eval <agent> <evalset>`; `adk conformance test` compares live behaviour with recorded baselines in CI.

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
