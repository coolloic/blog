---
title: "Source: Interactions API (Gemini API docs)"
summary: "Google's Interactions API: step-based requests and responses, server-side state via previous_interaction_id, retention windows, background execution, agents such as Deep Research, and its relation to legacy generateContent."
category: source
lastmod: 2026-11-14
tags: ["platforms", "google"]
---

- **What:** official API documentation page
- **Publisher:** Google (Gemini API / AI Studio)
- **Date:** living document; read 2026-11-14
- **Original:** [Interactions API](https://aistudio.google.com/docs/interactions)

## Summary

The Interactions API is Gemini's newer, recommended endpoint. An interaction is a stored, chronological list of steps (thoughts, tool calls, tool results, model output) that can be chained server-side, run in the background, or target an agent instead of a model.

## Key claims

- Endpoint `POST https://generativelanguage.googleapis.com/v1beta/interactions` with the key in `x-goog-api-key`; body takes `model` (or an agent ID) and `input`.
- Steps include thoughts, `function_call`, `function_result`, `model_output`; stored interactions also include `user_input` steps; `create` returns only model-generated steps.
- `previous_interaction_id` chains turns; `store` defaults to true. `store=false` disables chaining and background execution.
- Only inputs and outputs carry across turns: `tools`, `system_instruction` and `generation_config` (including `thinking_level`) must be re-sent each turn.
- Retention: 55 days on the paid tier (configurable to 7, 14, 28 or 55), 1 day on the free tier; interactions can be deleted.
- `background=true` runs long tasks asynchronously (requires storage).
- Agents such as `deep-research-preview-04-2026`, `deep-research-max-preview-04-2026` and `antigravity-preview-09-2026` can be mixed with model calls in one chain.
- Remote MCP is not yet supported on Gemini 3 ("coming soon"; re-checked 2026-11-14).
- GA since June 2026 and recommended for new projects; `generateContent` is legacy but fully supported, and new capabilities launch on Interactions first.
- Not yet in Interactions: Batch API, Python automatic function calling, explicit caching. Implicit caching works through `previous_interaction_id`.
- SDKs: `google-genai` 2.3.0+ and `@google/genai` 2.3.0+.

## Feeds

[Gemini API](../concepts/gemini-api.md)
