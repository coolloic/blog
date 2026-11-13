---
title: "Source: LLGuidance: Making Structured Outputs Go Brrr"
summary: "Moskal, Nori, Cooper and Huynh (Microsoft, June 2025): how llguidance computes token masks in ~50 µs without precomputation, and the hidden costs of precomputing engines."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "engineering-blog"]
---

- **What:** engineering blog post
- **Author/publisher:** Michał Moskal, Harsha Nori, Hudson Cooper, Loc Huynh (Microsoft / guidance-ai)
- **Date:** 2025-06-11
- **Original:** [LLGuidance: Making Structured Outputs Go Brrr](https://guidance-ai.github.io/llguidance/llg-go-brrr)

## Summary

Explains why on-the-fly mask computation can beat precomputation. A regex lexer handles almost every token check, so the expensive Earley parser runs rarely; a byte-level token trie lets one rejected byte prune a whole subtree of tokens; and a "slicer" skips trie traversal for vocabulary slices the lexer allows wholesale. The post argues that precomputing engines trade startup time, memory and unpredictable worst-case masks for fast average masks.

## Key claims

- The Earley parser is consulted for only about 0.1–1% of token checks; the lexer handles the rest.
- Trie scan costs about 13 CPU cycles per node in the Rust implementation (measured on an AMD EPYC 7V13).
- Startup is about 1000× slower in other libraries.
- On MaskBench, average mask time is about 50 µs and average startup about 2 ms; other libraries are 10–1000× slower on average, partly due to hard outliers.
- Mask budget target is 0.1–10 ms per step depending on batch size, cores and model speed.
- Mask profile: ~45% of masks allow 0–2% of tokens (avg 28 µs); ~54% are dense and sliced (avg 61 µs); ~1.1% allow 2–85% (avg 576 µs); ~0.5% are dense and unsliced (avg ~1.6 ms).
- Outlines precomputes masks for all automaton states (startup and memory cost, limits constraint complexity); XGrammar precomputes some masks, which can take seconds to minutes, and masks outside its fast path can take tens to hundreds of ms.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md)
