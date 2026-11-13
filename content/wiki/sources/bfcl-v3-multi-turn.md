---
title: "Source: BFCL V3: Multi-Turn and Multi-Step Function Calling (Berkeley)"
summary: "Berkeley Function Calling Leaderboard post explaining why exact call matching fails for multi-turn agents and introducing state-based plus subset-matched response checks."
category: source
lastmod: 2026-11-14
tags: ["evaluation", "agents"]
---

- **What:** benchmark blog post and leaderboard
- **Publisher:** UC Berkeley Gorilla project
- **Date:** 19 September 2024 (updated 10 December 2024); leaderboard page last updated 12 April 2026
- **Original:** [BFCL V3 blog](https://gorilla.cs.berkeley.edu/blogs/13_bfcl_v3_multi_turn.html) · [Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html)

## Summary

BFCL measures function-calling accuracy. V1 checked single calls by parsing them into an AST and matching parameter values against acceptable answers. V3 adds multi-turn tasks, where exact matching breaks, and grades them on backend state plus a minimal required set of calls.

## Key claims

- Exact trajectory matching fails in multi-turn settings because valid paths differ, correct error recovery looks like a deviation, and harmless redundant calls are penalised.
- **State-based check:** compare backend state after each turn (ignoring private attributes); verifies writes but not reads.
- **Response-based check:** the model's calls must include the ground truth's minimal viable execution path; extra calls and reordering are allowed. This catches guessing information that should have been looked up.
- An entry passes only if both checks pass at every turn; runs over 20 steps in one turn are force-terminated and fail.
- Categories (200 each): base, missing parameters (should ask for clarification), missing functions (should recognise no suitable tool), long context, composite.
- Observed failures: skipping implicit state checks, acting without checking current state, unnecessary re-planning, looping.
- Leaderboard: overall accuracy is the unweighted mean of sub-categories; V4 adds holistic agentic evaluation (e.g. web search); cost (USD for the whole benchmark) and latency are reported per model.

## Feeds

[Agent evaluation](../concepts/agent-evaluation.md)
