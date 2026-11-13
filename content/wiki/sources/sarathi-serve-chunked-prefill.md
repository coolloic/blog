---
title: "Source: Sarathi-Serve: Taming Throughput-Latency Tradeoff in LLM Inference"
summary: "OSDI 2024 paper introducing chunked prefills and stall-free scheduling."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (OSDI 2024), arXiv:2403.02310
- **Author:** Amey Agrawal, Nitin Kedia, Ashish Panwar, Jayashree Mohan, Nipun Kwatra, Bhargav S. Gulavani, Alexey Tumanov, Ramachandran Ramjee (Microsoft Research India, Georgia Tech)
- **Date:** 2024-03-04
- **Original:** [Sarathi-Serve: Taming Throughput-Latency Tradeoff in LLM Inference](https://arxiv.org/abs/2403.02310)

## Summary

Long prefills inserted into a running batch stall every ongoing decode, causing latency spikes. Sarathi-Serve splits prefills into similar-sized chunks and fills each iteration's token budget with decodes first and prefill chunks after, so batches stay uniform and decodes never stall.

## Key claims

- Chunked prefills split a prompt's prefill across several iterations.
- Stall-free scheduling admits new requests without pausing ongoing decodes.
- Uniform batches reduce pipeline bubbles under pipeline parallelism.
- Versus vLLM under tail-latency SLOs: 2.6x capacity (Mistral-7B, 1 A100), up to 3.7x (Yi-34B, 2 A100), up to 5.6x (Falcon-180B with PP).

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md)
