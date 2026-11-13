---
title: "Source: Gemma 4 model overview and card (Google)"
summary: "Google's Gemma 4 docs and model card: five sizes from on-device to 31B, dense and MoE, up to 256K context, Apache 2.0."
category: source
lastmod: 2026-11-14
tags: ["models", "gemma", "open-weight"]
---

- **What:** official documentation page plus Hugging Face model card
- **Publisher:** Google DeepMind
- **Date:** model repositories from 2026-03; QAT checkpoints 2026-06; accessed 2026-11-14
- **Original:** [Gemma 4 overview](https://ai.google.dev/gemma/docs/core)

## Summary

Describes Gemma 4, Google's open-weight family, with sizes for phones (E2B, E4B), a 12B unified encoder-free model, a 31B dense model and a 26B A4B MoE. The [31B model card](https://huggingface.co/google/gemma-4-31B-it) gives architecture details.

## Key claims

- Sizes: E2B and E4B (effective params, using Per-Layer Embeddings), 12B, 26B A4B MoE (25.2B total, 3.8B active), 31B dense.
- 26B A4B ([model card](https://ai.google.dev/gemma/docs/core/model_card_4)): 30 layers, 128 experts with 8 active plus 1 shared, 256K context; "runs almost as fast as a 4B-parameter model".
- Context: 128K for the small models, 256K for the medium ones.
- All accept text and images; audio is native on E2B, E4B and 12B.
- Hybrid attention interleaves local sliding-window and global layers (last layer always global).
- Configurable thinking, built-in function calling, system prompts, multi-token prediction and speculative-decoding drafters.
- The Hugging Face card states Apache 2.0, with a Gemma 4 licence link; the docs page describes open weights permitting responsible commercial use.
- Memory guide: 31B needs ~70GB at BF16, ~35GB at 8-bit, ~17.5GB at 4-bit; QAT checkpoints ship as GGUF and w4a16 for vLLM/SGLang.

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
