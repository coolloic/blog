---
title: "Source: Guiding LLMs The Right Way (DOMINO)"
summary: "Beurer-Kellner, Fischer and Vechev (ETH Zurich, 2024): naive constrained decoding misaligns subword tokens with grammar boundaries and costs accuracy; DOMINO fixes this with near-zero overhead."
category: source
lastmod: 2026-11-14
tags: ["prompting", "structured-outputs", "papers"]
---

- **What:** research paper (arXiv:2403.06988, ICML 2024)
- **Author/publisher:** Luca Beurer-Kellner, Marc Fischer, Martin Vechev (ETH Zurich / LMQL authors)
- **Date:** 2024-02-07
- **Original:** [arXiv:2403.06988](https://arxiv.org/abs/2403.06988)

## Summary

Identifies token misalignment as a hidden quality cost of constrained decoding: if the constraint is enforced at the character/terminal level without respecting how the model's subword vocabulary would naturally tokenise the text, the model is forced into unnatural token splits and its accuracy drops. DOMINO enforces constraints at the subword level, using precomputation and speculative decoding to stay fast.

## Key claims

- Constrained decoding can both slow generation and reduce task accuracy when the subword vocabulary is not aligned with the constraint.
- DOMINO is "minimally invasive": it does not distort the model's token distribution beyond what the constraint requires.
- Overhead is virtually zero and in some cases DOMINO is nearly 2× faster than unconstrained decoding.

## Feeds

[Constrained decoding](../concepts/constrained-decoding.md)
