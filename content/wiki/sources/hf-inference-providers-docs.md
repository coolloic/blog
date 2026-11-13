---
title: "Source: Hugging Face Inference Providers docs"
summary: "Hugging Face's serverless router to partner inference providers behind one token and an OpenAI-compatible endpoint, with :fastest/:cheapest/:preferred routing."
category: source
lastmod: 2026-11-14
tags: ["inference"]
---

- **What:** official product documentation
- **Publisher:** Hugging Face
- **Date:** accessed 2026-11-14
- **Original:** [Inference Providers](https://huggingface.co/docs/inference-providers/index)

## Summary

Inference Providers is a serverless proxy that sends requests for Hub models to partner inference companies. You use one Hugging Face token and one bill, with no markup on provider rates.

## Key claims

- Partners as of 2026-11 include Baseten, Cerebras, Cohere, DeepInfra, Fal AI, Featherless, Fireworks, Groq, HF Inference, Novita, Nscale, OVHcloud, Public AI, Replicate, Scaleway, Together, WaveSpeedAI and Z.ai. Supported tasks vary by partner.
- `https://router.huggingface.co/v1` is an OpenAI-compatible chat-completions endpoint and handles chat only. The `InferenceClient` SDKs (Python and JS) cover the other tasks.
- Routing policy is set with a suffix on the model ID: `:fastest` (the default, highest tokens/s), `:cheapest` (lowest price per output token), `:preferred` (your ordered list), or an explicit provider name such as `:groq`.
- With automatic selection, requests fail over to another provider when the primary one is flagged unavailable.
- Billing is pay-as-you-go with no markup, and PRO and Team/Enterprise accounts get monthly credits. Calls require a fine-grained token with the Inference Providers permission.

## Feeds

[Hugging Face ecosystem](../concepts/hugging-face-ecosystem.md)
