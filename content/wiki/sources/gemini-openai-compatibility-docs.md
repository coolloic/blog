---
title: "Source: OpenAI compatibility (Gemini API docs)"
summary: "Google's OpenAI-compatible endpoint for Gemini: supported Chat Completions, embeddings, images and batch features, reasoning_effort mapping, extra_body fields and gaps."
category: source
lastmod: 2026-11-14
tags: ["platforms", "google", "openai"]
---

- **What:** official documentation page
- **Publisher:** Google (Gemini API / AI Studio)
- **Date:** living document; read 2026-11-14
- **Original:** [OpenAI compatibility](https://aistudio.google.com/docs/openai)

## Summary

Gemini models can be called with OpenAI SDKs by changing the base URL to `https://generativelanguage.googleapis.com/v1beta/openai/` and using a Gemini key. The layer is in beta and covers Chat Completions plus a few other endpoints.

## Key claims

- Supported: chat completions (streaming, function calling, image and audio input, structured output parse, `service_tier` flex/priority/standard), embeddings, image generation, batch (but file upload/download must use the native SDK), model list/retrieve.
- The Responses API and a standalone Files API are not covered.
- `reasoning_effort` maps to `thinking_level` on Gemini 3/4 (on Gemini 4 Hydrogen `minimal` and `low` both map to `low`; `xhigh` only there) and to `thinking_budget` on 2.5 (1,024 / 8,192 / 24,576).
- `none` disables thinking only on 2.5 models; Gemini 2.5 Pro, 3 and 4 cannot turn reasoning off. `reasoning_effort` cannot be combined with native `thinking_level`/`thinking_budget`.
- Native features via `extra_body`: `thinking_config` (including `include_thoughts`), `cached_content` for explicit caches.
- Unlisted parameters are silently ignored.

## Feeds

[Gemini API](../concepts/gemini-api.md)
