---
title: "Source: Unstructured Docs on Partitioning, Elements and Hi-Res Models"
summary: "Unstructured's open-source documentation on partition strategies (auto, fast, hi_res, ocr_only), the element types and metadata it emits, and the layout models behind hi_res."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ingestion", "ocr"]
---

- **What:** official documentation pages (partitioning strategies, document elements, hi-res model selection)
- **Author/publisher:** Unstructured Technologies
- **Date:** living documents; read 2026-11-14
- **Original:** [Partitioning strategies](https://docs.unstructured.io/open-source/concepts/partitioning-strategies), [Document elements](https://docs.unstructured.io/open-source/concepts/document-elements), [Models](https://docs.unstructured.io/open-source/concepts/models), [API: choose hi-res model](https://docs.unstructured.io/api-reference/how-to/choose-hi-res-model)

## Summary

Unstructured's library "partitions" a file into a flat list of typed elements with metadata. For PDFs and images the `strategy` parameter chooses between fast rule-based text extraction and slower model-based layout detection and OCR. Elements carry page numbers, coordinates, parent links and, for tables, an HTML rendering.

## Key claims

- **Strategies:** `auto` (default, chooses from document characteristics and arguments); `fast` (rule-based text extraction, roughly 100x faster than image-to-text models, not for image-based files); `hi_res` (model-based layout detection used to classify elements, use when classification matters); `ocr_only` (OCR text extraction for image-based files). PDFs support all four; images support `auto`, `hi_res`, `ocr_only`.
- **Element types:** Title, NarrativeText, ListItem, Table, Image, Header, Footer, Formula, FigureCaption, Address, EmailAddress, PageBreak, CodeSnippet, PageNumber, UncategorizedText; `CompositeElement` only appears after chunking.
- **Metadata:** `page_number`, `coordinates` (points, top-left origin), `parent_id` (hierarchy), `languages`, `detection_class_prob` (hi_res only), and `text_as_html` on Table elements.
- Table extraction is on by default unless `skip_infer_table_types` is set; the table's plain text is in `text` and its structure in `metadata.text_as_html`.
- **Hi-res models (as of 2026-11):** the open-source models page lists `yolox` and `detectron2_onnx`, selected via `hi_res_model_name` (older `model_name` is deprecated) or the `UNSTRUCTURED_HI_RES_MODEL_NAME` environment variable; the open-source fallback default is `yolox`. The hosted Unstructured API docs ([choose hi-res model](https://docs.unstructured.io/api-reference/how-to/choose-hi-res-model)) say its proprietary `layout_v1.1.0` is the default there and generally beats `yolox` on bounding boxes and element classification.

## Feeds

[Document processing](../concepts/document-processing.md)
