---
title: "Source: Docling Documentation"
summary: "Official Docling project docs: supported input formats, export formats (Markdown, HTML, DocTags, JSON), OCR engines, VLM pipeline with GraniteDocling, chunkers, MCP server and framework integrations."
category: source
lastmod: 2026-11-14
tags: ["retrieval", "documents", "ingestion"]
---

- **What:** official project documentation site
- **Author/publisher:** Docling project (originated at IBM Research)
- **Date:** living document; read 2026-11-14
- **Original:** [docling-project.github.io/docling](https://docling-project.github.io/docling/)

## Summary

The landing page of Docling's docs lists what the library parses, what it exports, and how it plugs into LLM frameworks. It positions Docling as a local, self-hostable converter that produces a unified `DoclingDocument` representation, usable for RAG ingestion or agent tools.

## Key claims

- **Inputs (as of 2026-11):** PDF, DOCX, PPTX, XLSX, HTML, EPUB, images (PNG, TIFF, JPEG), LaTeX, plain text, email, audio (via ASR), and recent additions such as OpenDocument and XBRL financial reports.
- **Outputs:** Markdown, HTML, DocTags, WebVTT and lossless JSON.
- **PDF understanding:** page layout, reading order, table structure, code, formulas, image classification; chart understanding can convert bar, pie and line charts into tables.
- **OCR engines:** pluggable, including Tesseract, RapidOCR and others, for scanned PDFs and images.
- **VLM pipeline:** an alternative pipeline that runs a vision-language model (GraniteDocling) over pages.
- **Chunkers:** hybrid (structure- and token-aware), line-based token, and trivial chunkers.
- **Integrations:** LangChain, LlamaIndex, CrewAI, Haystack and others; also a CLI, an API server (`docling-serve`) and an MCP server; runs locally for air-gapped data.

## Feeds

[Document processing](../concepts/document-processing.md)
