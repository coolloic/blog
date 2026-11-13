---
title: "Source: Writing effective tools for agents (Anthropic, 2025)"
summary: "Anthropic engineering post on designing and evaluating agent tools: consolidation, token-efficient responses, truncation, namespacing and eval-driven iteration."
category: source
lastmod: 2026-11-14
tags: ["agents", "tools"]
---

- **What:** engineering blog post
- **Publisher:** Anthropic
- **Date:** 2025-09-11
- **Original:** [Writing effective tools for agents — with agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

## Summary

Treats tools as a contract between deterministic software and a non-deterministic agent. Recommends few, purpose-built tools whose outputs are token-efficient, and iterating on them with realistic evals and transcript review.

## Key claims

- Prefer consolidated, workflow-shaped tools (e.g. a log search returning relevant lines) over thin wrappers on every endpoint; overlapping tools distract agents.
- Return high-signal fields; offer a concise/detailed response format; paginate, filter and set sensible default limits.
- Claude Code caps tool responses at 25,000 tokens by default; truncation messages should steer the agent to narrower queries, and errors should say how to fix the call.
- Namespace related tools by service/resource prefixes; the best scheme varies by model and should be tested.
- Evaluate tools with multi-step, verifiable tasks; track tool errors and call counts; use held-out sets to avoid overfitting.

## Feeds

[Coding agents](../concepts/coding-agents.md)
