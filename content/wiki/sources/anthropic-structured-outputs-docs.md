---
title: "Source: Anthropic Structured Outputs Docs"
summary: "Claude API documentation on JSON outputs and strict tool use via grammar-constrained decoding: schema subset, complexity limits, failure modes."
category: source
lastmod: 2026-11-14
tags: ["models", "structured-outputs", "anthropic"]
---

- **What:** official API documentation page
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14 (stable; beta header `structured-outputs-2025-11-13` now only for the deprecated parameter)
- **Original:** [Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)

## Summary

Two features share one grammar pipeline: JSON outputs (`output_config.format` with `type: "json_schema"`) constrain the final answer, and strict tool use (`strict: true` on a tool) constrains tool inputs. The schema is compiled into a grammar that constrains decoding, so outputs are valid against the schema except in documented edge cases. The page lists supported JSON Schema features, SDK schema transformation, complexity limits, caching of compiled grammars, failure modes and incompatibilities.

## Key claims

- Supported: basic types, `enum` (scalars), `const`, `anyOf`, `allOf` (not with `$ref`), internal `$ref`/`$defs`, `required`, a list of string `format`s, simple regex `pattern`. `additionalProperties` must be `false`.
- Unsupported (400 error): recursive schemas, numeric bounds, string length bounds, array constraints beyond `minItems` 0/1, external `$ref`, regex backreferences/lookaround.
- SDK helpers strip unsupported constraints, move them into descriptions, and validate the response client-side against the original schema.
- Compiled grammars are cached 24 h from last use; the first request with a new schema pays compilation latency. Changing `output_config.format` invalidates the prompt cache.
- Limits per request: 20 strict tools, 24 optional parameters total, 16 union-typed parameters total; plus internal grammar-size limits ("Schema is too complex") and a 180 s compilation timeout. Each optional parameter roughly doubles part of the grammar state space.
- Property order follows the schema, but required properties are emitted before optional ones.
- Failure modes: `stop_reason: "refusal"` (output may not match schema), `max_tokens` truncation (incomplete JSON), and enum/const values that differ only in capitalisation.
- Incompatible with citations and assistant prefill. The grammar applies only to the direct output, not thinking or tool results.
- ZDR: prompts not stored, but the schema is cached up to 24 h, so no PHI in schemas.

## Feeds

[Structured outputs](../concepts/structured-outputs.md) · [Function calling](../concepts/function-calling.md)
