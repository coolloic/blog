---
title: "Source: Gemini API Structured Outputs Docs"
summary: "Google Gemini API documentation on JSON Schema structured outputs: schema compiled to a state machine, unenforced keywords and complexity limits."
category: source
lastmod: 2026-11-14
tags: ["models", "structured-outputs", "google"]
---

- **What:** official API documentation page
- **Author/publisher:** Google
- **Date:** living document; read 2026-11-14
- **Original:** [Structured outputs](https://aistudio.google.com/docs/structured-output)

## Summary

Gemini constrains responses to a JSON Schema supplied as `response_json_schema` (generateContent) with `response_mime_type: application/json`, or via the Interactions API's `response_format` object (`mime_type: application/json` plus `schema`); SDKs accept Pydantic and Zod. The API compiles the schema into a state machine for constrained decoding and rejects schemas that exceed state, branching or depth limits.

## Key claims

- Use cases: data extraction, structured classification, generating structured inputs for agentic workflows.
- Structured output formats the final answer; function calling is for taking actions mid-conversation.
- `minLength`, `maxLength`, `minProperties`, `maxProperties`, `uniqueItems`, `contains` are silently stripped (not enforced); `minItems`/`maxItems` are enforced.
- Over-complex schemas get `400 INVALID_ARGUMENT`; fix by moving rules into descriptions, flattening nesting, bounding recursion, and reducing `enum`/`anyOf` branching.
- Output is syntactically valid but values must still be validated in the application.
- Streamed structured output arrives as valid partial JSON strings that concatenate to the full object.
- Gemini 2.0 needed an explicit `propertyOrdering` list.

## Feeds

[Structured outputs](../concepts/structured-outputs.md)
