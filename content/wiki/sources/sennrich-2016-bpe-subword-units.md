---
title: "Source: Neural Machine Translation of Rare Words with Subword Units (Sennrich et al., 2016)"
summary: "The paper that brought byte pair encoding to neural NLP as a way to handle open vocabularies with subword units."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** research paper (arXiv 1508.07909, ACL 2016)
- **Author:** Rico Sennrich, Barry Haddow, Alexandra Birch (University of Edinburgh)
- **Date:** 2015-08-31 (v1); revised 2016-06-10 (v5)
- **Original:** [arXiv:1508.07909](https://arxiv.org/abs/1508.07909)

## Summary

Neural translation models use a fixed vocabulary, yet real text keeps producing unseen words. The paper adapts byte pair encoding, originally a compression algorithm, to learn a vocabulary of subword units by repeatedly merging the most frequent adjacent symbol pair. Rare words are then represented as sequences of known subwords instead of an unknown-word token.

## Key claims

- Translation is an open-vocabulary problem; fixed word vocabularies cannot cover it.
- Encoding rare and unknown words as subword sequences lets the model handle them without a back-off dictionary.
- BPE, a compression technique, is adapted to learn the subword vocabulary.
- Subword models beat a back-off dictionary baseline by 1.1 BLEU (En-De) and 1.3 BLEU (En-Ru) on WMT 15.

## Feeds

[Tokenization](../concepts/tokenization.md)
