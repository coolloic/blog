---
title: "Source: Optimizing for cost and intelligence (Anthropic)"
summary: "Anthropic's measured guidance on multi-model strategies (advisor, orchestrator), effort-based routing and cost per completed task."
category: source
lastmod: 2026-11-14
tags: ["models", "anthropic", "model-selection", "cost"]
---

- **What:** official API documentation page with measured experiments
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (figures at list prices at measurement time)
- **Original:** [Optimizing for cost and intelligence](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)

## Summary

Argues for tuning one model (effort sweep) before adding a second, then reports experiments with an advisor pattern (cheap executor escalates to a stronger model) and an orchestrator pattern (frontier model delegates to cheaper workers). Most gains were smaller or less consistent than intuition suggests.

## Key claims

- Sweep effort on the current model first; adopt a pairing only if it beats the single model's whole score-vs-spend curve.
- Advisor results were mixed: about +1.7 points at ~2.1x cost on a coding benchmark, no gain on GPQA Diamond, and a 7-point loss on a chart task where the advisor was almost never consulted.
- Orchestrator: Opus 5.5 directing Sonnet 5.5 subagents cost about a third less on work larger than one context window at similar score; Haiku 5.5 workers on coding cut cost 32% but lost about 4 points of pass rate.
- For single dependent chains or work that fits in one context, a single model at lower effort won in every case measured.
- Cheapest routing when outcomes are checkable: run at low effort and re-run failures at high effort (on SWE-bench Pro ~97% solved at ~$0.17/task vs 95.3% at ~$0.29 all-high).
- Price the tail, not the median: on one run two of 20 problems carried 43% of spend.
- Compare cost per completed task, not per token: Opus 5.5 at low effort matched Sonnet 5.5 at default for ~7% more per solved task.
- The page does not say whether a prompt cache built on one model can be reused by another; it advises checking with cache diagnostics.
- Changing effort, speed, system prompt or tools mid-conversation invalidates the prompt cache.

## Feeds

[Model selection](../concepts/model-selection.md)
