---
title: "Source: OpenAI Model Optimization Guide"
summary: "OpenAI's guide to fine-tuning methods on its platform, now carrying a wind-down notice."
category: source
lastmod: 2026-11-14
tags: ["training"]
---

- **What:** vendor documentation
- **Author:** OpenAI
- **Date:** read 2026-11-14 (wind-down notice dated 2026-05)
- **Original:** [Model optimization](https://developers.openai.com/api/docs/guides/model-optimization)

## Summary

Describes an eval-driven loop (write evals, prompt, fine-tune if needed, evaluate, iterate) and the fine-tuning methods offered: supervised, vision and DPO. As of 2026 the page states the self-serve fine-tuning platform is winding down.

## Key claims

- Methods: SFT and DPO on gpt-4.1 / 4.1-mini / 4.1-nano (2025-04-14 snapshots); vision SFT on gpt-4o-2024-08-06. Data is uploaded as JSONL. Reinforcement fine-tuning is not listed. (The deprecations page shows gpt-4.1-nano shut down on 2026-10-23, though the guide still lists it.)
- Fine-tuning lets you use more examples than fit in a prompt, shorten prompts (lower cost and latency), and get a smaller task-specific model.
- Start with prompt engineering; write evals first to set a baseline.
- The fine-tuning platform is no longer open to new users; fine-tuned models stay available until their base model is deprecated.

## Feeds

[Fine-tuning](../concepts/fine-tuning.md)
