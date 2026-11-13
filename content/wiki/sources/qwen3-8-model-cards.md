---
title: "Source: Qwen3.8 model cards (Qwen, Hugging Face)"
summary: "Model cards for Qwen3.8-27B (dense, Apache 2.0) and Qwen3.8-2.4T-A95B (MoE, custom Qwen3.8-Max licence)."
category: source
lastmod: 2026-11-14
tags: ["models", "qwen", "open-weight"]
---

- **What:** Hugging Face model cards and licence
- **Publisher:** Qwen (Alibaba)
- **Date:** 2026-08-05 (27B) and 2026-08-08 (2.4T-A95B) repository creation; accessed 2026-11-14
- **Original:** [Qwen3.8-2.4T-A95B](https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B)

## Summary

Introduces the Qwen3.8 open generation: a compact 27B dense vision-language model and a 2.4T-parameter MoE that brings a Max-class model to open release. Both use a hybrid layout of linear-attention (Gated DeltaNet) and gated full-attention layers. Also covers [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B).

## Key claims

- Qwen3.8-27B: 27B dense, 64 layers in a 3:1 Gated DeltaNet to gated-attention pattern, native image/video input, 262,144-token native context extensible to ~1M, Apache 2.0.
- Qwen3.8-2.4T-A95B: 2.4T total / 95B active parameters, 512 experts with 10 routed + 1 shared active, 92 layers, text-only, thinking cannot be disabled.
- The 2.4T-A95B card lists multi-token prediction (MTP) training; its benchmark table reports the hosted Qwen3.8-Max, which adds vision input, non-thinking mode, 1M default context and built-in tools, and trails proprietary models (Fable 5, Opus 4.8, GPT 5.6 Sol) on some rows such as SWE-bench Pro and HLE.
- Thinking is controlled by `enable_thinking`, `reasoning_effort` and `preserve_thinking` (retain reasoning from earlier turns, on by default).
- Recommended sampling differs between thinking (temperature 1.0, top_p 0.95) and non-thinking (temperature 0.7, top_p 0.8, presence_penalty 1.5) modes.
- The 2.4T licence is permissive but adds conditions: products above 100M MAU or $20M monthly revenue must display the model name, and Model-as-a-Service or AI Work Assistant (independent coding or office-productivity product) businesses above $50M revenue in any 12 months need a separate licence (internal use exempt from this clause). MaaS excludes the mere relaying of requests to models hosted by third parties.
- Benchmarks are vendor-reported and mostly run in the Claude Code harness.

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
