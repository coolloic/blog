---
title: "Source: vLLM Expert Parallel Deployment docs"
summary: "vLLM's guide to serving MoE models with expert parallelism: EP sizing, DP attention, all-to-all backends, the EPLB load balancer and disaggregated prefill/decode."
category: source
lastmod: 2026-11-14
tags: ["models", "moe", "inference", "vllm"]
---

- **What:** official documentation
- **Publisher:** vLLM project
- **Date:** accessed 2026-11-14 (latest docs)
- **Original:** [Expert Parallel Deployment](https://docs.vllm.ai/en/latest/serving/expert_parallel_deployment.html)

## Summary

How to run large MoEs (DeepSeek, Qwen, Kimi style) in vLLM with experts sharded across GPUs while attention runs data-parallel. Covers flags, communication backends, multi-node launch, and Expert Parallel Load Balancing (EPLB), which replicates hot experts.

## Key claims

- `--enable-expert-parallel` turns EP on; EP size = TP x DP. Without it, MoE layers are tensor-parallel across TP x DP.
- Expert layers shard across all EP ranks; attention is replicated across DP ranks when TP = 1, or tensor-sharded within each DP group when TP > 1. Example: `--tensor-parallel-size 1 --data-parallel-size 8 --enable-expert-parallel`.
- `--all2all-backend`: `allgather_reducescatter` (default), `deepep_high_throughput` (multi-node prefill), `deepep_low_latency` (multi-node decode, CUDA graphs), FlashInfer NVLink variants for multi-node NVLink, `mori` for AMD ROCm.
- EPLB: `--enable-eplb` with `--eplb-config` keys `window_size` (default 1000 steps), `step_interval` (default 3000), `num_redundant_experts` (default 0); redundant experts cost extra GPU memory.
- Disaggregated serving pairs a DeepEP high-throughput prefill instance with a low-latency decode instance, moving KV cache with the NIXL connector.
- `--enable-dbo` overlaps all-to-all communication with compute.

## Feeds

[Mixture of experts](../concepts/mixture-of-experts.md)
