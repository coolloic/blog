---
title: "Source: Performant local mixture-of-experts CPU inference with GPU acceleration in llama.cpp"
summary: "Community guide on Hugging Face to hybrid CPU+GPU MoE inference in llama.cpp: keep attention and shared experts on GPU, routed experts in system RAM."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "local", "inference"]
---

- **What:** community blog post on Hugging Face
- **Authors:** Doctor-Shotgun and Geechan
- **Date:** 2026-01-30
- **Original:** [llama.cpp MoE offload guide](https://huggingface.co/blog/Doctor-Shotgun/llamacpp-moe-offload-guide)

## Summary

Explains why MoE models are unusually friendly to consumer hardware: the parts every token uses (attention, dense layers, shared experts) are small and belong on the GPU, while the routed experts are most of the bytes but are touched sparsely and can live in CPU RAM. Walks through the llama.cpp flags and the prefill/decode trade-offs.

## Key claims

- `-ngl 999` puts all layers on GPU; `-ot "exps=CPU"` or `--cpu-moe` then moves routed experts to CPU; `--n-cpu-moe N` keeps experts of N layers on CPU (counted from the last layer).
- `-ot` accepts regexes to pin layer ranges to specific GPUs while experts stay on CPU.
- Always-used weights (attention, dense layers, shared experts) belong on the fastest hardware because every generated token uses them. (The guide does not quantify decode as CPU-memory-bandwidth bound.)
- For prefill, llama.cpp copies CPU-held weights to the GPU once a batch exceeds a threshold (default 32 tokens), so PCIe bandwidth matters (the guide estimates ~10 s to copy ~300 GB over PCIe 4.0 x16); larger `-b`/`-ub` (defaults 2048/512) help prefill but consume VRAM.
- NUMA settings matter on multi-socket servers; results are hardware dependent.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
