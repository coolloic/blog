---
title: "Source: verl Documentation"
summary: "Docs for verl, the open-source HybridFlow-based RL post-training framework used for large-scale GRPO/DAPO/PPO runs."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** library documentation (Apache 2.0)
- **Author:** verl project (originated at ByteDance; HybridFlow paper arXiv:2409.19256)
- **Date:** read 2026-11-14; newest release blog listed is v0.7
- **Original:** [verl docs](https://verl.readthedocs.io/en/latest/)

## Summary

verl is a production-oriented framework for RL post-training of LLMs. It separates the training engine from the rollout (generation) engine and reshards actor weights between the two phases. It is the framework the DAPO paper built on.

## Key claims

- Algorithms documented include PPO, GRPO, DAPO, SPIN, SPPO, GPG, OPO, DPPO, on-policy distillation and Direct Reward Optimization, plus entropy-mechanism and rollout-correction recipes.
- Training backends: PyTorch FSDP and Megatron-LM, plus Megatron-FSDP, Automodel and TorchTitan.
- Rollout engines: vLLM, SGLang and TensorRT-LLM.
- The 3D-HybridEngine reshards actor weights efficiently between training and generation, with flexible device placement.
- Guides cover very large models (DeepSeek 671B; DAPO on Qwen3-235B) on NVIDIA, AMD ROCm and Ascend hardware.
- Agentic RL: multi-turn rollouts with tool calls, an agent loop, server-based asynchronous rollout and sandbox integration.
- LoRA is supported for RL. Reward functions are user-implemented per dataset, with a "Reward Loop" feature.

## Feeds

[Reinforcement fine-tuning](../concepts/reinforcement-fine-tuning.md)
