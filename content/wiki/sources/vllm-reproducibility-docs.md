---
title: "Source: vLLM docs: Reproducibility"
summary: "vLLM's statement of what it does and does not guarantee about reproducible outputs: default seed 0, offline multiprocessing switch, batch invariance for online serving."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official documentation (latest)
- **Author:** vLLM project
- **Date:** accessed 2026-11-14
- **Original:** [vLLM docs: Reproducibility](https://docs.vllm.ai/en/latest/usage/reproducibility/)

## Summary

A short page stating that vLLM trades reproducibility for performance by default, and listing the switches that restore it.

## Key claims

- vLLM does not guarantee reproducible results by default.
- Offline: set `VLLM_ENABLE_V1_MULTIPROCESSING=0` to make scheduling deterministic, or enable batch invariance so outputs ignore scheduling.
- Online serving: only batch invariance is available.
- In the V1 engine the seed defaults to 0 and cannot be unset, so runs match even at temperature > 0; workers need consistent random state for features such as speculative decoding.
- Reproducibility holds only on the same hardware and the same vLLM version.

## Feeds

[LLM non-determinism](../concepts/llm-non-determinism.md)
