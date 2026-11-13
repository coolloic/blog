---
title: "Source: OpenAI Structured Outputs Guide"
summary: "OpenAI API guide on Structured Outputs vs JSON mode: strict json_schema, supported schema subset, numeric limits, refusals and truncation."
category: source
lastmod: 2026-11-14
tags: ["models", "structured-outputs", "openai"]
---

- **What:** official API documentation page
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

## Summary

Structured Outputs constrains completed, non-refusal output to a supplied JSON Schema, via `text.format: {type: "json_schema", strict: true, schema}` in the Responses API (`response_format` in Chat Completions) or via strict function tools. JSON mode (`json_object`) only guarantees syntactically valid JSON. The guide documents the schema subset, size limits and the cases the app must still handle.

## Key claims

- Supported types: string, number, boolean, integer, object, array, enum, anyOf. Supported keywords include string `pattern`/`format`, numeric `minimum`/`maximum`/`multipleOf`, array `minItems`/`maxItems`. Unsupported: `allOf`, `not`, `if/then/else`, dependent schemas. Fine-tuned models additionally do not support string length/pattern/format, numeric bounds, `patternProperties` or array length keywords.
- Root must be an object (not `anyOf`); every field must be `required` (optional = union with `null`); `additionalProperties: false` everywhere; keys come out in schema order.
- Recursion supported through `$ref: "#"` or self-referencing `$defs`.
- Limits: 5,000 object properties, 10 nesting levels, 120,000 characters of names/enum/const values, 1,000 enum values total.
- First request with a new schema has extra latency (schema processing), later ones do not.
- Refusals arrive as a `refusal` content part; truncated output shows `status: "incomplete"` with `max_output_tokens`.
- JSON mode requires the word "JSON" in the context (API error otherwise); without an instruction the model may emit whitespace until the token limit. JSON mode is not schema-guaranteed.
- Without guidance for unfit input, the model may hallucinate values to fill the schema.
- Use function calling to connect tools; use `text.format` to structure the reply to the user.

## Feeds

[Structured outputs](../concepts/structured-outputs.md)
