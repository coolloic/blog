---
title: "Source: Mistral Large 4 model card (Mistral AI, Hugging Face)"
summary: "Model card for Mistral Large 4: a ~1T-parameter multimodal MoE with ~52B active, 1M context, under a modified-MIT licence restricting MaaS."
category: source
lastmod: 2026-11-14
tags: ["models", "mistral", "open-weight"]
---

- **What:** Hugging Face model card
- **Publisher:** Mistral AI
- **Date:** 2026-09-30 (repository creation); accessed 2026-11-14
- **Original:** [Mistral-Large-4-1T-A52B](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)

## Summary

Mistral's largest model: trained from scratch in its European datacentres, released as open weights with an NVFP4 variant and an embedded speculative-decoding head.

## Key claims

- About 1T total parameters, 49B active per token (52B including embeddings/output), 128 routed experts (4 active) plus 1 shared.
- Natively multimodal, 1M-token context, fluent in 160+ languages including all EU official languages.
- Ships an embedded DSpark draft head (3 dense MLA layers proposing 3-token blocks) and an NVFP4 checkpoint targeting Blackwell GPUs (vLLM, SGLang).
- Licence: Mistral Ecosystem Open-Weight License, a modified MIT allowing commercial use but requiring a separate licence to run a Model-as-a-Service business.
- Also served on the Mistral API as `mistral-large-4`.

## Feeds

[Open-weight models](../concepts/open-weight-models.md) · [Model selection](../concepts/model-selection.md)
