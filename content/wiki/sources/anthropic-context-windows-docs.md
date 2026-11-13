---
title: "Source: Context windows (Claude API docs)"
summary: "Anthropic's documentation on what counts toward Claude's context window, window sizes by model, thinking-token handling and overflow behaviour."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official API documentation
- **Author:** Anthropic
- **Date:** accessed 2026-11-14
- **Original:** [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)

## Summary

Defines the context window as everything the model can reference when generating, including its own response, and explains how system prompt, messages, tool definitions, cached tokens and thinking tokens all count. Lists window sizes by model and what happens when a request overflows.

## Key claims

- Everything in the request counts: system prompt, all messages (tool results, images, documents), tool definitions, plus the generated output including thinking.
- Accuracy and recall degrade as token count grows ("context rot"), so curating context matters as much as capacity.
- As of 2026-11, current Claude models (Opus 4.6+, Sonnet 4.6+, Haiku 5.5, Fable/Mythos, Mythos Preview) have 1M-token windows by default with up to 128k output tokens per request; older models (e.g. Opus 4.5, Haiku 4.5, the deprecated Sonnet 4.5) have 200k.
- 1M is the default with no beta header, billed at standard pricing except on Haiku 5.5, where prompts over 100,000 tokens cost more.
- Cached prompt prefixes still occupy the window; caching changes price, not size.
- Input alone exceeding the window returns a 400 "prompt is too long"; on Claude 4.5+ input + max_tokens may exceed the window, and generation stops with stop_reason model_context_window_exceeded.
- Whether previous-turn thinking blocks stay in context depends on the model; newer models keep them.
- Sonnet 4.5, Sonnet 4.6, Sonnet 5 and Haiku 4.5 receive injected token-budget tags ("context awareness"); Opus 4.7+, Sonnet 5.5, Haiku 5.5 and Fable/Mythos 5.x do not, and can be given task budgets (beta) instead.
- Server-side compaction is in beta for Claude 4.6+ and Claude Mythos Preview; context editing can clear old tool results and thinking blocks.
- Up to 600 images or PDF pages per request (100 for 200k models), so request size limits can bind before token limits.

## Feeds

[Context window](../concepts/context-window.md)
