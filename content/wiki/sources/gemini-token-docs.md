---
title: "Source: Understand and count tokens (Gemini API docs)"
summary: "Google's documentation on Gemini tokens: characters per token, counting endpoints, multimodal token rates and context limits."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** official API documentation
- **Author:** Google
- **Date:** accessed 2026-11-14
- **Original:** [Understand and count tokens](https://aistudio.google.com/docs/tokens)

## Summary

Explains how Gemini measures text and media in tokens, how to count before and after a call, and the input/output limits of current model families.

## Key claims

- For Gemini, a token is about 4 characters; 100 tokens is roughly 60-80 English words.
- countTokens returns input tokens before a call; the response usage reports input, output, thought, cached and tool-use tokens.
- Images up to 384 px on both sides cost 258 tokens; larger images are tiled at 768x768, 258 tokens per tile. Audio is 32 tokens per second.
- As of 2026-11, Gemini 4 models share one 1,048,576-token window across input, thinking and output (default 65,536 output cap); Gemini 3 and 2.5 have separate 1,048,576-input and 65,536-output budgets.
- Model metadata exposes input_token_limit and output_token_limit programmatically.

## Feeds

[Tokenization](../concepts/tokenization.md) · [Context window](../concepts/context-window.md)
