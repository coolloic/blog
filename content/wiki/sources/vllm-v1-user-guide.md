---
title: "Source: vLLM docs: V1 User Guide"
summary: "Official guide to the vLLM V1 engine's goals, removed V0 features and behavior differences."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: V1 User Guide](https://docs.vllm.ai/en/latest/usage/v1_guide/)

## Summary

States V1's goals (hackable code, near-zero CPU overhead, optimizations on by default) and lists what changed for users relative to V0: features dropped, different logprob semantics, and per-model-family support status.

## Key claims

- V1 keeps V0's models, kernels and utilities but re-architects scheduler, KV cache manager, worker, sampler and API server; V0 is fully deprecated.
- Removed: `best_of`, per-request logits processors (replaced by global ones set at startup), GPU-to-CPU KV swapping for preemption, request-level structured-output backend choice.
- Logprobs default to raw model output, before temperature or penalties; `--logprobs-mode` selects raw or processed logprobs/logits.
- Requests asking for prompt logprobs bypass the prefix cache and recompute the full prefill.
- Chunked prefill is on by default where possible; CUDA graph capture uses more memory than in V0; FCFS and priority scheduling via `--scheduling-policy`.
- Hardware: NVIDIA, AMD, Intel GPU, TPU and CPU functional; other accelerators through plugins (e.g. vllm-ascend, vllm-gaudi).
- Mamba and hybrid models work but without prefix caching; most encoder-decoder models go through plugins (Whisper is native); pooling models fully supported.

## Feeds

[vLLM](../concepts/vllm.md)
