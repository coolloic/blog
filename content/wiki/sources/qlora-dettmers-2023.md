---
title: "Source: QLoRA: Efficient Finetuning of Quantized LLMs"
summary: "The 2023 paper that backpropagates through a frozen 4-bit base model into LoRA adapters."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** research paper (arXiv:2305.14314, NeurIPS 2023)
- **Author:** Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer (University of Washington)
- **Date:** 2023-05-23
- **Original:** [arXiv:2305.14314](https://arxiv.org/abs/2305.14314)

## Summary

Combines a 4-bit quantized, frozen base model with LoRA adapters trained in higher precision, cutting memory enough to fine-tune a 65B model on one 48 GB GPU while claiming parity with 16-bit fine-tuning. Introduces three memory techniques and the Guanaco model family.

## Key claims

- NF4 (4-bit NormalFloat) is a data type designed for normally distributed weights.
- Double quantization quantizes the quantization constants to save more memory.
- Paged optimizers absorb memory spikes.
- Guanaco reached 99.3% of ChatGPT on the Vicuna benchmark after 24 hours on one GPU.
- Over 1,000 models were trained; a small, high-quality dataset gave state-of-the-art results, so data quality beat size.

## Feeds

[PEFT and LoRA](../concepts/peft-and-lora.md) · [Fine-tuning](../concepts/fine-tuning.md)
