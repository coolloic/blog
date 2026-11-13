---
title: "Source: Mem0, the token-efficient memory algorithm (Mem0, 2026)"
summary: "Mem0's April 2026 redesign: single-pass ADD-only extraction, entity linking and fused semantic/keyword/entity retrieval, with vendor-reported LoCoMo 92.5 and LongMemEval 94.4 at about 7k tokens per query."
category: source
lastmod: 2026-11-14
tags: ["agents", "memory", "benchmarks"]
---

- **What:** vendor engineering blog post
- **Publisher:** Mem0
- **Date:** 16 April 2026, updated 28 September 2026
- **Original:** [mem0.ai/blog/mem0-the-token-efficient-memory-algorithm](https://mem0.ai/blog/mem0-the-token-efficient-memory-algorithm)

## Summary

Mem0 replaced the two-pass extract-then-reconcile pipeline from its [2025 paper](chhikara-2025-mem0.md) with a single extraction call that only adds memories. Contradicted facts are kept alongside newer ones instead of being overwritten, and retrieval fuses several signals. All numbers are self-reported.

## Key claims

- Extraction: one LLM call instead of two; the ADD/UPDATE/DELETE reconciliation step is removed because it was slow and could erase useful information. Extraction latency roughly halves.
- Facts stated by the agent (bookings, recommendations) are stored with the same weight as user facts.
- Entity linking: proper nouns, quoted text and compound noun phrases are embedded into a separate lookup layer; memories sharing an entity with the query get a ranking boost.
- Retrieval runs semantic, keyword (with verb normalisation) and entity matching in parallel and fuses them.
- No dedicated temporal module; temporal reasoning relies on keeping history under ADD-only.
- Results, old to new algorithm: LoCoMo 71.4 to 92.5; LongMemEval 67.8 to 94.4; BEAM 64.1 (1M tokens) and 48.6 (10M). About ±1 point judge noise. Average about 6.7k–7.0k retrieved tokens per query versus 25k+ for full context.
- The post concedes LoCoMo and LongMemEval can be inflated by aggressive retrieval, big windows or frontier models, and calls BEAM the most relevant. Answer and judge models are not named.
- Available in Platform and open source, but scores are from the Platform, which has proprietary optimisations; OSS users should expect only directionally similar gains. The eval harness is open-sourced.

## Feeds

[Mem0](../concepts/mem0.md)
