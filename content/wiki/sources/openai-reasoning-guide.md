---
title: "Source: Reasoning models guide (OpenAI API docs)"
summary: "OpenAI's reference for reasoning models: reasoning.effort, hidden reasoning tokens, summaries, encrypted reasoning items, context preservation and token limits."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "openai"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14 (living document; covers GPT-5.5, GPT-5.6 and GPT-6 families)
- **Original:** [Reasoning models](https://developers.openai.com/api/docs/guides/reasoning)

## Summary

How to call OpenAI reasoning models through the Responses API: the effort and mode controls, how reasoning tokens are hidden but billed, how to get summaries, how reasoning is carried across turns and tool calls (including statelessly with encrypted content), and how to size output limits.

## Key claims

- Recommended models (Nov 2026): `gpt-6-astra` as default, `gpt-5.6-terra` cheaper, `gpt-5.6-luna` cheapest and fastest. The Responses API is recommended; Chat Completions does not support function calling with GPT-6 Astra or GPT-6.1 Sol.
- `reasoning.effort`: `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`; support varies by model, and the default is `medium` on current models. `reasoning.mode` (`standard` default / `pro`, on GPT-5.6 and GPT-6) is a separate axis; `pro` does more model work, billed at the model's standard token rates, so cost and latency rise. The guide does not say how the extra work is done (e.g. whether it samples in parallel).
- Reasoning tokens are not returned but occupy context and are billed as output (`output_tokens_details.reasoning_tokens`). They range from hundreds to tens of thousands per request.
- `max_output_tokens` caps reasoning plus visible output. Hitting it gives `status: "incomplete"`, possibly with no visible text. Reserve at least 25,000 tokens when starting out.
- Summaries are opt-in via `reasoning.summary` (`auto`; some models also accept `concise` or `detailed`).
- `reasoning.context` (`auto` / `current_turn` / `all_turns`; GPT-5.6 defaults to `all_turns`, earlier models to `current_turn`) controls whether earlier reasoning is reused. Reuse works only within a model family; incompatible reasoning is dropped on a family switch.
- With `store: false` / ZDR, reasoning items carry `encrypted_content`; replay all output items in order. Pass reasoning items back with tool outputs so the model continues its reasoning.
- A `configuration_update` input item can change effort mid-conversation without changing the cached prefix.
- Prompting: give the goal, constraints and output format rather than every step; treat effort as a tuning knob; define "done" for agentic tasks.

## Feeds

[Reasoning models](../concepts/reasoning-models.md) · [Test-time compute](../concepts/test-time-compute.md) · [Extended thinking](../concepts/extended-thinking.md)
