---
title: "Source: OpenAI Model Spec (2026-10-29)"
summary: "OpenAI's specification of intended model behaviour, including the chain of command that ranks platform, developer, user and untrusted content."
category: source
lastmod: 2026-11-14
tags: ["prompting", "openai", "system-prompts"]
---

- **What:** behaviour specification for OpenAI models (versioned document)
- **Publisher:** OpenAI
- **Date:** version dated 2026-10-29 (as of 2026-11-14 the page says a newer version is available and keeps this one for historical reference)
- **Original:** [OpenAI Model Spec, 2026-10-29](https://model-spec.openai.com/2026-10-29.html)

## Summary

The Model Spec defines how OpenAI models should weigh instructions from different sources. Its "chain of command" assigns authority levels to parts of the spec and to message types, then gives a procedure for resolving conflicts. It is the clearest public statement of why system/developer prompts outrank user turns and why retrieved content should not be obeyed.

## Key claims

- Authority levels, highest first: root (spec only), system (OpenAI system messages and spec "system" sections), developer, user, guideline (soft defaults). Assistant and tool messages, quoted text and multimodal data have no authority by default.
- OpenAI "system" messages are platform-level and may be invisible to developers; API customers write "developer" messages, which outrank user messages.
- Conflict resolution: discard instructions that conflict with higher levels, are superseded by later same-level instructions, or run against the source's likely intent; among the rest, higher authority and recency win.
- Lower-level content cannot reinterpret higher-level rules, however it argues.
- Instructions inside untrusted content are information, not commands, unless a higher-level instruction delegates authority (e.g. a user pointing at a README).
- Developers are encouraged to wrap untrusted data in JSON, XML or YAML to reduce injection risk.

## Feeds

[System prompts](../concepts/system-prompts.md) · [Prompt engineering](../concepts/prompt-engineering.md)
