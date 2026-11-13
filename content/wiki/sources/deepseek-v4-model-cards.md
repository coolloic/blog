---
title: "Source: DeepSeek V4 model cards (DeepSeek, Hugging Face)"
summary: "Model cards for DeepSeek-V4-Pro-0813 and DeepSeek-V4.1-Flash-1017: MIT-licensed MoE models with 1M context and built-in speculative decoding."
category: source
lastmod: 2026-11-14
tags: ["models", "deepseek", "open-weight"]
---

- **What:** Hugging Face model cards
- **Publisher:** DeepSeek-AI
- **Date:** 2026-08-13 (V4-Pro-0813) and 2026-10-17 (V4.1-Flash-1017); accessed 2026-11-14
- **Original:** [DeepSeek-V4-Pro-0813](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813)

## Summary

Release notes for DeepSeek's V4 generation. V4-Pro-0813 is the official release superseding the preview, with a DSpark speculative-decoding module; V4.1-Flash-1017 is a minor update that improves benchmarks while shortening outputs. Also covers [V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017).

## Key claims

- Both are MIT-licensed, weights and code.
- Hugging Face metadata reports ~1.65T parameters for V4-Pro-0813 and ~763B for V4.1-Flash-1017 (stored tensors; active counts not stated on the cards).
- No Jinja chat template: prompts are built with a Python `encoding` reference implementation (and a Rust `deepseek-recipe` library for V4.1).
- `reasoning_effort` supports low, high and max on V4-Pro.
- Serving recipes target a single 4xGB300 node with vLLM or SGLang, FP8 KV cache, expert parallelism and DSpark speculative decoding.
- Recommended V4.1-Flash settings: temperature 1.0, top_p 1.0, 1M context, max_tokens of at least 256K.
- The V4.1-Flash technical report is titled around pushing the limits of KV cache compression.
- Vendor-reported benchmarks place V4-Pro near (but mostly below) the leading proprietary models of mid-2026.

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
