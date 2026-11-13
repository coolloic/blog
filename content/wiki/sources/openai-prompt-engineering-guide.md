---
title: "Source: Prompt engineering guide (OpenAI)"
summary: "OpenAI's API guide to prompting: message roles, the instructions parameter, Markdown/XML structure, few-shot, prompts-in-code versioning and snapshot pinning."
category: source
lastmod: 2026-11-14
tags: ["prompting", "openai"]
---

- **What:** official API documentation page
- **Publisher:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering)

## Summary

Covers prompting through the Responses API: the role model (`developer`, `user`, `assistant`), the `instructions` parameter, how to structure a developer message, few-shot examples, context/RAG, caching-friendly ordering, and how to manage prompts in production (in code, pinned to model snapshots, measured with evals). It also contrasts prompting reasoning models with non-reasoning GPT models.

## Key claims

- `developer` messages carry app-developer instructions and outrank `user` messages; the guide likens developer messages to a function definition and user messages to its arguments.
- `instructions` sets high-level behaviour for one request and overrides conflicting `input`; it is not carried forward when chaining with `previous_response_id`.
- Suggested developer-message layout: Identity, Instructions, Examples, Context (context usually last). Markdown headers mark sections; XML tags delimit documents and can carry attributes.
- Few-shot examples should cover a diverse range of inputs and usually live in the developer message.
- Put reused content at the start of the prompt to benefit from prompt caching.
- Keep production prompts in application code (typed builders, code review, tests, feature-flagged rollout). Reusable prompt objects are being deprecated: creation de-emphasised from 2026-06-03, `v1/prompts` shutdown scheduled for 2026-11-30.
- Pin production apps to a dated model snapshot (example given: `gpt-4.1-2025-04-14`) and use evals to detect behaviour changes across prompt or model versions.
- Reasoning models do well with high-level goals; GPT models need explicit, precise steps.

## Feeds

[Prompt engineering](../concepts/prompt-engineering.md) · [System prompts](../concepts/system-prompts.md) · [Few-shot prompting](../concepts/few-shot-prompting.md)
