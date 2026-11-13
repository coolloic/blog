---
title: "Source: RULER: What's the Real Context Size of Your Long-Context Language Models? (NVIDIA)"
summary: "NVIDIA benchmark extending needle-in-a-haystack with multi-needle, multi-hop and aggregation tasks; about half of 32K+ models fail at 32K."
category: source
lastmod: 2026-11-14
tags: ["models", "long-context", "benchmarks"]
---

- **What:** benchmark paper (arXiv:2404.06654), COLM 2024
- **Authors:** Cheng-Ping Hsieh, Simeng Sun, Samuel Kriman, Shantanu Acharya, Dima Rekesh, Fei Jia, Yang Zhang, Boris Ginsburg (NVIDIA)
- **Date:** 9 April 2024 (v3 6 August 2024)
- **Original:** [arxiv.org/abs/2404.06654](https://arxiv.org/abs/2404.06654) · code on [GitHub](https://github.com/NVIDIA/RULER)

## Summary

RULER is a synthetic, configurable long-context benchmark (13 tasks) that goes beyond vanilla NIAH: multiple needles and needle types, multi-hop variable tracing, aggregation (e.g. common-word extraction) and QA with distractors. It separates a model's *claimed* context length from its *effective* length, the longest input at which it still meets a quality bar.

## Key claims

- 17 long-context models evaluated, all claiming 32K or more.
- Almost all score near perfect on vanilla NIAH, yet show large drops as length and task complexity grow.
- Only about half keep satisfactory performance at 32K.
- Yi-34B, advertised at 200K, shows large headroom for improvement as length increases.

## Feeds

[Long-context degradation](../concepts/long-context-degradation.md)
