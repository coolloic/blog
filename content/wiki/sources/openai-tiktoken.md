---
title: "Source: tiktoken (OpenAI)"
summary: "OpenAI's open-source byte-level BPE tokenizer library and the encodings (cl100k_base, o200k_base) used by its models."
category: source
lastmod: 2026-11-14
tags: ["models"]
---

- **What:** open-source library (GitHub README)
- **Author:** OpenAI
- **Date:** accessed 2026-11-14
- **Original:** [openai/tiktoken on GitHub](https://github.com/openai/tiktoken)

## Summary

tiktoken is the fast BPE tokenizer for OpenAI models. The README shows how to load an encoding by name or look up the one a model uses, and explains why BPE suits language models.

## Key claims

- Encodings include o200k_base (used by GPT-4o-era models) and cl100k_base; encoding_for_model() maps a model name to its encoding.
- BPE is reversible and lossless, works on arbitrary text, and compresses text to about 4 bytes per token on average.
- BPE lets the model see common subwords (for example "ing") repeatedly.
- Token count is the length of the list returned by encode().
- Claimed 3-6x faster than a comparable open-source tokenizer on a 1 GB benchmark.

## Feeds

[Tokenization](../concepts/tokenization.md)
