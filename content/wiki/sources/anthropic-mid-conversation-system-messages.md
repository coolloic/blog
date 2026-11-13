---
title: "Source: Mid-conversation system messages (Anthropic)"
summary: "Claude API feature for appending role: system messages mid-conversation, with precedence, cache and placement rules."
category: source
lastmod: 2026-11-14
tags: ["prompting", "anthropic", "system-prompts"]
---

- **What:** official API documentation page
- **Publisher:** Anthropic, Claude Platform docs
- **Date:** accessed 2026-11-14
- **Original:** [Mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages)

## Summary

Explains how to change system-level instructions (and, in beta, the available tools) partway through a conversation by appending a `role: "system"` message to `messages`, instead of editing the top-level `system` field. The motivation is the prompt cache: the cache hashes `tools`, then `system`, then `messages` in order, so editing `system` invalidates everything after it, while appending keeps the prefix byte-identical.

## Key claims

- A mid-conversation system message applies from its position onward; later system messages override earlier ones and override the top-level `system` field for subsequent turns.
- System messages carry operator-level priority; `user` messages are treated as end-user input. Use `system` for constraints that must hold even if the user asks otherwise.
- Placement rules: must follow a `user` turn (or an assistant turn ending in a server tool result), must end the array or precede an `assistant` turn, and cannot sit between `tool_use` and `tool_result` (400 error).
- Supported (as of 2026-11) on Claude Fable/Mythos 5.x, Opus 5.5, Opus 5, Opus 4.8, Sonnet 5.5, Haiku 5.5, not on Sonnet 5; on the Claude API, Bedrock InvokeModel, Claude Platform on AWS, Google Cloud and Microsoft Foundry.
- Betas: mid-conversation tool changes (`tool_addition` / `tool_removal` blocks), turn-scoped messages (`clear_at: "next_user_message"`), per-message `effort`.
- Sonnet 5.5 and Haiku 5.5 are trained to resist injection via tool results and may ignore a system message placed directly after a tool result.
- Guidance: top-level `system` for whole-conversation instructions; mid-conversation system messages for later-relevant, frequently changing, or mode-switch instructions; plain user messages for end-user input.

## Feeds

[System prompts](../concepts/system-prompts.md) · [Prompt engineering](../concepts/prompt-engineering.md)
