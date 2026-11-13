---
title: "Source: JSONSchemaBench (Generating Structured Outputs from Language Models)"
summary: "Geng et al. (Jan 2025): benchmark of 10K real-world JSON schemas comparing Guidance, Outlines, llama.cpp, XGrammar, OpenAI and Gemini on efficiency, schema coverage and output quality."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "papers", "benchmarks"]
---

- **What:** research paper (arXiv:2501.10868) and benchmark
- **Author/publisher:** Saibo Geng, Hudson Cooper, Michał Moskal, Samuel Jenkins, Julian Berman, Nathan Ranchin, Robert West, Eric Horvitz, Harsha Nori (EPFL, Microsoft and others)
- **Date:** 2025-01-18 (v3 2025-02-27)
- **Original:** [arXiv:2501.10868](https://arxiv.org/abs/2501.10868)

## Summary

The first systematic evaluation of JSON-schema constrained decoding engines. It pairs 10K real-world schemas (GitHub, Kubernetes, Snowflake, Washington Post, JSONSchemaStore, etc.) with the official JSON Schema Test Suite and measures three things: efficiency (compile time, time to first token, time per output token), coverage (which schemas an engine accepts and whether output then complies) and quality (downstream task accuracy). Note that several authors build Guidance/llguidance.

## Key claims

- Compile time (Llama-3.1-8B-Instruct Q8; llama.cpp backend for Guidance, llama.cpp and Outlines, Hugging Face Transformers for XGrammar; median): Guidance ~0 s, llama.cpp ~0.05 s, XGrammar 0.11–0.30 s, Outlines 3.5–8.1 s.
- Time per output token: unconstrained ~15–17 ms; Guidance 6.4–9.5 ms (faster than unconstrained, credited to fast-forwarding forced tokens); llama.cpp 27–30 ms; Outlines 30–47 ms (all on the llama.cpp backend). On the Hugging Face backend XGrammar was ~65–67 ms and Guidance ~37 ms (GlaiveAI median), so cross-backend comparisons are not like-for-like.
- Coverage varies about 2× between best and worst engine. Guidance had the highest empirical coverage on 6 of 8 datasets. On "GitHub Hard", Outlines' empirical coverage was 0.03.
- OpenAI and Gemini have the lowest coverage (they reject many schemas, e.g. OpenAI 0.30 declared on GitHub Easy, Gemini 0.08) but near-perfect compliance on what they accept: a conservative strategy.
- On the JSON Schema Test Suite, XGrammar was under-constrained (accepted invalid output) in 38 of 43 categories; Guidance in 1.
- Quality: constrained decoding did not hurt and slightly improved accuracy on Last Letters, Shuffle Objects and GSM8K (e.g. GSM8K 80.1% unconstrained vs 81.6–83.8% constrained). The authors attribute Guidance's edge to token healing.
- Tokenisation ambiguity and masking-induced distribution shift can in principle push models off-distribution.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md) · [Instructor and Outlines](../concepts/instructor-and-outlines.md)
