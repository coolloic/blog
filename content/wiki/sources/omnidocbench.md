---
title: "Source: OmniDocBench (Ouyang et al., CVPR 2025) and Leaderboard"
summary: "A document-parsing benchmark spanning nine document types with 19 layout categories, scoring text, tables, formulas and reading order; its 2026 leaderboard shows specialized document VLMs ahead of general VLMs and pipeline tools."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "benchmarks", "ocr"]
---

- **What:** benchmark paper (arXiv:2412.07626, CVPR 2025) plus its GitHub leaderboard
- **Author/publisher:** Linke Ouyang, Yuan Qu, Hongbin Zhou, ..., Conghui He (OpenDataLab)
- **Date:** paper 2024-12-10 (v2 2025-03-25); leaderboard read 2026-11-14 (dataset v1.7 since 2026-04-30)
- **Original:** [arXiv:2412.07626](https://arxiv.org/abs/2412.07626), [GitHub](https://github.com/opendatalab/OmniDocBench)

## Summary

OmniDocBench evaluates PDF-to-structured-text conversion end to end and per component, across academic papers, textbooks, handwritten notes, newspapers and other sources. It compares classic pipeline tools, specialized document VLMs and general-purpose VLMs on the same pages, with attribute-level breakdowns (for example by layout type or language).

## Key claims

- Nine document sources, 19 layout categories and 15 attribute labels; end-to-end, task-specific and attribute-based evaluation.
- Metrics: normalized edit distance for text and reading order; TEDS for tables; CDM and edit distance for formulas; COCO mAP for layout detection. The Overall score combines text edit distance, table TEDS and formula CDM.
- Leaderboard as of 2026-11: specialized document VLMs hold the top (OXR-1.0 at 97.03 Overall, TeleOCR 96.91, OvisOCR2 96.47, MiniCPM-OCR 1.0 96.44, PaddleOCR-VL-1.6 96.34, MinerU2.5-Pro 95.75); general VLMs are close behind (Gemini 3 Pro 92.91, Gemini 3 Flash 92.62); pipeline tools trail (MinerU-Pipeline 86.47, Marker 78.44). The README's main table is labelled "v1.6_full" even though the dataset moved to v1.7 on 2026-04-30, so check which version a score refers to.
- The paper's message is that no single method family wins on every document type; strengths differ by layout and content.

## Feeds

[Document processing](../concepts/document-processing.md)
