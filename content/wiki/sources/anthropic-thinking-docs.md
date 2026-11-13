---
title: "Source: Claude API Docs — Thinking"
summary: "Anthropic's reference for Claude thinking: modes per model, display, signatures, tool use, interleaving, caching, context-window rules."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** accessed 2026-11-14 (living document; API version header `2026-10-21` in examples)
- **Original:** [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking)

## Summary

The mode-neutral reference for how Claude's thinking works on the Messages API. It gives a per-model table of what each `thinking` value does (`adaptive`, `enabled` + `budget_tokens`, `between_tools`, `disabled`), explains thinking blocks and their encrypted `signature`, the `display` option, the rules for passing thinking blocks back during tool use, interleaved thinking, which models keep prior-turn thinking in context, prompt-caching interactions, and feature incompatibilities.

## Key claims

- Thinking arrives as `thinking` content blocks before `text` blocks. Each carries a `signature`: an encrypted copy of the full reasoning that must be passed back unchanged.
- Visible thinking text is never the raw chain of thought. It is a summary produced by a different model. `display: "summarized"` returns it; `display: "omitted"` (default on Claude 5-generation models, Opus 4.7/4.8) returns an empty field. Billing is for the full thinking either way; omitting only cuts time-to-first-text-token.
- On Claude 5-generation models and Claude Mythos Preview thinking is on by default as adaptive thinking; Opus 4.7/4.8 (and 4.6 and earlier) default to thinking off. `enabled` with `budget_tokens` returns 400 on Claude 4.7 and later (Mythos Preview still accepts it). Several models reject `disabled` (Opus 5.5, all Fable/Mythos); Opus 5 and Haiku 5.5 accept it only at effort `high` or below. Sonnet 5.5's lowest setting is `between_tools` (up-front thinking off), also only at `high` or below.
- `effort` (in `output_config`) controls how much work the whole response gets; `max_tokens` is the only hard ceiling on spend.
- A tool-use loop is one assistant turn. Thinking blocks within that turn must be returned complete and unmodified (including `redacted_thinking` blocks); modified blocks give a 400. Toggling thinking mid-turn silently disables it for that request.
- Manual extended thinking only allows `tool_choice` `auto` or `none`; adaptive thinking supports forced tool use, except on Opus 5.5, Sonnet 5.5 and Fable/Mythos 5.1 and 5.2, which reject forced tool use on every request (use `auto` with strict tools or structured outputs).
- Interleaved thinking (reasoning between tool calls) is automatic with adaptive thinking; the thinking allocation can span the whole turn.
- Keep-all models (Opus 4.5+, Sonnet 4.6+, Haiku 5.5, Fable/Mythos) keep prior turns' thinking in context, billed as input; older models strip it once a non-tool-result user message arrives.
- Thinking configuration and resolved effort are rendered into the prompt, so changing them invalidates cache breakpoints.
- Opus 4.7+ and Claude 5-generation models reject non-default `temperature`/`top_p`/`top_k` (their `top_p` default is 0.99); from API version `2026-10-21` any sampling parameter returns a 400 on every model. Claude 4.6+ rejects assistant prefill. Max output is 128K on current models (300K via a batches beta on some). SDKs require streaming above 21,333 `max_tokens`.
- A request that tries to extract internal reasoning into the response text may be refused on recent models (`reasoning_extraction`).

## Feeds

[Extended thinking](../concepts/extended-thinking.md) · [Reasoning models](../concepts/reasoning-models.md) · [Test-time compute](../concepts/test-time-compute.md)
