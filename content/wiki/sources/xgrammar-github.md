---
title: "Source: XGrammar (GitHub README and docs)"
summary: "MLC's XGrammar project page: Apache-2.0 structured-generation engine (JSON, regex, EBNF/Lark CFGs, structural tags) that is the default backend in vLLM, SGLang, TensorRT-LLM and MLC-LLM; XGrammar-2 released May 2026."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "open-source"]
---

- **What:** project README plus documentation index (docs version 0.2.9, PyPI release 2026-11-09)
- **Author/publisher:** MLC AI (CMU, Tianqi Chen's group) and contributors
- **Date:** living document; read 2026-11-14
- **Original:** [github.com/mlc-ai/xgrammar](https://github.com/mlc-ai/xgrammar), [docs](https://xgrammar.mlc.ai/docs/latest/)

## Summary

The engineering home of the XGrammar paper. The library compiles JSON schemas, regexes and context-free grammars (EBNF or Lark) into a compiled grammar, then drives a per-request matcher that fills a token bitmask each step. It runs on CPU, NVIDIA, AMD, Apple Silicon and TPU, with Python, C++, JavaScript and Swift bindings.

## Key claims

- Claims "100% structural correctness" and near-zero overhead for JSON generation.
- Default structured-generation backend for most inference engines, including vLLM, SGLang, TensorRT-LLM and MLC-LLM.
- Timeline: v0.1.0 and SGLang/MLC-LLM integration 2024-11; vLLM 2024-12; TensorRT-LLM 2025-01; Modular MAX 2025-02; OpenVINO GenAI 2025-09; XGrammar-2 released 2026-05.
- Core API objects: `TokenizerInfo`, `GrammarCompiler`, `CompiledGrammar`, `GrammarMatcher`, plus bitmask operations; docs cover structural tags for tool calling and reasoning, serialization of compiled grammars, and runtime safeguards.
- Licence Apache-2.0.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md)
