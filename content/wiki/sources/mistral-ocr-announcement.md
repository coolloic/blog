---
title: "Source: Mistral OCR Announcement"
summary: "Mistral's March 2025 launch of an OCR API that returns interleaved Markdown and images from PDFs, with throughput, per-page pricing and internal benchmark claims; since superseded by newer Mistral OCR models."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ocr", "multimodal"]
---

- **What:** vendor announcement
- **Author/publisher:** Mistral AI
- **Date:** 2025-03-06 (page now marks the model as no longer maintained, read 2026-11-14)
- **Original:** [Mistral OCR](https://mistral.ai/news/mistral-ocr)

## Summary

Mistral OCR was pitched as an API that "understands" each document element (text, tables, equations, embedded images) and returns them in reading order as Markdown with image references, so the output can feed RAG directly. It is an example of the hosted "VLM as parser" category. Mistral has since replaced it with newer OCR models.

## Key claims

- Handles PDFs and images including complex tables, math/LaTeX and interleaved images; output is ordered Markdown plus extracted images; "doc-as-prompt" mode can return structured JSON.
- Up to 2,000 pages per minute on a single node.
- Price at launch: about 1,000 pages per US dollar, roughly double with batch inference.
- Vendor-run benchmark: 94.89 overall on Mistral's internal text test set vs 90.23 for the next model listed; tables 96.12, math 94.29. These are self-reported.

## Feeds

[Document processing](../concepts/document-processing.md)
