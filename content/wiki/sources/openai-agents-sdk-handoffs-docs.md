---
title: "Source: Handoffs (OpenAI Agents SDK docs)"
summary: "How OpenAI Agents SDK handoffs work: transfer tools, the handoff() options, input filters and nested history."
category: source
lastmod: 2026-11-14
tags: ["frameworks", "agents", "multi-agent"]
---

- **What:** official documentation page
- **Author:** OpenAI
- **Date:** undated living docs (read 2026-11-14)
- **Original:** [https://openai.github.io/openai-agents-python/handoffs/](https://openai.github.io/openai-agents-python/handoffs/)

## Summary

A handoff lets one agent pass the conversation to another. Handoffs appear to the model as tools named `transfer_to_<agent>`. The `handoff()` helper adds callbacks, typed arguments, history filters and runtime enablement. The page explains what history the receiving agent sees and contrasts handoffs with agents-as-tools.

## Key claims

- Handoffs are exposed to the model as tools, e.g. `transfer_to_refund_agent`.
- `handoff()` options: tool name/description overrides, `on_handoff`, `input_type`, `input_filter`, `is_enabled`, `nest_handoff_history`.
- By default the receiving agent sees the full prior conversation; `input_filter` can trim it (e.g. remove tool items).
- Nested handoff history (beta, off by default) collapses earlier turns into a summary block but does not redact sensitive content.
- Handoffs are not supported with server-managed conversations (`conversation_id`, `previous_response_id`).
- Handoff = specialist takes over; `Agent.as_tool()` = specialist runs as a subtask while the caller keeps control.
- `RECOMMENDED_PROMPT_PREFIX` helps the model understand handoffs.

## Feeds

- [OpenAI Agents SDK](../concepts/openai-agents-sdk.md)
