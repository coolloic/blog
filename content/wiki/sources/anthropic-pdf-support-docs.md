---
title: "Source: Anthropic PDF Support Docs"
summary: "Claude API documentation on PDF input: each page sent as extracted text plus a page image, page and size limits, token cost per page and best practices."
category: source
lastmod: 2026-11-14
tags: ["models", "multimodal", "anthropic", "documents"]
---

- **What:** official API documentation (PDF support guide)
- **Author/publisher:** Anthropic
- **Date:** living document; read 2026-11-14
- **Original:** [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support)

## Summary

Claude accepts PDFs as `document` content blocks (base64, URL or Files API). Internally each page is converted to an image and its text is extracted, and both are given to the model, so it can reason over charts and layout as well as text. The page covers limits, cost estimation, caching and batching.

## Key claims

- Limits (as of 2026-11): 128 MB request on the first-party API; 600 pages per request (100 when the context window is under 1M tokens). Limits apply to the whole payload.
- Dense PDFs can fill the context window before the page limit; split them into sections.
- Pipeline: page to image + extracted text per page; the model sees both.
- Cost: text typically 1,500-3,000 tokens per page, plus image tokens per page under the vision cost rules. No extra PDF fee.
- PDF support inherits all vision limitations.
- Best practices: place PDFs before the question, use standard fonts, upright pages, logical page numbers in prompts, split large PDFs, cache repeated documents, use Message Batches for volume.
- Bedrock and Google-managed Vertex accept base64 sources only.

## Feeds

[Multimodal models](../concepts/multimodal-models.md)
