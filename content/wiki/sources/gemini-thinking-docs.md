---
title: "Source: Gemini API Docs — Thinking"
summary: "Google's reference for Gemini thinking: thinking levels per model, thought summaries, thought signatures and billing."
category: source
lastmod: 2026-11-14
tags: ["models", "reasoning", "google"]
---

- **What:** official API documentation page
- **Publisher:** Google (Gemini API / AI Studio)
- **Date:** accessed 2026-11-14 (examples use `Api-Revision: 2026-05-20`)
- **Original:** [Thinking](https://aistudio.google.com/docs/thinking) (formerly ai.google.dev/gemini-api/docs/thinking)

## Summary

Lists which Gemini models think, the `thinking_level` control and per-model defaults, how to request thought summaries, and how thought signatures carry reasoning state across turns.

## Key claims

- Thinking is on by default for all listed Gemini models (Gemini 4 family, 3.x Flash/Pro, 2.5 Pro/Flash), except `gemini-2.5-flash-lite`, where it is off.
- `thinking_level`: `minimal`, `low`, `medium`, `high`, plus `xhigh` on gemini-4-hydrogen only. `minimal` is unsupported on Gemini 4 and 3.8 Flash. Defaults vary: `high` on hydrogen and 3.x Pro, `medium` on carbon/argon and recent Flash, `minimal` on Flash-Lite.
- Thought summaries are off by default (`thinking_summaries: "auto"` to enable); they stream as `thought_summary` deltas.
- Thought signatures are encrypted reasoning state on thought steps. In stateful mode the server manages them; in stateless mode resend every thought block unmodified, including built-in tool signatures.
- Thinking tokens are billed as output (`total_thought_tokens`) for the full reasoning, not just the summary. `max_output_tokens` includes thinking; hitting it mid-reasoning gives an incomplete response that is still billed.
- Guidance: minimal thinking for retrieval/classification, default for moderate tasks, maximum for hard coding, math and planning.

## Feeds

[Reasoning models](../concepts/reasoning-models.md) · [Extended thinking](../concepts/extended-thinking.md)
