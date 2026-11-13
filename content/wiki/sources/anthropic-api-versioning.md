---
title: "Source: API versions (Claude docs)"
summary: "Anthropic's anthropic-version header policy and the changes in 2026-10-21 (sampling parameters removed, stricter citation and document placement)."
category: source
lastmod: 2026-11-14
tags: ["platforms", "anthropic"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [API versions](https://platform.claude.com/docs/en/api/versioning)

## Summary

Every request names an API version in `anthropic-version`. Within a version Anthropic keeps inputs and outputs stable but may add optional fields, new enum values and new streaming event types.

## Key claims

- Guarantees: existing input and output parameters are preserved; additive changes (new optional inputs, output values, enum variants, event types) can happen within a version.
- `2026-10-21`: `temperature`, `top_p`, `top_k` removed (400 on every model); `document` blocks in assistant messages and user `text` blocks with non-empty `citations` return 400; several Admin API field renames.
- On Bedrock, `2026-10-21` is available only for Claude 4.7 and later.
- `2023-06-01` introduced the current SSE format (incremental named events, no `[DONE]`).

## Feeds

[Anthropic Messages API](../concepts/anthropic-messages-api.md)
