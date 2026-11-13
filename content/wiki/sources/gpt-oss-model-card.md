---
title: "Source: gpt-oss-120b model card (OpenAI, Hugging Face)"
summary: "Model card for OpenAI's Apache 2.0 open-weight reasoning models gpt-oss-120b and gpt-oss-20b."
category: source
lastmod: 2026-11-14
tags: ["models", "openai", "open-weight"]
---

- **What:** Hugging Face model card
- **Publisher:** OpenAI
- **Date:** repository created 2025-08-04; accessed 2026-11-14
- **Original:** [gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b)

## Summary

Two MoE reasoning models designed to fit on one 80GB GPU (120b) or 16GB of memory (20b).

## Key claims

- gpt-oss-120b: 117B parameters, 5.1B active; gpt-oss-20b: 21B parameters, 3.6B active.
- Apache 2.0 licence.
- MoE weights post-trained in MXFP4, so 120b runs on a single H100/MI300X.
- Must be used with OpenAI's harmony response format; outputs are wrong otherwise.
- Configurable reasoning effort (low/medium/high) and full chain-of-thought access (not meant for end users).
- Native function calling, browsing, Python execution and structured outputs.

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
