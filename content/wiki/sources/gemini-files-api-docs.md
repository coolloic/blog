---
title: "Source: Files API (Gemini API docs)"
summary: "Google's Gemini Files API: 2 GB files, 20 GB per project, 48-hour retention, free, used when requests exceed 100 MB."
category: source
lastmod: 2026-11-14
tags: ["platforms", "google"]
---

- **What:** official API documentation page
- **Publisher:** Google (Gemini API / AI Studio)
- **Date:** living document; read 2026-11-14
- **Original:** [Files API](https://aistudio.google.com/docs/files)

## Summary

Temporary storage for media and documents that are too large to inline in a request.

## Key claims

- Up to 2 GB per file and 20 GB per project.
- Files are deleted automatically after 48 hours (or manually earlier); uploaded files cannot be downloaded, model-generated files can.
- Use it when the whole request (files, prompt, system instructions) exceeds 100 MB; PDFs have a 50 MB limit.
- Covers audio, images, video and PDF documents.
- Free in all regions where the Gemini API is available.

## Feeds

[Gemini API](../concepts/gemini-api.md)
