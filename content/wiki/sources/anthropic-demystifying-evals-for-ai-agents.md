---
title: "Source: Demystifying evals for AI agents (Anthropic)"
summary: "Anthropic engineering post defining tasks, trials, graders and outcomes, and giving a roadmap for building agent eval suites."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** engineering blog post
- **Authors:** Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, Jiri De Jonghe (Anthropic)
- **Date:** 9 January 2026
- **Original:** [anthropic.com/engineering/demystifying-evals-for-ai-agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## Summary

A practitioner's vocabulary and playbook for evaluating agents. It separates the eval harness from the agent harness, distinguishes capability evals from regression evals, compares code, model and human graders, and argues that reading transcripts and maintaining tasks matter more than which eval framework is used.

## Key claims

- Vocabulary: a **task** has inputs and success criteria; a **trial** is one attempt; a **grader** scores one aspect; the **transcript** is the full trace; the **outcome** is the final environment state, which can differ from what the agent claims it did.
- Code graders are fast, cheap, reproducible but brittle to valid variation; model graders handle nuance but are non-deterministic and need human calibration; human graders are the gold standard but slow and costly.
- Scores can combine graders as weighted, binary (all must pass) or hybrid.
- **pass@k** (at least one success in k trials) rises with k; **pass^k** (all k succeed) falls with k. At 75% per-trial success, pass^3 is about 42%.
- Capability evals should start at a low pass rate; regression evals should sit near 100%. Saturated capability tasks "graduate" into the regression suite.
- Start with 20 to 50 tasks drawn from real failures; early changes have large effects, so small sets detect them.
- Tasks must be unambiguous (two experts reach the same verdict); a 0% pass rate over many trials usually means a broken task.
- Balance positive and negative cases (should trigger / should not trigger); start each trial from a clean environment to avoid correlated failures and leaks.
- Grade outcomes rather than exact paths; allow partial credit; give LLM judges an "Unknown" option; harden graders against hacks.
- Grader bugs distort scores: Opus 4.5 went from 42% to 95% on CORE-Bench after grading fixes and a less constrained scaffold.
- Saturation: SWE-bench Verified rose to over 80% in about a year (the post gives the starting point as 30% in one place and 40% in another).
- Benchmarks by agent type: SWE-bench Verified and Terminal-Bench (coding), τ-bench/τ2-bench (conversational), BrowseComp (research), WebArena and OSWorld (computer use).
- Tools named: Harbor, Braintrust, LangSmith, Langfuse, Arize Phoenix; the framework matters less than task quality.
- Layer automated evals with production monitoring, A/B tests, user feedback and human review (a "Swiss cheese" model).

## Feeds

[LLM evaluation](../concepts/llm-evaluation.md) · [LLM-as-judge](../concepts/llm-as-judge.md) · [Benchmarks](../concepts/benchmarks.md)
