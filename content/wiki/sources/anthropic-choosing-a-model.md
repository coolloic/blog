---
title: "Source: Choosing the right model (Anthropic)"
summary: "Anthropic's guide to picking a Claude model: criteria, efficiency-first vs capability-first starts, a selection matrix and eval-driven upgrades."
category: source
lastmod: 2026-11-14
tags: ["models", "anthropic", "model-selection"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model)

## Summary

Frames model choice as balancing capabilities, speed and cost, with effort as a within-model lever. Offers two starting strategies and recommends building use-case-specific evals before switching models.

## Key claims

- Criteria: capabilities, speed, cost, and effort; tuning effort is often a better lever than switching models.
- Efficiency-first: start with Haiku 5.5, test, upgrade only for proven gaps. Suits prototyping, tight latency, cost-sensitive, high-volume simple tasks.
- Capability-first: start with Opus 5.5, optimise prompts, then lower effort or downgrade; move to Fable 5.2 only if evals at `xhigh`/`max` still fall short.
- Selection matrix: Fable 5.2 for hours-long agent sessions and deep research; Opus 5.5 for complex agentic coding and enterprise work; Sonnet 5.5 for everyday coding/agent work; Haiku 5.5 for lowest latency/price and subagent tasks.
- A good evaluation set on your own prompts and data is called the most important step in deciding to upgrade.
- Opus 5.5 has breaking changes for integrations that force tool use (`tool_choice` `any`/`tool`), turn thinking off, or use the `computer_20251124` tool.
- Multi-model strategies pair a cheap model with a frontier model (executor+advisor, orchestrator+workers).

## Feeds

[Model selection](../concepts/model-selection.md)
