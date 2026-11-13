---
title: "Source: IBM Granite-Docling Announcement"
summary: "IBM's September 2025 release of Granite-Docling-258M, a small Apache-2.0 vision-language model that converts document pages to DocTags in one pass, succeeding SmolDocling."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "multimodal", "ocr"]
---

- **What:** vendor announcement / engineering blog
- **Author/publisher:** IBM
- **Date:** 2025-09-24
- **Original:** [Granite-Docling: end-to-end document conversion](https://www.ibm.com/new/announcements/granite-docling-end-to-end-document-conversion)

## Summary

IBM released Granite-Docling-258M, a compact vision-language model that reads a page image and emits the whole page's structure and content in a single pass. It replaces SmolDocling's language backbone and vision encoder and fixes its stability problems. IBM frames it as a component of the Docling library rather than a replacement: it can stand in for several single-purpose models inside a Docling pipeline.

## Key claims

- 258M parameters; Granite 3-based language backbone (replacing SmolLM-2) and SigLIP2 vision encoder (replacing SigLIP).
- Output is **DocTags**, IBM's markup that encodes element type, location on the page and relationships, separating structure from content; it uses fewer tokens and is less ambiguous than HTML or Markdown, and converts to Markdown, JSON or HTML.
- Fixes SmolDocling instability such as looping on repeated tokens, via dataset filtering and cleaning.
- Experimental multilingual support (Arabic, Chinese, Japanese).
- Apache 2.0 license, published on Hugging Face.
- Recommended usage is inside the Docling framework.

## Feeds

[Document processing](../concepts/document-processing.md)
