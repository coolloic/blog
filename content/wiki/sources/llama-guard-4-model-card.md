---
title: "Source: Llama Guard 4 model card"
summary: "Hugging Face model card for Meta's 12B multimodal Llama Guard 4 safety classifier: MLCommons S1-S14 categories, output format and measured recall/FPR."
category: source
lastmod: 2026-11-14
tags: ["security", "moderation", "meta", "models"]
---

- **What:** model card (meta-llama/Llama-Guard-4-12B)
- **Publisher:** Meta
- **Date:** released with the Llama 4 family, April 2025 (card cites the Llama 4 licence effective 2025-04-05); read 2026-11-14
- **Original:** [huggingface.co/meta-llama/Llama-Guard-4-12B](https://huggingface.co/meta-llama/Llama-Guard-4-12B)

## Summary

Llama Guard 4 is a 12B dense model pruned from Llama 4 Scout, used to classify both user prompts and model responses, with text and images (several images per prompt). It answers with `safe`, or `unsafe` followed by the violated category codes.

## Key claims

- Hazard taxonomy (MLCommons-based): S1 violent crimes, S2 non-violent crimes, S3 sex-related crimes, S4 child sexual exploitation, S5 defamation, S6 specialized advice, S7 privacy, S8 intellectual property, S9 indiscriminate weapons, S10 hate, S11 suicide and self-harm, S12 sexual content, S13 elections, S14 code interpreter abuse (text only).
- Supports multiple images per prompt, unlike Llama Guard 3 11B Vision; trained mostly on 2 to 5 images.
- Response classification on Meta's internal English set: recall 69%, false positive rate 11%, F1 61% (+8 F1 over Llama Guard 3). Multilingual: recall 43%, FPR 3%, F1 51%. Single image F1 38%, multi-image F1 52%.
- Limitations: S5, S8, S13 need current factual knowledge; behaviour beyond about three images is less tested; as an LLM it can itself be attacked by prompt injection (the card points to Prompt Guard 2 for that).

## Feeds

[Content moderation](../concepts/content-moderation.md) · [Guardrail tooling](../concepts/guardrail-tooling.md)
