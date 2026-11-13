---
title: "Source: The Curious Case of Neural Text Degeneration (Holtzman et al., 2020)"
summary: "Introduces nucleus (top-p) sampling and shows that likelihood-maximising decoding produces bland, repetitive text."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 1904.09751, ICLR 2020)
- **Author:** Ari Holtzman, Jan Buys, Li Du, Maxwell Forbes, Yejin Choi
- **Date:** 2019-04-22 (v1); revised 2020-02-14 (v2)
- **Original:** [arXiv:1904.09751](https://arxiv.org/abs/1904.09751)

## Summary

Studies why decoding a strong language model by maximising likelihood (greedy or beam search) yields degenerate text, and proposes sampling only from the smallest set of tokens whose cumulative probability exceeds p, a set whose size adapts to the shape of the distribution.

## Key claims

- Maximisation-based decoding yields bland and strangely repetitive text even from good models.
- Human text has different distributional properties from machine text; humans do not always pick the most likely word.
- Decoding strategy alone can change quality dramatically for the same model.
- Nucleus sampling truncates the unreliable low-probability tail with a dynamic cut-off, preserving diversity without hurting fluency or coherence.

## Feeds

[Sampling parameters](../concepts/sampling-parameters.md)
