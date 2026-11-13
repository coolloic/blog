---
title: "Source: OpenAI Deprecations — Fine-tuning Platform Wind-down"
summary: "OpenAI's deprecations page entries setting the timeline for ending self-serve fine-tuning."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** vendor documentation
- **Author:** OpenAI
- **Date:** notices 2026-04-22, 2026-05-07 and 2026-10-14 (read 2026-11-14)
- **Original:** [Deprecations](https://developers.openai.com/api/docs/deprecations)

## Summary

Lists the staged shutdown of OpenAI's self-serve fine-tuning and the retirement of the base models that could still be tuned.

## Key claims

- 2026-05-07: organisations that had never fine-tuned can no longer create jobs.
- 2026-07-02: job creation ends for organisations with no fine-tuned-model inference in the past 60 days.
- 2027-01-06: active existing customers can no longer create new fine-tuning jobs.
- 2027-01-14: gpt-4.1-2025-04-14, gpt-4.1-mini-2025-04-14, gpt-4o-2024-08-06 / 2024-11-20 and gpt-4o-mini-2024-07-18 shut down (notice 2026-10-14); fine-tuned variants follow their base model's schedule.
- 2026-10-23: gpt-4.1-nano-2025-04-14 shut down (notice 2026-04-22), taking its fine-tunes with it.
- Inference on fine-tuned models is disabled only when the base model is deprecated.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md)
