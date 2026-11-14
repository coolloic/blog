---
title: "Source: vLLM docs: Online Serving"
summary: "Overview of vLLM's HTTP server: the endpoint families it exposes and their caveats."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Online Serving](https://docs.vllm.ai/en/latest/serving/online_serving/)

## Summary

Index of what `vllm serve <model>` exposes: OpenAI-style routes, plus Cohere-style rerank/embed, an Anthropic Messages route, tokenizer utilities and pooling/scoring endpoints, with notes on chat templates and unsafe dev endpoints.

## Key claims

- OpenAI-style routes: `/v1/completions`, `/v1/chat/completions`, `/v1/responses`, `/v1/embeddings`, `/v1/audio/transcriptions` and `/v1/audio/translations`, `/v1/realtime`.
- Non-OpenAI routes: `/tokenize`, `/detokenize`, `/pooling`, `/score`, `/rerank` (incl. Cohere-compatible `/v2/rerank`), `/classify`, `/v2/embed`, Anthropic-style `/v1/messages`.
- Chat needs a chat template, from the tokenizer config or `--chat-template`; without one, chat requests fail. Content format is auto-detected, overridable with `--chat-template-content-format`.
- Completions ignores `suffix`; Chat ignores `user`; `parallel_tool_calls=true` does not guarantee multiple calls.
- Dev endpoints (`VLLM_SERVER_DEV_MODE=1`) are not for production; runtime LoRA loading is for local development only.

## Feeds

[vLLM](../concepts/vllm.md)
