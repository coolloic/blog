---
title: "Source: Tokenization counts: the impact of tokenization on arithmetic in frontier LLMs"
summary: "Paper showing GPT-3.5/GPT-4 arithmetic depends on whether digits are chunked left-to-right or right-to-left."
category: source
lastmod: 2026-11-14
tags: ["models", "tokenization"]
---

- **What:** research paper (arXiv:2402.14903)
- **Authors:** Aaditya K. Singh, DJ Strouse
- **Date:** 22 February 2024
- **Original:** [arxiv.org/abs/2402.14903](https://arxiv.org/abs/2402.14903)

## Summary

GPT-3.5 and GPT-4 tokenizers chunk long numbers into up-to-3-digit tokens from the left. That misaligns token boundaries with place value. Forcing right-to-left chunking at inference time (inserting commas as thousands separators) makes addition substantially more accurate.

## Key claims

- Right-to-left tokenization, enforced with commas, largely improves arithmetic accuracy for GPT-3.5 and GPT-4.
- Errors under left-to-right tokenization are stereotyped, suggesting systematic computation rather than approximation.
- Models can convert between formats, so chain-of-thought-style rewriting recovers some accuracy.
- The gap shrinks with model scale.
- Practitioners should ablate number-tokenization choices when numerical reasoning matters.

## Feeds

[LLM limitations](../concepts/llm-limitations.md)
