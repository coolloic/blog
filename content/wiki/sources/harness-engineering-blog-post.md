---
title: "Source: Harness Engineering: The Work Around the Model"
summary: "Owner blog post arguing that agent = model + harness, mapping the harness layers and distilling lessons from Anthropic, OpenAI and LangChain write-ups."
category: source
lastmod: 2026-11-14
tags: ["agents", "harness"]
---

- **What:** blog post on this site
- **Author:** Loic
- **Date:** 2026-11-14
- **Original:** [Harness Engineering: The Work Around the Model](../../posts/harness-engineering.md)

## Summary

Follow-up to the owner's agent-anatomy post. It adopts LangChain's framing (the model is rented, the harness is built), sketches six harness layers (instructions, tools, environment, context management, orchestration, feedback), and draws three lessons from recent engineering write-ups: keep state outside the model, separate the generator from the evaluator, and expect the harness to change with each model generation. It ends with eight working principles.

## Key claims

- The term spread from OpenAI's February 2026 Codex post; the owner notes that page blocked his fetcher, so that section relies on details several independent write-ups agree on.
- Harness layers: instructions (system prompt, AGENTS.md, skills), tools (bash, code execution, MCP, browser), environment (filesystem, git, sandbox), context management (compaction, offloading, resets), orchestration (subagents, handoffs, routing), feedback (tests, linters, evaluators, hooks).
- The filesystem is the foundational primitive; a general bash tool beats many bespoke tools; hooks make selected behaviour deterministic.
- Long-running work needs state in files (progress log, JSON feature list, git) because each session starts with amnesia.
- A separate, skeptical evaluator is easier to tune than a self-critical generator, but it costs a lot (6 h / $200 vs 20 min / $9 in Anthropic's retro-game comparison).
- Every harness component is a bet on a specific model weakness; re-justify components on each model upgrade.
- Benchmarks measure model plus harness.
- Principles: treat failures as harness bugs first; state in files; mechanical feedback; let the agent see what the user sees; separate making from judging; small navigable instructions; scheduled cleanup; re-justify on upgrade.

## Feeds

[Harness engineering](../concepts/harness-engineering.md)
