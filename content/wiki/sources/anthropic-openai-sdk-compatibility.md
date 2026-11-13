---
title: "Source: OpenAI SDK compatibility (Claude docs)"
summary: "Anthropic's OpenAI-compatible Chat Completions endpoint: what maps, what is ignored or rejected, and why it is meant for testing rather than production."
category: source
lastmod: 2026-11-14
tags: ["platforms", "anthropic", "openai"]
---

- **What:** official documentation page
- **Publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [OpenAI SDK compatibility](https://platform.claude.com/docs/en/cli-sdks-libraries/libraries/openai-sdk)

## Summary

Point an official OpenAI SDK at `https://api.anthropic.com/v1/` with a Claude key and model name to call Claude through Chat Completions. Anthropic positions this for evaluating models, not as a long-term production integration, and documents field-by-field support.

## Key claims

- `strict` on function tools is ignored, so tool arguments are not schema-guaranteed.
- `response_format` accepts only `json_schema` with `strict: true`; `json_object` or `text` return 400.
- Audio and `file` content parts return 400; image URLs work (`detail` ignored).
- Prompt caching is not supported through the layer.
- All system/developer messages are hoisted and concatenated into the top-level system prompt, wherever they appeared.
- Thinking: on by default on Claude 5 models; otherwise pass `thinking` via `extra_body`; thinking content is not returned; `adaptive` returns 400.
- `n` must be 1; `logprobs`, `seed`, penalties, `logit_bias`, `store`, `reasoning_effort`, `service_tier` and others are ignored.
- `temperature` above 1 is capped; on Claude 4.7+ any non-default sampling value returns 400.
- Forced `tool_choice` returns 400 on Opus 5.5, Sonnet 5.5 and Fable/Mythos 5.1-5.2.
- `usage.*_tokens_details`, `logprobs` and `system_fingerprint` come back empty; error message text differs from OpenAI's.
- Some rate-limit headers are renamed (`x-ratelimit-requests` instead of `x-ratelimit-limit-requests`).

## Feeds

[Anthropic Messages API](../concepts/anthropic-messages-api.md) · [OpenAI Responses API](../concepts/openai-responses-api.md)
