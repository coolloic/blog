---
title: "Source: OpenAI Image Generation Guide"
summary: "OpenAI API guide to GPT Image models: Image API vs Responses image_generation tool, edits, masks, markup, sizes, quality, streaming partials, pricing and limitations."
category: source
lastmod: 2026-11-14
tags: ["models", "multimodal", "openai", "image-generation"]
---

- **What:** official API documentation (Image generation guide)
- **Author/publisher:** OpenAI
- **Date:** living document; read 2026-11-14
- **Original:** [Image generation](https://developers.openai.com/api/docs/guides/image-generation)

## Summary

Describes OpenAI's GPT Image family and the two ways to call it: the Image API (Generations and Edits endpoints) and the Responses API's built-in `image_generation` tool, which adds multi-turn editing inside a conversation.

## Key claims

- Models named (as of 2026-11): `gpt-image-2.5-sunburst` (editing precision), `gpt-image-2.5-flare` (fast everyday generation), GPT-Image-2.6 variants, and `gpt-image-2`. Organization verification may be required.
- Responses API: a mainline model is chosen at top level and the image model in the tool; `action` is `auto`, `generate` or `edit`; the mainline model may rewrite the prompt (`revised_prompt`). Multi-turn editing uses `previous_response_id`.
- Edits accept multiple reference images. Masks are prompt-guided, so the model may not follow the mask exactly. "Markup" edits send a transparent annotation layer.
- Sizes: 1024x1024, 1536x1024, 1024x1536 or custom (multiples of 16, aspect 1:3 to 3:1, edge at most 3840 px); above 2560x1440 is experimental.
- `quality`: `low`/`medium`/`high`/`auto` on `gpt-image-2`; GPT-Image-2.6 variants add `xhigh` and `max` and require a total pixel count of 655,360-8,294,400; separate `complexity` setting (`low`/`medium`/`high`).
- Output formats png (default), jpeg, webp, plus svg and animated gif on newer models; transparent background requires png or webp; JPEG is faster than PNG.
- Streaming: `partial_images` 0-3; each partial adds 100 output tokens.
- Pricing is per token, e.g. image output $30 per million tokens for GPT-Image-2.5/2.6; `gpt-image-2` at 1024x1024 is about $0.006 / $0.053 / $0.211 for low / medium / high.
- Complex prompts can take up to 2 minutes.
- Stated limitations: latency, text rendering precision, consistency of recurring characters or brand elements, precise layout placement.
- `moderation` is `auto` (default) or `low`; blocked requests return `moderation_blocked`.

## Feeds

[Multimodal models](../concepts/multimodal-models.md)
