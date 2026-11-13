---
title: "Source: OpenAI moderation guide"
summary: "OpenAI's guide to the free omni-moderation endpoint: 13 categories, per-category scores, image support and inline moderation in the Responses API."
category: source
lastmod: 2026-11-14
tags: ["security", "moderation", "openai"]
---

- **What:** API documentation
- **Publisher:** OpenAI
- **Date:** read 2026-11-14 (living doc)
- **Original:** [developers.openai.com/api/docs/guides/moderation](https://developers.openai.com/api/docs/guides/moderation)

## Summary

The moderation endpoint classifies text and images against a fixed harm taxonomy and returns a boolean `flagged`, per-category booleans and per-category scores. It is free. It can be called standalone or attached inline to a Responses API request.

## Key claims

- Model `omni-moderation-latest` takes text and images (images up to 20 MB); it does not classify audio.
- 13 categories: harassment, harassment/threatening, hate, hate/threatening, illicit, illicit/violent, self-harm, self-harm/intent, self-harm/instructions, sexual, sexual/minors, violence, violence/graphic.
- Only self-harm, sexual and violence categories score images; others are text-only and score 0 for image-only input.
- Response fields: `flagged`, `categories`, `category_scores` (0 to 1), `category_applied_input_types`.
- Scores should feed your own policy rather than auto-block; the model is upgraded continuously, so custom thresholds may need recalibration.
- Inline moderation covers tool-call arguments and tool outputs but not tool names, descriptions or schemas; with streaming, results arrive only after the full output; a refusal that discusses harmful content can still be flagged.
- Not designed for CSAM detection.

## Feeds

[Content moderation](../concepts/content-moderation.md) · [Guardrail tooling](../concepts/guardrail-tooling.md)
