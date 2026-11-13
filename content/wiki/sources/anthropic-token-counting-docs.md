---
title: "Source: Token counting (Claude API docs)"
summary: "Anthropic's documentation for the free count_tokens endpoint, including the tokenizer change from Claude Opus 4.7 onward."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official API documentation
- **Author:** Anthropic
- **Date:** accessed 2026-11-14 (API version 2026-10-21)
- **Original:** [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting)

## Summary

Describes POST /v1/messages/count_tokens, which takes the same input as a Messages request (system prompt, tools, images, PDFs, thinking) and returns the input token count. Notes on accuracy, billing, unsupported inputs and model-specific tokenizers.

## Key claims

- The endpoint accepts the same structured input as message creation and returns input_tokens.
- The count is an estimate and may differ slightly from actual usage; system-added tokens may be counted but are not billed.
- Claude Opus 4.7 and later (and the Fable/Mythos families and Mythos Preview) use a newer tokenizer that yields roughly 30% more tokens for the same text; recount rather than reuse old counts.
- Counting is free but rate-limited (5,000-20,000 RPM by tier), with limits separate from message creation.
- Server tools (except the advisor tool), the MCP connector and url/file image or document sources are rejected; send media as base64 to count it.
- Counting does not apply prompt caching.

## Feeds

[Tokenization](../concepts/tokenization.md) · [Context window](../concepts/context-window.md)
