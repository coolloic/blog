---
title: "Source: Hugging Face PEFT docs: overview and Quicktour"
summary: "PEFT library overview and quicktour: LoraConfig, get_peft_model, 0.04% trainable params on Llama-3.2-1B, ~6 MB adapters, AutoPeftModel loading and multiple adapters."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** library documentation (PEFT v0.21.0 docs)
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [PEFT](https://huggingface.co/docs/peft/index), [Quicktour](https://huggingface.co/docs/peft/quicktour)

## Summary

PEFT is Hugging Face's library of parameter-efficient fine-tuning methods. It wraps a base model so that only small added parameters are trained, saved and shared. It integrates with Transformers, Diffusers and Accelerate.

## Key claims

- A config such as `LoraConfig(target_modules=..., r, lora_alpha, lora_dropout, task_type)` passed to `get_peft_model` replaces the matching layers in place with adapter layers. `target_modules` matches module-name suffixes, or a regex.
- On Llama-3.2-1B, LoRA with r=8 on `q_proj` trains 524,288 of 1.24B parameters (0.04%).
- `save_pretrained` and `push_to_hub` store only the adapter, `adapter_config.json` plus `adapter_model.safetensors`. An OPT-350m adapter is about 6 MB against about 700 MB of base weights.
- `AutoPeftModelForCausalLM.from_pretrained` or `PeftModel.from_pretrained(base, adapter)` loads the base model plus the adapter.
- Several named adapters can sit on one base model, switched with `add_adapter` and `set_adapter`.
- The v0.21.0 quicktour links to the Transformers v5.17.0 `Trainer` docs, which shows stable v5 releases had long superseded the December 2025 release candidate by late 2026.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)
