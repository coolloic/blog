---
title: "Source: The \"think\" tool (Anthropic Engineering, 2025)"
summary: "Anthropic engineering post on a no-op 'think' tool for mid-task reasoning, compared with extended thinking; later superseded by interleaved thinking."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "tools"]
---

- **What:** engineering blog post
- **Publisher:** Anthropic
- **Date:** 2025-03-20, updated 2025-12-15
- **Original:** [The "think" tool](https://www.anthropic.com/engineering/claude-think-tool)

## Summary

Describes a tool whose only effect is to log a thought, giving the model room to reason after tool results arrive mid-task. That was something up-front extended thinking did not cover at the time. The December 2025 update says extended thinking has improved and is now recommended over the think tool in most cases.

## Key claims

- Extended thinking (as of the post) happens before the response; the think tool happens during it, after new tool results.
- On τ-Bench airline, the think tool with an optimized prompt scored 0.570 pass^1 against 0.370 baseline (54% relative). Extended thinking performed similarly to the unprompted think tool.
- Best fit: long tool chains, policy-heavy domains, sequential decisions where mistakes are costly. Not useful for single or parallel tool calls or simple instruction following.
- Domain-specific examples of how to reason help most.
- Update (2025-12): extended thinking is now preferred in most cases.

## Feeds

[Extended thinking](../concepts/extended-thinking.md) · [Reasoning models](../concepts/reasoning-models.md)
