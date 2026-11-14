---
title: "Source: vLLM docs: Parallelism and Scaling"
summary: "Official guide to choosing tensor and pipeline parallel sizes and running vLLM across nodes."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Parallelism and Scaling](https://docs.vllm.ai/en/latest/serving/parallelism_scaling.html)

## Summary

A decision recipe for distributing one model: single GPU if it fits, TP inside a node, TP x PP across nodes, plus the executor backends and network checks for multi-node runs.

## Key claims

- TP splits each layer (Megatron-LM style); PP splits by layers and tolerates uneven splits.
- Recipe: one GPU if the model fits; TP = GPUs in the node for one node; TP = GPUs per node and PP = number of nodes across nodes (e.g. 2 x 8 GPUs gives TP 8, PP 2).
- On GPUs without NVLink (L40S cited) PP can beat TP.
- `--distributed-executor-backend` is `mp` (default single-node) or `ray` (default multi-node); multiprocessing also supports multi-node via `--nnodes`, `--node-rank`, `--master-addr`, `--headless`.
- Fast inter-node TP needs InfiniBand/GPUDirect RDMA; verify with `NCCL_DEBUG=TRACE` (look for `NET/IB/GDRDMA`, not `NET/Socket`).
- Inter-node traffic is unencrypted: bind `VLLM_HOST_IP` to a private network.
- Check the logged KV cache size and maximum concurrency after startup to confirm capacity.

## Feeds

[vLLM](../concepts/vllm.md)
