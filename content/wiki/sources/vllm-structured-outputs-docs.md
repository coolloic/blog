---
title: "Source: vLLM Structured Outputs Docs"
summary: "vLLM documentation for grammar-constrained generation: the structured_outputs parameters (choice, regex, json, grammar, structural_tag), the xgrammar/guidance backends, and reasoning-parser interaction."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "inference"]
---

- **What:** official documentation page
- **Author/publisher:** vLLM project
- **Date:** living document (latest); read 2026-11-14
- **Original:** [Structured Outputs](https://docs.vllm.ai/en/latest/features/structured_outputs.html)

## Summary

vLLM exposes constrained decoding on its OpenAI-compatible server and offline API. Requests carry a `structured_outputs` object (in `extra_body` online, `StructuredOutputsParams` offline) with exactly one constraint kind. Backends are pluggable and chosen automatically by default.

## Key claims

- Constraint kinds: `choice` (one of a list), `regex`, `json` (schema or Pydantic-derived), `grammar` (EBNF CFG), `structural_tag` (JSON schema applied inside tagged spans of otherwise free text). `response_format` with a JSON schema also works.
- The old top-level `guided_json`, `guided_regex`, `guided_choice`, `guided_grammar`, `guided_whitespace_pattern` fields and `guided_decoding_backend` were removed in v0.12.0.
- Backends: `xgrammar` and `guidance` (llguidance), selected by `auto` per request or forced via `--structured-outputs-config.backend`. Both use Rust-style regex syntax. `lm-format-enforcer` (Python `re` syntax) is deprecated from v0.33.0 and slated for removal in v0.35.0.
- With `--reasoning-parser` (e.g. `deepseek_r1`) the constraint applies to the final content, and reasoning is returned separately; for some models constraint-in-reasoning must be enabled explicitly (`enable_in_reasoning`).
- Grammars that reference boundary tokens like `</think>` must use token-level elements, because a text literal can match the same spelling with different token IDs.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md)
