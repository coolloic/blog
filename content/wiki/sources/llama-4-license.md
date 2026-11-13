---
title: "Source: Llama 4 Community License and model page (Meta)"
summary: "Meta's Llama 4 licence (700M MAU clause, Built with Llama, naming rules) and the Llama 4 Scout/Maverick model page."
category: source
lastmod: 2026-11-14
tags: ["models", "meta", "open-weight", "licensing"]
---

- **What:** licence text (GitHub) and official model page
- **Publisher:** Meta
- **Date:** licence effective 2025-04-05; accessed 2026-11-14
- **Original:** [Llama 4 License](https://github.com/meta-llama/llama-models/blob/main/models/llama4/LICENSE)

## Summary

The custom licence governing Llama 4 weights, plus Meta's [Llama 4 page](https://dev.meta.ai/llama/models/llama-4/) describing Scout and Maverick.

## Key claims

- Licensees whose products had more than 700M monthly active users before the release must request a licence that Meta may refuse.
- Redistribution requires shipping the licence and prominently displaying "Built with Llama".
- Models trained or fine-tuned from Llama materials or outputs and then distributed must have names beginning with "Llama".
- Use must follow the Llama 4 Acceptable Use Policy, incorporated by reference.
- Llama 4 Scout is natively multimodal, supports up to 10M tokens of context and runs on a single H100; Maverick is natively multimodal for image and text.
- Meta's developer page still labels Llama 4 as the latest Llama and lists the newer Muse models separately; the `meta-llama` Hugging Face org's newest model repositories date from April 2025.
- Model IDs encode the MoE shape: Scout 17B active with 16 experts, Maverick 17B active with 128 experts (~400B total per Hugging Face metadata).

## Feeds

[Open-weight models](../concepts/open-weight-models.md)
