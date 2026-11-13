---
title: "Source: Anthropic Vision Docs"
summary: "Claude API documentation on image input: formats, per-request limits, the 28x28-patch visual-token cost model, resolution tiers and stated limitations."
category: source
lastmod: 2026-11-14
tags: ["models", "multimodal", "anthropic"]
---

- **What:** official API documentation (Vision guide)
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [Vision](https://platform.claude.com/docs/en/build-with-claude/vision)

## Summary

Explains how to send images to Claude (base64, URL, or Files API `file_id`), which formats and sizes are accepted, how image tokens are counted, how oversized images are downscaled, and what the model is not good at. Claude is an image-understanding model only; it does not generate or edit images.

## Key claims

- Formats: JPEG, PNG, GIF, WebP; animated images use only the first frame. Image metadata is not read.
- Limits (as of 2026-11): up to 600 images per API request (100 for models with a 200k context window; 20 per message on claude.ai); max 8000x8000 px; 10 MB per image base64 on the Claude API (5 MB on Bedrock); 128 MB request size on the first-party API.
- Above 20 images in one request, a stricter per-image dimension limit applies (resize to at most 3,000 px per side to be safe). Images inside `tool_result` (for example computer-use screenshots) count toward the threshold.
- Cost model: an image is split into 28x28-pixel patches ("visual tokens"); cost is `ceil(w/28) * ceil(h/28)`.
- Two resolution tiers: high-resolution (Claude 4.7 and later) caps at 2,576 px long edge and 4,784 visual tokens; standard caps at 1,568 px and 1,568 tokens. Larger images are downscaled preserving aspect ratio. Example: 1920x1080 costs ~1,560 tokens on standard tier and ~2,691 on high-res.
- High-res can cost up to about 3x more tokens for the same image; downsample if you don't need fidelity.
- Screenshots returned to computer/browser-use toolsets are rejected (not downscaled) if too large.
- Lossy compression reduces latency but artifacts (especially repeated JPEG passes) hurt text legibility.
- Coordinates are returned in pixels of the image after resizing; localization is approximate.
- Stated limitations: refuses to identify people; errors on low-quality, rotated or tiny (<200 px) images; approximate counting; cannot detect AI-generated images; not designed for diagnostic scans like CT/MRI.

## Feeds

[Multimodal models](../concepts/multimodal-models.md) · [Computer-use agents](../concepts/computer-use-agents.md)
