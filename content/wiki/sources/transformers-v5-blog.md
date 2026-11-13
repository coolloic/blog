---
title: "Source: Transformers v5: Simple model definitions powering the AI ecosystem (Hugging Face blog)"
summary: "Hugging Face's announcement of Transformers v5: PyTorch-only, modular model definitions, unified tokenizers, built-in serving, first-class quantization and interop with vLLM/SGLang/llama.cpp/MLX."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** vendor engineering blog post
- **Publisher:** Hugging Face
- **Date:** 2025-12-01 (v5.0.0rc0); accessed 2026-11-14
- **Original:** [Transformers v5 blog](https://huggingface.co/blog/transformers-v5)

## Summary

The post announces the first major Transformers release in five years. It positions the library as the reference "model definition" layer that training tools, serving engines and local runtimes all consume.

## Key claims

- PyTorch is the only backend; TensorFlow and Flax support is being sunset.
- Model files are modular, and a central `AttentionInterface` dispatches between FlashAttention, FlexAttention and SDPA.
- The `tokenizers` library becomes the single backend, ending the split between "fast" and "slow" tokenizers.
- Inference adds continuous batching, paged attention and `transformers serve`, an OpenAI-compatible server.
- Weight loading was reworked, and quantization is treated as a first-class feature.
- Interop goals: training tools (Unsloth, Axolotl, LlamaFactory), engines (vLLM, SGLang) and local runtimes (llama.cpp, MLX, ExecuTorch). The library can load GGUF files.
- Growth from v4 to v5: daily pip installs rose from about 20k to over 3M, supported architectures from 40 to over 400, and compatible Hub checkpoints from about 1k to over 750k.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)
