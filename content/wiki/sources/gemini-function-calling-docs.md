---
title: "Source: Gemini API Function Calling Docs"
summary: "Google Gemini API documentation on function calling: declarations, modes (AUTO/ANY/NONE/VALIDATED), parallel and compositional calls, thought signatures."
category: source
lastmod: 2026-11-14
tags: ["models", "tools", "google"]
---

- **What:** official API documentation (Interactions and generateContent variants)
- **Author/publisher:** Google
- **Date:** living documents; read 2026-11-14
- **Original:** [Function calling with the Gemini API](https://aistudio.google.com/docs/function-calling)

## Summary

Gemini function calling uses function declarations (name, description, JSON-Schema-style parameters). The model returns function-call parts with ids; the client executes them and returns results. The docs cover the calling modes, parallel calling (several independent calls in one turn), compositional calling (chained calls), automatic function calling in the Python SDK, and the requirement to echo "thought signatures" back for thinking models.

## Key claims

- Modes: `AUTO` (default with only function declarations), `ANY` (must call a function; optional `allowed_function_names` restricts the set), `NONE` (no calls), `VALIDATED` (default when combining with built-in tools or structured output; either a call or text, with schema adherence enforced). In the newer Interactions API this is `tool_choice` with `allowed_tools`.
- `VALIDATED` is documented as reducing malformed calls compared with `AUTO`.
- Parallel calls: results may be returned in any order; the API matches them to calls by `id`, so functions can run asynchronously.
- Compositional calling chains dependent calls across turns (e.g. get location, then get weather).
- Thinking models attach a `thought_signature` to function-call parts; it must be sent back in its original part, and parts with signatures must not be merged.

## Feeds

[Function calling](../concepts/function-calling.md)
