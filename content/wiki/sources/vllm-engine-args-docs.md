---
title: "Source: vLLM docs: Engine Arguments"
summary: "Official reference of vLLM engine/server flags and their defaults."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Engine Arguments](https://docs.vllm.ai/en/latest/configuration/engine_args.html)

## Summary

The full list of flags accepted by `vllm serve` and the `LLM` class, grouped by model, cache, parallel, scheduler, LoRA and compilation configuration.

## Key claims

- `--gpu-memory-utilization`: fraction of GPU memory the instance may use; default 0.92 (1.0 with an extensible KV cache).
- `--max-model-len` defaults from the model config; `--dtype auto` keeps BF16 for BF16 models and uses FP16 for FP16/FP32 ones; `--kv-cache-dtype auto`.
- `--enforce-eager` (default off) disables CUDA graphs and torch.compile.
- `--tensor-parallel-size`, `--pipeline-parallel-size`, `--data-parallel-size` default to 1; `--enable-expert-parallel` (default off) uses EP instead of TP for MoE layers; `--decode-context-parallel-size` and `--prefill-context-parallel-size` shard the KV cache / prefill across ranks.
- `--async-scheduling` overlaps CPU scheduling with GPU work.
- `--cpu-offload-gb` (weights to CPU, default 0) and `--kv-offloading-size` (CPU KV buffer, off by default).
- LoRA: `--enable-lora`, `--max-loras` (default 1 per batch), `--max-lora-rank` (default 16).
- `--seed` default 0; `--trust-remote-code` default off; `--served-model-name` defaults to the model path.

## Feeds

[vLLM](../concepts/vllm.md)
