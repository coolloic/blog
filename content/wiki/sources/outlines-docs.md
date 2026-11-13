---
title: "Source: Outlines Documentation and README"
summary: "dottxt-ai/outlines v1 docs: one call (model(prompt, output_type)) for Literal, regex, CFG and Pydantic outputs; logits-processor masking for local models, schema pass-through for API models; outlines_core, llguidance and xgrammar backends."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "open-source"]
---

- **What:** official docs (home page, Architecture guide) and GitHub README; latest PyPI release `outlines` 1.3.3 (2026-08-06), `outlines-core` 0.2.14
- **Author/publisher:** .txt (dottxt), maintainers of Outlines; Apache-2.0
- **Date:** living documents; read 2026-11-14
- **Original:** [Docs](https://dottxt-ai.github.io/outlines/latest/), [Architecture](https://dottxt-ai.github.io/outlines/latest/guide/architecture/), [README](https://github.com/dottxt-ai/outlines)

## Summary

Outlines makes structure a property of generation rather than something fixed afterwards. You wrap a model (`outlines.from_transformers(model, tokenizer)`, `outlines.from_openai(client, "model")`, llama.cpp, MLX, vLLM, SGLang, Ollama, Gemini, Anthropic and others) and call it with a prompt and an output type. The output is a string that matches the type; Pydantic users then call `Model.model_validate_json` on it.

## Key claims

- Output types: Python basic types, `Literal[...]` multiple choice, JSON Schema / Pydantic models, regex, and context-free grammars.
- Two model kinds. **Steerable** (Transformers, llama.cpp, MLX-LM): Outlines builds a logits processor that sets invalid tokens to −inf each step. **Black-box** (OpenAI, Anthropic, Gemini, Mistral, vLLM, vLLM offline, SGLang, TGI, Ollama, Dottxt): Outlines converts the output type to the provider's `response_format` and the provider enforces it.
- A `Generator` factory picks `SteerableGenerator` or (Async)`BlackBoxGenerator`; steerable generators cache the logits processor and reset its state per call.
- Type system: Python types become `Term`s; CFG and JSON Schema terms go straight to the backend, everything else is converted to a regex.
- Backends (steerable only): `outlines_core` (Rust FSM, default for regex and JSON Schema), `llguidance` (the only one supporting CFG), `xgrammar`; an explicit `backend=` argument overrides the default.

## Feeds

[Instructor and Outlines](../concepts/instructor-and-outlines.md) · [Constrained decoding](../concepts/constrained-decoding.md)
