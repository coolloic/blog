---
title: "Source: Claude API Docs — Steering Thinking"
summary: "Anthropic's guide to adaptive thinking: effort levels, prompt steering, cache effects, cost control and billing of thinking tokens."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (living document)
- **Original:** [Steering thinking](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost)

## Summary

Explains adaptive thinking: the model decides per request whether to think and how much. Effort is the main lever, with system-prompt and per-message wording as secondary levers. It also covers caching, cost bounds and what is billed.

## Key claims

- Effort levels: `low`, `medium`, `high`, `xhigh`, `max`. `high` is the default on most models; `medium` on Claude Opus 5.5 and Haiku 5.5. No level guarantees a thinking block on every request.
- In tool loops, the first request after new user input usually carries most of the reasoning; follow-ups that only process tool results may skip thinking. Thinking per request tends to fall as conversations grow.
- Prompt steering ("think carefully", "respond directly") works on some models but not reliably on others (Sonnet 5.5, Haiku 5.5, Fable 5.2); lowering effort is the calibrated lever.
- Changing the top-level effort can invalidate the prompt cache; a beta per-message effort change preserves it.
- Cost control: `max_tokens` is a hard per-request cap (not per turn in a tool loop); effort is soft. If you see `stop_reason: "max_tokens"`, raise the cap or lower effort.
- Billing: thinking tokens are output tokens; preserved prior-turn thinking is input; summary generation is free; billed output does not match visible tokens.
- When thinking is active the API adds a specialized system prompt.

## Feeds

[Extended thinking](../concepts/extended-thinking.md) · [Test-time compute](../concepts/test-time-compute.md) · [Reasoning models](../concepts/reasoning-models.md)
