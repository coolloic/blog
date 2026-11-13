---
title: "Source: XGrammar"
summary: "Dong et al. (2024, MLSys '25): a grammar engine that makes CFG-constrained decoding near-zero overhead by prechecking context-independent tokens."
category: source
lastmod: 2026-11-14
tags: ["models", "structured-outputs", "papers"]
---

- **What:** research paper (arXiv:2411.15100, MLSys 2025)
- **Author/publisher:** Yixin Dong, Charlie F. Ruan, Yaxing Cai, Ruihang Lai, Ziyi Xu, Yilong Zhao, Tianqi Chen
- **Date:** November 2024 (v3 May 2025)
- **Original:** [arXiv:2411.15100](https://arxiv.org/abs/2411.15100)

## Summary

Context-free grammars (needed for JSON's nesting) are expensive to check against every vocabulary token at every step because the parser carries stack state. XGrammar splits the vocabulary into context-independent tokens, whose validity can be precomputed per grammar position, and context-dependent tokens, which are checked at runtime with a persistent stack. It overlaps grammar work with GPU execution inside the serving engine.

## Key claims

- Token partitioning moves most validity checks to preprocessing.
- Grammar transformations shrink the set of tokens that must be checked at runtime.
- A persistent stack speeds up the remaining runtime checks.
- Reported up to 100× speedup over prior solutions and near-zero end-to-end overhead in LLM serving.

## Feeds

[Structured outputs](../concepts/structured-outputs.md)
