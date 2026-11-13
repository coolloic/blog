---
title: "Source: Voyage AI text embeddings documentation"
summary: "Voyage AI's reference for the voyage-4 embedding family: context length, Matryoshka dimensions, quantized output types, input_type prompts and batch limits."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "embeddings"]
---

- **What:** API documentation
- **Author:** Voyage AI (part of MongoDB)
- **Date:** page last updated 10 August 2026 (read 2026-11-14)
- **Original:** [docs.voyageai.com/docs/embeddings](https://docs.voyageai.com/docs/embeddings)

## Summary

Voyage's current lineup is the 4 series (announced 15 January 2026): `voyage-4-large`, `voyage-4`, `voyage-4-lite`, plus `voyage-code-4` and domain models for finance and law. The 4-series models produce mutually compatible embeddings, and `voyage-4-nano` is open-weight. The API exposes both Matryoshka dimension choice and quantized output types, so storage size can be set per request.

## Key claims

- Context length 32,000 tokens for most current models; 16,000 for `voyage-law-2`.
- `output_dimension`: 256, 512, 1024 (default) or 2048 for the 4 series and `voyage-code-4`; finance and law models are fixed at 1024.
- The compatibility statement covers `voyage-4-large`, `voyage-4`, `voyage-4-lite` and `voyage-4-nano`; it is not made for `voyage-code-4`.
- `output_dtype`: `float` (default), `int8`, `uint8`, `binary`, `ubinary`; binary types are bit-packed, so the list is 1/8 of the dimension.
- `input_type` = `query` or `document` prepends a retrieval instruction to the text; omitting it skips the prompt, and the resulting embeddings remain compatible.
- Batch: up to 1,000 texts per request, with total-token caps from 120K (large models) to 1M (lite models).
- Older 3-series models remain available; Voyage says the new models are better in every respect.

## Feeds

[Embeddings](../concepts/embeddings.md)
