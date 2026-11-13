---
title: "Source: Kimi K3.1 Pro model card (Moonshot AI, Hugging Face)"
summary: "Model card and licence for Kimi K3.1 Pro: a 2.8T/104B-active multimodal MoE with 1M context and a revenue-gated licence."
category: source
lastmod: 2026-11-14
tags: ["models", "kimi", "open-weight"]
---

- **What:** Hugging Face model card and licence
- **Publisher:** Moonshot AI
- **Date:** 2026-11-02 (repository creation); accessed 2026-11-14
- **Original:** [Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)

## Summary

The newest large open-weight release at the time of writing, post-trained from Kimi K3 with large-scale RL across many domains.

## Key claims

- 2.8T total / 104B activated parameters, 896 experts with 16 selected plus 2 shared, 93 layers.
- Hybrid attention: 69 KDA (linear) layers and 24 gated DSA (sparse) layers; 1,048,576-token context.
- Natively multimodal (MoonViT-V2 vision encoder); quantisation-aware trained to MXFP4 weights with MXFP8 activations.
- Licence is MIT-like with conditions: MaaS businesses above $20M revenue over 12 months need a separate agreement; products above 100M MAU or $20M monthly revenue must display "Kimi K3.1-Pro"; internal use (not exposing the software, outputs or capabilities to third parties) is exempt from both.
- MaaS means giving third parties inference or fine-tuning access with meaningful control over inputs, parameters or training data; mere relaying of requests to models hosted by others is excluded.

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
