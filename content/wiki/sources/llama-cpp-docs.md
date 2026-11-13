---
title: "Source: llama.cpp README, llama-server and llama-quantize docs"
summary: "ggml-org's docs for llama.cpp: backends, 1.5-8 bit quantization, hybrid CPU+GPU offload, llama-server flags/endpoints, and GGUF conversion and quantization."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** project README and tool READMEs on GitHub (master branch)
- **Publisher:** ggml-org (llama.cpp project, started by Georgi Gerganov)
- **Date:** accessed 2026-11-14
- **Original:** [llama.cpp README](https://github.com/ggml-org/llama.cpp), [llama-server README](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md), [llama-quantize README](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md)

## Summary

llama.cpp is a C/C++ inference engine with no dependencies, built on the ggml tensor library. It runs GGUF models on CPUs and on many kinds of GPU. `llama-server` wraps it in an HTTP server that offers OpenAI-compatible and native endpoints, parallel slots and constrained decoding. `convert_hf_to_gguf.py` and `llama-quantize` turn Hugging Face checkpoints into quantized GGUF files.

## Key claims

- Backends: Metal (Apple silicon is a first-class target), CUDA, HIP, Vulkan, SYCL, OpenCL, WebGPU, and CPU SIMD paths (AVX/AVX2/AVX512/AMX, ARM NEON, RISC-V vector).
- Integer quantization from 1.5 to 8 bits. Hybrid CPU+GPU inference can partly accelerate a model that is larger than VRAM.
- `-hf <repo>` downloads a GGUF straight from the Hugging Face Hub.
- llama-server flags: `-c` sets the total context (0 means take it from the model). `-np` sets parallel slots (auto by default), and with auto slots a unified KV buffer is shared across sequences. `-ngl` sets the number of layers kept in VRAM (auto by default). `-fa` controls flash attention (auto). `--cache-type-k/-v` sets the KV cache dtype (f16 by default). Continuous batching and prompt caching are on by default. The Jinja chat-template engine is on by default.
- Constrained decoding uses GBNF grammars or a JSON schema (`--grammar`, `--json-schema`, or per-request `json_schema`). Speculative decoding uses a draft model (`-md`). Multimodal models load an `--mmproj` projector file.
- Endpoints: `/v1/chat/completions`, `/v1/embeddings`, `/completion`, `/rerank`, `/tokenize`, `/apply-template`, `/infill`, `/slots`, `/health`, and Prometheus `/metrics` (opt-in through `--metrics`). The server can expose tools from MCP servers over the stdio transport only.
- Loading memory-maps the model by default. `mlock` can force it to stay in RAM.
- The default bind is 127.0.0.1. The auto-generated flag table lists default port 9931, while the Docker examples pass `--port 8080` explicitly.
- Quantization pipeline: run `convert_hf_to_gguf.py` (output BF16 or F16), then `llama-quantize` to a type such as Q4_K_M, optionally guided by an importance matrix (`--imatrix`). Requantizing an already-quantized file can severely reduce quality. Multimodal projectors should stay at bf16 or q8_0.
- Llama-3.1-8B benchmark table: F16 is 16.0 bpw and 14.96 GiB at 29 tok/s generation. Q8_0 is 8.5 bpw, 7.95 GiB, 51 tok/s. Q4_K_M is 4.89 bpw, 4.58 GiB, 72 tok/s. Prompt processing speed barely changes across types.
- Q4_K_M sizes: Llama 3.1 8B shrinks from 32.1 GB to 4.9 GB, 70B from 280.9 GB to 43.1 GB, and 405B from 1,625 GB to 249 GB.

## Feeds

[Local LLMs](../concepts/local-llms.md)
