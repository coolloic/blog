---
title: "Source: Ollama documentation (FAQ, context length, Modelfile, OpenAI compatibility, import)"
summary: "Ollama's official docs on server defaults, VRAM-tiered context length, KV-cache quantization, the Modelfile and its OpenAI-compatible API."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official product documentation (five pages read together)
- **Publisher:** Ollama
- **Date:** accessed 2026-11-14 (living docs; defaults change between releases)
- **Original:** [FAQ](https://docs.ollama.com/faq), [Context length](https://docs.ollama.com/context-length), [Modelfile](https://docs.ollama.com/modelfile), [OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility), [Importing a model](https://docs.ollama.com/import)

## Summary

Ollama is a local model server: it downloads models, keeps them resident in memory for a while, and exposes a native API plus OpenAI-compatible endpoints on localhost. These pages cover its environment-variable configuration, how it picks a default context window, how memory scales with concurrency, how a Modelfile packages a model with parameters and a prompt template, and how to import Safetensors or GGUF weights.

## Key claims

- Binds to 127.0.0.1:11434 by default; `OLLAMA_HOST` changes the bind address.
- Default context length is tiered by VRAM: 4k under 24 GiB, 32k for 24-48 GiB, 256k at 48 GiB or more. The docs recommend at least 64k tokens for agents, web search and coding tools. Set it with `OLLAMA_CONTEXT_LENGTH` or the per-request `num_ctx` option. (The FAQ page still mentions a flat 4096 default and the Modelfile page lists `num_ctx` as 2048, so the docs disagree among themselves.)
- `OLLAMA_NUM_PARALLEL` (default 1) sets the number of requests one model serves at once. `OLLAMA_MAX_LOADED_MODELS` defaults to 3 per GPU, or 3 on CPU. `OLLAMA_MAX_QUEUE` defaults to 512, and a full queue returns HTTP 503.
- Memory needed grows with parallel requests multiplied by context length. For example, 4 parallel slots at 2K context allocate the equivalent of 8K.
- Models stay loaded for 5 minutes by default. `OLLAMA_KEEP_ALIVE` or the per-request `keep_alive` changes this: `0` unloads immediately and a negative value keeps the model loaded indefinitely.
- Flash attention turns on automatically where supported. `OLLAMA_KV_CACHE_TYPE` accepts f16 (the default), q8_0 (about half the memory, very small quality loss) or q4_0 (about a quarter of the memory, with more noticeable loss at long contexts). The setting needs flash attention and applies to every model.
- In `ollama ps`, the PROCESSOR column shows how a model is split between CPU and GPU (for example, 48%/52% CPU/GPU). The docs advise against offloading to the CPU when you want speed.
- Modelfile instructions: FROM (an existing model, a Safetensors directory, or a GGUF path, including split files), PARAMETER, TEMPLATE (Go text/template syntax), SYSTEM, MESSAGE, LICENSE, REQUIRES and CAPABILITY. Listed defaults are temperature 0.8, top_k 40, top_p 0.9, min_p 0.0, and repeat_penalty 1.0 (off).
- The OpenAI-compatible API covers `/v1/chat/completions` (streaming, JSON mode, tools, vision with base64 images only), `/v1/completions`, `/v1/embeddings`, `/v1/models` and a stateless `/v1/responses`. Logprobs, `tool_choice`, `logit_bias` and `n` are not supported. The OpenAI API has no context-size field, so you set context through a Modelfile.
- Importing GGUF does not quantize it. You quantize beforehand, for example with llama.cpp's `llama-quantize`. `ollama push` publishes a model to ollama.com under your username.

## Feeds

[Local LLMs](../concepts/local-llms.md)
