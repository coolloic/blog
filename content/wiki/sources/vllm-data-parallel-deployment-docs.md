---
title: "Source: vLLM docs: Data Parallel Deployment"
summary: "Official guide to vLLM data parallelism: per-rank engine cores, MoE step synchronization, and internal, hybrid or external load balancing."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest, read 2026-11-14)
- **Author:** vLLM project
- **Date:** 2026-11-14 (accessed)
- **Original:** [vLLM docs: Data Parallel Deployment](https://docs.vllm.ai/en/latest/serving/data_parallel_deployment.html)

## Summary

Explains how `--data-parallel-size` replicates the model as separate engine-core processes behind one API, why MoE ranks must stay in lockstep, and three load-balancing modes.

## Key claims

- Each DP rank is its own engine-core process (with one worker per TP rank), connected to the front end over ZMQ; DP x TP GPUs total.
- For MoE, attention can be DP while experts use EP or TP; expert layers sync every step, so idle ranks run dummy passes, coordinated by a DP Coordinator process.
- Internal load balancing uses each engine's running and waiting queues and is not yet KV-cache aware; `--data-parallel-hybrid-lb` puts an API server per node behind an external balancer; external mode exposes each rank on its own port.
- Each DP rank has its own KV cache, so request routing determines prefix-cache hits.
- `--api-server-count` scales API server processes when the front end becomes the bottleneck.
- `--max-num-seqs` is per rank, while queue caps are server-wide.

## Feeds

[vLLM](../concepts/vllm.md)
