---
title: "Source: Gemini Image Understanding Docs"
summary: "Google Gemini API documentation on image input: inline vs Files API, 258-token tiles, media_resolution, normalized bounding boxes and segmentation."
category: source
lastmod: 2026-11-14
tags: ["models", "multimodal", "google"]
---

- **What:** official API documentation (Image understanding)
- **Author/publisher:** Google
- **Date:** living document; read 2026-11-14
- **Original:** [Image understanding](https://aistudio.google.com/docs/image-understanding)

## Summary

Covers how to pass images to Gemini, how they are tokenized, and Gemini's native object detection and segmentation outputs.

## Key claims

- Inline base64 requests are capped at 20 MB total (prompt + bytes); use the Files API for larger or reused images. Up to 3,600 images per request.
- Formats: PNG, JPEG, WEBP, HEIC, HEIF.
- Tokens: an image with both sides at most 384 px costs 258 tokens; larger images are tiled into 768x768 tiles at 258 tokens each.
- `media_resolution` (introduced with Gemini 3) caps tokens per image or video frame: higher means better detail, more tokens and latency.
- Object detection returns `box_2d` as `[ymin, xmin, ymax, xmax]` normalized to 0-1000; you rescale to original pixels.
- Segmentation (from Gemini 2.5) returns box, label and a mask per object.
- Best practices: correct rotation, unblurred images, and with a single image put the text prompt before it in the input.

## Feeds

[Multimodal models](../concepts/multimodal-models.md)
