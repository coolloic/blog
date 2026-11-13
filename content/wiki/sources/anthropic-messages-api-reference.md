---
title: "Source: Messages API reference (Claude API)"
summary: "Reference for Claude's Create Message endpoint, including max_tokens, stop_sequences, stop_reason values and usage accounting."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official API reference
- **Author:** Anthropic
- **Date:** accessed 2026-11-14 (API version 2026-10-21)
- **Original:** [Messages API](https://platform.claude.com/docs/en/api/messages)

## Summary

The reference lists request parameters and response fields for POST /v1/messages. Relevant here are the length and stopping controls and how usage is reported.

## Key claims

- max_tokens is the maximum to generate; the model may stop earlier; 0 populates the prompt cache without generating.
- stop_sequences are custom strings that end generation; the matched string is returned in stop_sequence.
- stop_reason values: end_turn, max_tokens, stop_sequence, tool_use, pause_turn, refusal, model_context_window_exceeded.
- Usage token counts do not map one-to-one to visible content (requests are transformed and outputs parsed); output_tokens is non-zero even for an empty reply.
- Total input = input_tokens + cache_creation_input_tokens + cache_read_input_tokens.
- The 2026-10-21 reference has no temperature, top_p or top_k parameters.

## Feeds

[Sampling parameters](../concepts/sampling-parameters.md) · [Context window](../concepts/context-window.md)
