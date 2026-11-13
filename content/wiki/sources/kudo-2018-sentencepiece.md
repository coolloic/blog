---
title: "Source: SentencePiece (Kudo & Richardson, 2018)"
summary: "A language-independent tokenizer library that trains BPE or Unigram models directly on raw text, treating whitespace as a symbol."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 1808.06226, EMNLP 2018 demo) and open-source library
- **Author:** Taku Kudo, John Richardson (Google)
- **Date:** 2018-08-19
- **Original:** [arXiv:1808.06226](https://arxiv.org/abs/1808.06226)

## Summary

Earlier subword tools assumed input was already split into words, which fails for languages without spaces and makes detokenisation lossy. SentencePiece trains on raw sentences, so tokenisation and detokenisation are a self-contained, reversible pipeline. It is a library, not a new algorithm: it implements BPE and the Unigram language-model method.

## Key claims

- SentencePiece is a language-independent subword tokenizer and detokenizer.
- It trains subword models directly from raw sentences, with no pre-tokenisation.
- On English-Japanese translation it matches the accuracy of training on pre-tokenised input.
- Open-source C++ and Python implementations are available under Apache 2.

## Feeds

[Tokenization](../concepts/tokenization.md)
