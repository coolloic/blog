---
title: "Source: llguidance (GitHub README)"
summary: "Microsoft's guidance-ai/llguidance README: a Rust constrained-decoding engine that computes token masks on the fly from a CFG using an Earley parser over a derivative-based regex lexer and a token trie."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "open-source"]
---

- **What:** project README and changelog for the llguidance library (Python package `llguidance`, latest 1.9.1 on PyPI as of 2026-09-30)
- **Author/publisher:** guidance-ai (Microsoft)
- **Date:** living document; read 2026-11-14 (v1.0.0 declared 2025-06-23)
- **Original:** [github.com/guidance-ai/llguidance](https://github.com/guidance-ai/llguidance)

## Summary

llguidance is the low-level engine behind the Guidance library. Given a grammar, a tokenizer and the tokens generated so far, it returns the mask of tokens that can still lead to a valid string. Unlike automaton-precomputing engines, it builds lexer automata lazily and computes each mask at decode time, so there is almost no startup cost. It accepts a large JSON Schema subset, regexes, and Lark-style CFGs that can embed JSON schemas and regexes. MIT licensed.

## Key claims

- Parser: Earley's algorithm on top of a lexer built from derivatives of regular expressions (`derivre`); the mask is computed by walking a prefix tree of all vocabulary tokens.
- Grammars can force "fast-forward" tokens when the continuation is deterministic, which speeds decoding.
- Roughly 50 µs CPU per token for a 128k-token vocabulary with negligible startup. A full mask for a typical JSON schema is about 1.5 ms, but a "slicer" optimisation brings the JSONSchemaBench average under 50 µs; under 1% of masks exceed 1 ms and 0.001% exceed 10 ms (all under 30 ms).
- The authors claim 16 cores with a 10 ms forward pass can mask batches up to 3,200 without slowing the model.
- Their comparison: LM-format-enforcer and llama.cpp grammars are slower; Outlines has heavy startup from precomputed automata; XGrammar precomputation can take seconds to minutes with some slow masks.
- Integrations and dates: llama.cpp (b4613, 2025-02-01, `-DLLAMA_LLGUIDANCE=ON`), SGLang 0.4.4 (`--grammar-backend llguidance`, 2025-02-26), vLLM 0.8.2 (2025-03-25), Chromium (2025-04-11), OpenAI Structured Outputs for JSON Schema (2025-05-20); also mistral.rs and onnxruntime-genai.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md) · [Instructor and Outlines](../concepts/instructor-and-outlines.md)
