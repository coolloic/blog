---
title: "Source: Gemini API Streaming Interactions Docs"
summary: "Google Gemini API documentation on SSE streaming in the Interactions API using a step-based event model."
category: source
lastmod: 2026-11-14
tags: ["models", "streaming", "google"]
---

- **What:** official API documentation page
- **Author/publisher:** Google
- **Date:** living document; read 2026-11-14
- **Original:** [Streaming interactions](https://aistudio.google.com/docs/streaming)

## Summary

The Interactions API (which the docs now position ahead of the legacy generateContent API) streams with `stream: true` / `?alt=sse`. All content (text, thoughts, tool calls) flows through a uniform step-based event model.

## Key claims

- Event sequence: `interaction.created` → optional `interaction.status_update` → for each step `step.start` (with step `type`, e.g. `thought` or `model_output`), N × `step.delta`, `step.stop` → `interaction.completed` (with usage, including cached and thought tokens) → `done` with `[DONE]`. Failures arrive as an `error` event with `code` and `message` (example: `gateway_timeout`).
- Delta types include `text` and `thought_signature`.
- A non-streaming response's `steps` array equals the assembled `step.start` → deltas → `step.stop` cycles.
- The older generateContent API streams via `streamGenerateContent`; structured output streams as partial JSON chunks.

## Feeds

[Streaming](../concepts/streaming.md)
