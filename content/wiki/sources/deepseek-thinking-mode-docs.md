---
title: "Source: DeepSeek API Docs — Thinking Mode"
summary: "DeepSeek's reference for thinking mode: enabling it, effort mapping, reasoning_content, multi-turn and tool-call rules, ignored sampling params."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning"]
---

- **What:** official API documentation page
- **Publisher:** DeepSeek
- **Date:** accessed 2026-11-14 (models `deepseek-flash`, `deepseek-v4-pro`)
- **Original:** [Thinking mode](https://api-docs.deepseek.com/guides/thinking_mode)

## Summary

How to use DeepSeek's reasoning through OpenAI-, Anthropic- and Responses-compatible endpoints. Unlike the closed vendors, the reasoning text itself is returned.

## Key claims

- Thinking is on by default with effort `high`. OpenAI format: `thinking: {type: enabled|disabled}` plus `reasoning_effort` `low|high|max`. Other effort names are mapped onto these three.
- The chain of thought is returned in `reasoning_content`, next to `content` (`delta.reasoning_content` when streaming).
- Without `tools`, earlier turns' `reasoning_content` is ignored if sent. With `tools`, it must be passed back for all previous turns, or the API returns a 400.
- In thinking mode the model can run several reasoning/tool-call rounds before answering.
- `temperature`, `presence_penalty` and `frequency_penalty` are silently ignored in thinking mode; `top_p` is clamped or fixed.

## Feeds

[Reasoning models](../concepts/reasoning-models.md) · [Extended thinking](../concepts/extended-thinking.md)
