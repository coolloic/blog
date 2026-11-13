---
title: "Source: Axolotl Documentation"
summary: "Documentation for Axolotl, a YAML-configured open-source framework for LLM fine-tuning and post-training."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** library documentation
- **Author:** Axolotl AI
- **Date:** read 2026-11-14 (latest update listed 2026-10)
- **Original:** [Axolotl docs](https://docs.axolotl.ai/)

## Summary

Axolotl drives dataset preprocessing, training, evaluation, quantization and inference from a single YAML file, aimed at reproducible multi-GPU runs.

## Key claims

- Methods: full fine-tuning, LoRA, QLoRA, QAT, preference tuning (DPO, IPO, KTO, ORPO), RL (GRPO) and reward modelling.
- Distributed: FSDP2, DeepSpeed, multi-node via Torchrun and Ray, context and expert parallelism.
- Performance: multipacking (sample packing), Flash Attention, Liger kernels.
- Supports many Hub model families (Llama, Mistral, Qwen, Gemma, GPT-OSS, Phi and others); multimodal in beta.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md) · [PEFT and LoRA](../concepts/peft-and-lora.md)
