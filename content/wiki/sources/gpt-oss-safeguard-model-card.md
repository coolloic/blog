---
title: "Source: gpt-oss-safeguard model card"
summary: "Hugging Face card for OpenAI's open-weight gpt-oss-safeguard 20b/120b reasoning models that classify content against a policy supplied at inference."
category: source
lastmod: 2026-11-14
tags: ["security", "moderation", "openai", "open-weight"]
---

- **What:** model card (openai/gpt-oss-safeguard-20b; 120b sibling)
- **Publisher:** OpenAI
- **Date:** Hugging Face collection updated 2025-10-29; read 2026-11-14
- **Original:** [huggingface.co/openai/gpt-oss-safeguard-20b](https://huggingface.co/openai/gpt-oss-safeguard-20b)

## Summary

gpt-oss-safeguard is a fine-tune of gpt-oss for "bring your own policy" classification: the developer writes a safety policy in natural language, the model reasons about whether content violates it and returns a label with visible reasoning. No retraining is needed to change the policy.

## Key claims

- 20b: 21B parameters, 3.6B active, fits a 16 GB GPU. 120b: 117B parameters, 5.1B active. Apache 2.0.
- Policy is provided at inference; reasoning effort (low, medium, high) trades accuracy for latency.
- Must be used with the harmony response format.
- Intended for LLM input/output filtering, online content labelling and offline trust-and-safety labelling; raw reasoning is for practitioners, not end users.

## Feeds

[Content moderation](../concepts/content-moderation.md)
