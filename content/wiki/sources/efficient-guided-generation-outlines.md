---
title: "Source: Efficient Guided Generation for Large Language Models"
summary: "Willard and Louf (2023): constrained decoding by indexing the vocabulary against a finite-state machine compiled from a regex or grammar; basis of Outlines."
category: source
lastmod: 2026-11-14
tags: ["models", "structured-outputs", "papers"]
---

- **What:** research paper (arXiv:2307.09702)
- **Author/publisher:** Brandon T. Willard, Rémi Louf
- **Date:** July 2023 (v4 Aug 2023)
- **Original:** [arXiv:2307.09702](https://arxiv.org/abs/2307.09702)

## Summary

Frames text generation as transitions of a finite-state machine. A regular expression (or a context-free grammar) is compiled to an automaton, and an index maps each automaton state to the vocabulary tokens that are valid from it. At each decoding step, invalid tokens are masked out of the logits, so the output is guaranteed to match the pattern.

## Key claims

- Precomputing a state → allowed-token index makes guided generation cheap at runtime.
- The approach is model-agnostic and supports regex and CFG constraints.
- The authors report little overhead and large speedups over prior guided-generation approaches.
- Implemented in the open-source Outlines library.

## Feeds

[Structured outputs](../concepts/structured-outputs.md)
