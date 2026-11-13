---
title: "Source: τ-bench: Tool-Agent-User Interaction Benchmark (Yao et al., 2024)"
summary: "Benchmark of tool-using customer-service agents talking to an LLM-simulated user, graded on final database state, introducing pass^k."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** research paper, arXiv:2406.12045 (Sierra)
- **Authors:** Shunyu Yao, Noah Shinn, Pedram Razavi, Karthik Narasimhan
- **Date:** 17 June 2024
- **Original:** [arxiv.org/abs/2406.12045](https://arxiv.org/abs/2406.12045)

## Summary

An agent with domain API tools and a written policy converses with a user simulated by a language model (retail and airline domains). Success is judged by comparing the database state at the end of the conversation with an annotated goal state, so the grader is deterministic even though the dialogue is open-ended.

## Key claims

- Outcome-based grading: final database state versus annotated goal.
- **pass^k**: the probability that all k independent trials of a task succeed, a reliability metric for repeated real-world use.
- GPT-4o-based agents succeeded on under 50% of tasks, and retail pass^8 was under 25%.
- Setup: 115 retail and 50 airline tasks; user simulated by gpt-4-0613 at temperature 1.0, agent at temperature 0.0; each task capped at 30 agent actions (tool calls or user responses); at least 3 trials per task for main results.
- Main results (pass^1, function calling): gpt-4o 61.2% retail, 35.2% airline.
- Reward combines a database-state check with a check that required information (e.g. a refund amount) appears in the agent's replies. A reward of 1 is "necessary but not sufficient": an agent can, for example, issue a return without the explicit user confirmation the policy requires.
- Failure breakdown (gpt-4o FC, retail, 1 trial per task): 40 of 115 tasks failed; 4 were caused by typos or ambiguity in the user instruction (then fixed), 36 by the agent. Of agent failures, wrong argument or information ~55%, wrong decision-making against policy 25%, partial resolution of compound requests 19%.

## Feeds

[Benchmarks](../concepts/benchmarks.md) · [LLM evaluation](../concepts/llm-evaluation.md) · [Agent evaluation](../concepts/agent-evaluation.md) · [Error analysis](../concepts/error-analysis.md)
