---
title: "Source: olmOCR (Poznanski et al., 2025)"
summary: "Ai2's open toolkit that converts PDFs to linearized reading-order text with a fine-tuned 7B vision-language model, at about $176 per million pages, plus the olmOCR-Bench test set."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ocr", "multimodal"]
---

- **What:** research paper and open-source toolkit (arXiv:2502.18443)
- **Author/publisher:** Jake Poznanski, Aman Rangapur, Jon Borchardt, Kyle Lo, Luca Soldaini and others (Allen Institute for AI)
- **Date:** 2025-02-25 (v3 2025-07-02)
- **Original:** [arXiv:2502.18443](https://arxiv.org/abs/2502.18443)

## Summary

olmOCR targets bulk conversion of PDFs into clean plain text in natural reading order, mainly to build LLM training corpora. Rather than a multi-model pipeline, it fine-tunes a 7B vision-language model on a large sample of real crawled PDF pages and runs it at scale. The authors argue that proprietary VLMs are too expensive or legally unusable for millions of pages, so an open, cheap model matters.

## Key claims

- Fine-tuned 7B VLM trained on olmOCR-mix-0225: 260,000 pages sampled from over 100,000 crawled PDFs.
- Cost: about $176 per million pages, versus over $6,240 per million with GPT-4o (2025 prices).
- olmOCR-Bench: 1,400 PDFs with formulas, tables, tiny fonts and old scans; the authors report olmOCR beating GPT-4o, Gemini Flash 2 and Qwen-2.5-VL on it.
- Output is linearized text, not a rich element tree.

## Feeds

[Document processing](../concepts/document-processing.md)
