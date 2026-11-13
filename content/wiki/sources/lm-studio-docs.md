---
title: "Source: LM Studio documentation (app and developer docs)"
summary: "LM Studio's docs: a desktop app running GGUF via llama.cpp and MLX models on Apple silicon, with OpenAI- and Anthropic-compatible local server, lms CLI, SDKs and JIT loading with TTL."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official product documentation
- **Publisher:** LM Studio (Element Labs)
- **Date:** accessed 2026-11-14
- **Original:** [App docs](https://lmstudio.ai/docs/app), [Developer docs](https://lmstudio.ai/docs/developer), [Idle TTL and auto-evict](https://lmstudio.ai/docs/developer/core/ttl-and-auto-evict), [System requirements](https://lmstudio.ai/docs/app/system-requirements)

## Summary

LM Studio is a desktop GUI for finding, downloading and chatting with local models. It also has a developer surface: a local HTTP server, the `lms` CLI, a headless daemon, and JavaScript and Python SDKs.

## Key claims

- Runs GGUF models with llama.cpp on macOS, Windows and Linux. On Apple silicon it also runs MLX models.
- System requirements: macOS 14.0 or newer on Apple silicon only (Intel Macs unsupported); Windows on x64 (AVX2 required) or ARM (e.g. Snapdragon X Elite); Linux on x64 or ARM64 as an AppImage (Ubuntu 20.04 or newer).
- Works fully offline once the models are downloaded, including chat with attached documents (local RAG).
- The local server (`lms server start`, conventionally on port 1234) exposes OpenAI-compatible endpoints (Chat Completions, Responses, Embeddings, Models, legacy Completions) with streaming, tool use and JSON-schema structured output. It also offers an Anthropic-compatible Messages endpoint and its own REST API.
- SDKs are `lmstudio-js` (`@lmstudio/sdk`) and `lmstudio-python` (`lmstudio`). `llmster` packages the core as a headless daemon for servers and CI.
- Just-in-time loading brings a model into memory on its first request. JIT-loaded models unload after an idle TTL, 60 minutes by default, and a per-request `ttl` field in seconds overrides it. Auto-evict, on by default, keeps only one JIT-loaded model resident at a time.

## Feeds

[Local LLMs](../concepts/local-llms.md)
