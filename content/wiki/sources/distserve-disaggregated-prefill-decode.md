---
title: "Source: DistServe: Disaggregating Prefill and Decoding for Goodput-optimized LLM Serving"
summary: "OSDI 2024 paper arguing for running prefill and decode on separate GPUs, optimizing goodput under TTFT/TPOT SLOs."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** paper (OSDI 2024), arXiv:2401.09670
- **Author:** Yinmin Zhong, Shengyu Liu, Junda Chen, Jianbo Hu, Yibo Zhu, Xuanzhe Liu, Xin Jin, Hao Zhang (Peking University, UCSD, StepFun)
- **Date:** 2024-01-18
- **Original:** [DistServe: Disaggregating Prefill and Decoding for Goodput-optimized LLM Serving](https://arxiv.org/abs/2401.09670)

## Summary

Colocating prefill and decode on the same GPUs makes them interfere and couples their parallelism choices. DistServe puts each phase on its own GPU pool, picks parallelism per phase for the application's TTFT and TPOT targets, and places phases with cluster bandwidth in mind to move the KV cache cheaply.

## Key claims

- TTFT measures prefill latency; TPOT measures time between output tokens during decode.
- Colocated systems suffer strong prefill-decode interference and must overprovision or favor one metric.
- Goodput = maximum request rate per GPU that meets both TTFT and TPOT constraints.
- Reported 7.4x more requests served or 12.6x tighter SLO than state-of-the-art systems, with over 90% of requests meeting latency targets.

## Feeds

[LLM inference serving](../concepts/llm-inference-serving.md)
