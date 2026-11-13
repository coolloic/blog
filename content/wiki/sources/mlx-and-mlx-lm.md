---
title: "Source: MLX and mlx-lm READMEs (Apple ml-explore)"
summary: "Apple's array framework for Apple silicon (unified memory, lazy evaluation) and its LLM package mlx-lm for generation, quantized conversion, LoRA and serving."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** project READMEs on GitHub
- **Publisher:** Apple machine learning research (ml-explore)
- **Date:** accessed 2026-11-14
- **Original:** [MLX](https://github.com/ml-explore/mlx), [mlx-lm](https://github.com/ml-explore/mlx-lm)

## Summary

MLX is a NumPy-like array framework built for Apple silicon. Arrays live in unified memory that the CPU and GPU share, computation is lazy, and graphs are dynamic. mlx-lm builds on it to load Hub models, quantize them, generate text, fine-tune with LoRA and serve them.

## Key claims

- Arrays live in shared (unified) memory, so operations run on the CPU or GPU without copying data.
- Arrays are materialized only when needed (lazy evaluation). Graphs are built dynamically, so a change of shape does not trigger a slow recompile.
- Composable function transforms: automatic differentiation, vectorization and graph optimization.
- Has Python, C++, C and Swift APIs. A CUDA backend is available on Linux (`mlx[cuda]`).
- mlx-lm commands: `mlx_lm.generate`, `mlx_lm.chat`, `mlx_lm.convert` (with `-q` to quantize, and `--upload-repo` to push to the Hub), `mlx_lm.server`, `mlx_lm.cache_prompt`, plus LoRA and full fine-tuning, including on quantized models.
- The `mlx-community` Hub organization hosts many pre-converted, quantized models.
- `--max-kv-size` turns on a rotating fixed-size KV cache, which uses less RAM at some cost to quality. `--prefill-step-size` (default 2048) trades peak memory against prefill speed.
- mlx-lm tries to wire model memory, which needs macOS 15 or later. For models that are large relative to RAM, you can raise the GPU wired-memory limit with `sysctl iogpu.wired_limit_mb`.
- Inference and fine-tuning can be distributed across machines with `mx.distributed`.

## Feeds

[Local LLMs](../concepts/local-llms.md)
