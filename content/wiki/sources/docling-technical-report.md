---
title: "Source: Docling Technical Report (Auer et al., 2024)"
summary: "IBM Research paper describing Docling's open-source PDF conversion pipeline: PDF backends, an RT-DETR layout model trained on DocLayNet, TableFormer table structure, optional OCR, assembly, and CPU throughput numbers."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ingestion", "ocr"]
---

- **What:** technical report (arXiv:2408.09869, v5)
- **Author/publisher:** Christoph Auer, Maksym Lysak, Ahmed Nassar, Michele Dolfi, Nikolaos Livathinos, Peter W. J. Staar and others (IBM Research, 19 authors)
- **Date:** first submitted 2024-08-19; v5 revised 2024-12-09
- **Original:** [arXiv:2408.09869](https://arxiv.org/abs/2408.09869)

## Summary

Docling is an MIT-licensed Python package that converts PDFs (and other formats) into a typed document object serialized to JSON or Markdown. The report explains its linear pipeline: a PDF backend extracts text tokens with coordinates and renders page images; a layout detector finds page elements; a table-structure model reconstructs tables; optional OCR handles scanned content; and an assembly step builds the final document with reading order and metadata. It argues that open-source PDF conversion lags proprietary tools and that Docling narrows the gap on commodity hardware.

## Key claims

- **Backends:** the default `docling-parse` (built on qpdf) and a fallback `pypdfium`. Existing Python PDF libraries were rejected for licensing (PyMuPDF), speed, or quality issues such as merged text cells.
- **Layout model:** an object detector derived from RT-DETR, trained on DocLayNet plus proprietary data, run through onnxruntime on 72 dpi page images. Predicted boxes are intersected with PDF text tokens to build paragraphs, headings, list items, captions, figures and tables.
- **TableFormer:** a vision transformer predicts row/column structure, header vs body cells, spans and empty cells; cell text is matched back to the PDF's own text rather than re-read from pixels.
- **OCR (optional):** EasyOCR on pages rendered at 216 dpi; slow on CPU (over 30 s per page).
- **Assembly:** language detection, reading-order correction, figure-caption linking, title/author/reference labelling.
- **Throughput (OCR off, 225 pages):** 1.27-1.34 pages/s on an Apple M3 Max with the native backend, 2.18-2.45 pages/s with pypdfium; 0.60-0.92 pages/s on an Intel Xeon E5-2690 (native; 0.94-1.57 with pypdfium). Ranges span 4 to 16 threads. Peak memory about 6.2 GB native vs about 2.4-2.6 GB pypdfium.
- pypdfium is faster and lighter but gives lower-quality results, especially on tables.
- TableFormer costs roughly 2-6 s per table on CPU depending on cell count; the layout model is sub-second per page.
- The pipeline is extensible by subclassing `BaseModelPipeline`.

## Feeds

[Document processing](../concepts/document-processing.md)
