---
title: "Source: Claude API Docs — Extended Thinking (manual budget)"
summary: "Anthropic's reference for the legacy budget_tokens thinking mode: budget rules, interleaving beta header, caching, migration to adaptive thinking."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (living document)
- **Original:** [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)

## Summary

Covers manual extended thinking, `thinking: {type: "enabled", budget_tokens: N}`, now marked legacy. It sets out the budget constraints, tuning advice, how interleaved thinking is switched on per model generation, the caching consequence of changing the budget, and how to migrate to adaptive thinking with `effort`.

## Key claims

- Deprecated: Claude 4.7 and later reject `type: "enabled"` with a 400. Still the only mode on Opus 4.5, Sonnet 4.5 and Haiku 4.5; deprecated on Opus/Sonnet 4.6.
- `budget_tokens` minimum is 1,024 and must be below `max_tokens` (thinking counts toward it), except with interleaved thinking, where the budget spans every thinking block in the turn.
- The budget is a target, not a strict cap; `max_tokens` is the hard ceiling.
- Tuning: start near the minimum for simple tasks, 16K+ for complex ones; returns diminish. Above 32K, use batch processing to avoid timeouts.
- `usage.output_tokens_details.thinking_tokens` reports billed reasoning tokens (final `message_delta` when streaming).
- Interleaved thinking in manual mode needs the `interleaved-thinking-2025-05-14` beta header on Claude 4/4.5 models; Opus 4.6 manual mode cannot interleave; Haiku 4.5 does not interleave.
- Changing `budget_tokens` invalidates cache breakpoints because the value is rendered into the prompt.
- Migration: drop `budget_tokens`, set `type: "adaptive"`, control depth with `output_config.effort`. Behaviour changes: a fixed budget thinks every request; adaptive may skip thinking on easy inputs.

## Feeds

[Extended thinking](../concepts/extended-thinking.md) · [Reasoning models](../concepts/reasoning-models.md)
