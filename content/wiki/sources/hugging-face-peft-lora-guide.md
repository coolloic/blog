---
title: "Source: Hugging Face PEFT — LoRA Developer Guide"
summary: "The PEFT library's guide to LoraConfig options, LoRA variants and adapter merging."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** library documentation
- **Author:** Hugging Face
- **Date:** read 2026-11-14
- **Original:** [PEFT LoRA guide](https://huggingface.co/docs/peft/developer_guides/lora)

## Summary

Documents how to configure LoRA in PEFT: which modules to target, initialisation schemes, the DoRA and rsLoRA variants, quantized-base training, and managing or merging multiple adapters.

## Key claims

- Default targets are attention query/value; `target_modules="all-linear"` targets every linear layer, as QLoRA does.
- Init options: default (A Kaiming-uniform, B zero), gaussian, PiSSA (principal singular vectors), OLoRA, LoftQ (for quantized bases), EVA (data-driven SVD with adaptive rank).
- DoRA splits the update into magnitude and direction; helps at low rank but adds overhead unless merged.
- rsLoRA scales by α/√r instead of α/r, stabilising higher ranks.
- merge_and_unload() folds adapters into the base; load_adapter/set_adapter switch adapters; add_weighted_adapter combines them (linear, svd, cat, TIES, DARE).
- modules_to_save trains extra modules (e.g. a classifier head) in full.

## Feeds

[PEFT and LoRA](../concepts/peft-and-lora.md)
